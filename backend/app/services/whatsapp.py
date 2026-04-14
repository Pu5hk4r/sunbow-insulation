"""
================================================================
  WHATSAPP SERVICE
  Meta Cloud API — sends WhatsApp messages automatically
================================================================

  FLOW when customer submits enquiry form:
  1. Customer submits form on website
  2. FastAPI saves to PostgreSQL
  3. This service sends WhatsApp to CLIENT (new enquiry alert)
  4. This service sends WhatsApp to CUSTOMER (confirmation)

  SETUP GUIDE:
  1. Go to https://developers.facebook.com/apps/
  2. Create app → Business type
  3. Add WhatsApp product
  4. Get Phone Number ID + Temporary Token
  5. Add to .env file
  6. For permanent token: create System User in Meta Business Suite

  TODO: Set up Meta webhook to receive incoming WhatsApp messages
  (so client can reply from admin panel — Phase 5)
================================================================
"""

import httpx
from app.core.config import settings


WHATSAPP_API_URL = (
    f"https://graph.facebook.com/v18.0/"
    f"{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
)

HEADERS = {
    "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
    "Content-Type": "application/json",
}


async def send_whatsapp_text(to: str, message: str) -> bool:
    """
    Send a plain text WhatsApp message.

    Args:
        to:      phone number with country code, no + (e.g. "919876543210")
        message: text message to send

    Returns:
        True if sent successfully, False otherwise
    """
    # Skip if WhatsApp token not configured yet
    if not settings.WHATSAPP_TOKEN:
        print(f"⚠️  WhatsApp not configured. Would send to {to}:\n{message}")
        return False

    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": message},
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                WHATSAPP_API_URL,
                headers=HEADERS,
                json=payload,
                timeout=10.0,
            )
            if response.status_code == 200:
                print(f"✅ WhatsApp sent to {to}")
                return True
            else:
                print(f"❌ WhatsApp failed: {response.status_code} — {response.text}")
                return False
    except Exception as e:
        print(f"❌ WhatsApp error: {e}")
        return False


async def notify_client_new_enquiry(enquiry) -> bool:
    """
    Sends alert to CLIENT (business owner) when new enquiry arrives.
    They see this on their phone immediately.
    """
    message = (
        f"🔔 *NEW ENQUIRY — Sunbow Insulation*\n\n"
        f"👤 *Name:* {enquiry.name}\n"
        f"🏢 *Company:* {enquiry.company or 'Not provided'}\n"
        f"📞 *Phone:* {enquiry.phone}\n"
        f"📧 *Email:* {enquiry.email or 'Not provided'}\n"
        f"📦 *Product:* {enquiry.product or 'Not specified'}\n"
        f"📊 *Quantity:* {enquiry.quantity or 'Not specified'}\n"
        f"💬 *Message:* {enquiry.message or 'No message'}\n\n"
        f"🔗 View in admin panel: https://admin.sunbowinsulation.in\n"
        f"⚡ Reply within 2 hours for best conversion!"
    )
    return await send_whatsapp_text(settings.CLIENT_WHATSAPP, message)


async def notify_customer_confirmation(phone: str, name: str, product: str = None) -> bool:
    """
    Sends confirmation to CUSTOMER after they submit enquiry.
    Makes them feel heard immediately.
    """
    product_line = f"for *{product}*" if product else ""
    message = (
        f"Hello {name}! 👋\n\n"
        f"Thank you for your enquiry {product_line} at *Sunbow Insulation*.\n\n"
        f"✅ We have received your request and our team will contact you "
        f"within *2 hours* with specifications and pricing.\n\n"
        f"📞 You can also call us directly: *+91 80489 70649*\n\n"
        f"_Sunbow Insulation Pvt. Ltd. — Quality Since 2012_ 🏭"
    )
    return await send_whatsapp_text(f"91{phone}", message)


# ── TODO: Phase 5 — Add these functions ───────────────────────
#
# async def send_quote_follow_up(phone, name):
#     """Send follow-up if no response in 24 hours"""
#
# async def send_dispatch_notification(phone, name, tracking_id):
#     """Notify customer when goods are dispatched"""
#
# async def send_payment_reminder(phone, name, amount_due):
#     """Remind customer of pending payment"""
#
# async def send_bulk_whatsapp(phones: list, message: str):
#     """Send promotional message to all customers"""
#     # ⚠️  Use WhatsApp Template Messages for bulk — required by Meta
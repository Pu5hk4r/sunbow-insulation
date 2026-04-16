"use client";
import { useState, useEffect } from "react";
import { useInView } from "../utils/hooks";
import { HexBg } from "./Hero";

export default function Contact() {
    const [ref, inView] = useInView();
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false); setSent(true);
    };

    const inp = {
        width: "100%", background: "rgba(255,255,255,.03)", border: "none",
        borderBottom: "1px solid rgba(255,92,26,.3)", color: "#fff",
        padding: "12px 0", marginBottom: "18px", fontSize: "14px", fontWeight: 300,
        fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box",
        transition: "border-color .2s",
    };

    return (
        <section id="contact" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <HexBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }}>

                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-40px)",
                        transition: "all .7s ease"
                    }}>
                        <div className="tag" style={{ marginBottom: "12px" }}>▸ GET IN TOUCH</div>
                        <h2 className="title" style={{ fontSize: "clamp(32px,4vw,52px)", marginBottom: "20px" }}>
                            REQUEST A<br /><span style={{ color: "var(--orange)" }}>QUOTE TODAY</span>
                        </h2>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "var(--muted)",
                            lineHeight: 1.85, marginBottom: "48px", fontWeight: 300,
                        }}>
                            Share your requirement — our technical team responds within
                            <strong style={{ color: "rgba(255,255,255,.8)" }}> 2 hours </strong>
                            with detailed specifications and competitive pricing.
                        </p>

                        {[
                            { icon: "📍", label: "Factory Address", val: "A-26B, Kunwar Singh Nagar, Nangloi, Delhi 110041" },
                            { icon: "📞", label: "Call / WhatsApp", val: "+91 80489 70649" },
                            { icon: "✉️", label: "Email", val: "info@sunbowinsulation.in" },
                            { icon: "⏰", label: "Response Time", val: "Within 2 hours (Mon–Sat, 9am–7pm)" },
                        ].map((c, i) => (
                            <div key={i} style={{
                                display: "flex", gap: "16px", marginBottom: "24px",
                                opacity: inView ? 1 : 0, transition: `all .5s ease ${.3 + i * .1}s`,
                            }}>
                                <div style={{
                                    width: "44px", height: "44px", flexShrink: 0,
                                    background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
                                }}>{c.icon}</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                        letterSpacing: "3px", color: "var(--orange)", marginBottom: "4px"
                                    }}>{c.label}</div>
                                    <div style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "14px",
                                        fontWeight: 600, color: "rgba(255,255,255,.8)"
                                    }}>{c.val}</div>
                                </div>
                            </div>
                        ))}

                        <a href="https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote"
                            target="_blank" rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "12px",
                                background: "#25D366", color: "#fff", padding: "14px 28px",
                                textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                                fontSize: "13px", letterSpacing: "2px", fontWeight: 700,
                                animation: "glow 2s ease-in-out infinite",
                                clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
                            }}>
                            <span style={{ fontSize: "20px" }}>💬</span> CHAT ON WHATSAPP
                        </a>
                    </div>

                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(40px)",
                        transition: "all .7s ease .2s",
                    }}>
                        {sent ? (
                            <div style={{
                                background: "rgba(255,92,26,.08)", border: "1px solid rgba(255,92,26,.25)",
                                padding: "60px 40px", textAlign: "center",
                            }}>
                                <div style={{ fontSize: "48px", marginBottom: "20px" }}>✅</div>
                                <h3 style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "24px",
                                    color: "#fff", marginBottom: "12px"
                                }}>REQUEST RECEIVED</h3>
                                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6 }}>
                                    Thank you! Our technical sales team will review your requirements and send a quote shortly.
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                background: "var(--card)", border: "1px solid rgba(255,255,255,.06)",
                                padding: "40px", position: "relative"
                            }}>
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                                    background: "linear-gradient(90deg,var(--orange),var(--gold))"
                                }} />
                                <h3 style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "20px",
                                    color: "#fff", marginBottom: "24px", letterSpacing: "1px"
                                }}>SEND DIRECT ENQUIRY</h3>

                                <input placeholder="Your Name *" style={inp} />
                                <input placeholder="Company Name" style={inp} />
                                <div style={{ display: "flex", gap: "16px" }}>
                                    <input placeholder="Phone / WhatsApp *" style={inp} />
                                    <input placeholder="Email Address" style={inp} />
                                </div>
                                <div style={{ display: "flex", gap: "16px" }}>
                                    <input placeholder="Product of Interest" style={inp} />
                                    <input placeholder="Est. Quantity" style={inp} />
                                </div>
                                <textarea placeholder="Message / Specific Requirements" style={{ ...inp, height: "100px", resize: "none" }} />

                                <button onClick={submit} className="btn-orange" style={{ width: "100%", justifyContent: "center" }}>
                                    {loading ? "SENDING..." : "SUBMIT ENQUIRY ▸"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

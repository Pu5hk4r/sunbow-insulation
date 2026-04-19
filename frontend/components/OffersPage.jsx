"use client";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";
import FloatingContact from "./FloatingContact";
import { HexBg } from "./Hero";

export default function OffersPage() {
    return (
        <main style={{ minHeight: "100vh", position: "relative" }}>
            <GlobalStyles />
            <Navbar />
            <FloatingContact />

            <section style={{
                padding: "160px 5% 100px", background: "var(--dark)", color: "var(--title)",
                position: "relative", minHeight: "100vh"
            }}>
                <HexBg opacity={0.05} />
                
                <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div className="tag" style={{ marginBottom: "12px" }}>▸ SPECIAL PROMOTIONS</div>
                    <h1 className="title" style={{ fontSize: "clamp(36px, 6vw, 72px)", marginBottom: "40px" }}>
                        BULK ORDER <span style={{ color: "var(--orange)" }}>DISCOUNTS</span>
                    </h1>
                    
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "var(--muted)",
                        maxWidth: "600px", lineHeight: 1.8, marginBottom: "60px"
                    }}>
                        Check our limited time offers and wholesale pricing advantages for our commercial partners. Stock up now on our best-selling fiberglass and silicone solutions.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                        {[
                            { title: "WHOLESALE STARTER", discount: "15% OFF", desc: "For orders above 500 Meters of any combination of sleeves.", bg: "linear-gradient(135deg, rgba(255,92,26,0.1) 0%, transparent 100%)", border: "rgba(255,92,26,0.5)" },
                            { title: "ENTERPRISE BUNDLE", discount: "25% OFF", desc: "For orders over 2000 Meters including custom branding/colors.", bg: "linear-gradient(135deg, rgba(0,194,168,0.1) 0%, transparent 100%)", border: "rgba(0,194,168,0.5)" },
                            { title: "FLASH SALE: TEFLON", discount: "BUY 2 GET 1", desc: "Buy two spools of 100M Teflon Wire and get the third free. Ends soon.", bg: "linear-gradient(135deg, rgba(123,97,255,0.1) 0%, transparent 100%)", border: "rgba(123,97,255,0.5)" }
                        ].map((offer, i) => (
                            <div key={i} style={{
                                background: "var(--card)", border: `1px solid ${offer.border}`,
                                padding: "40px", borderRadius: "8px", position: "relative",
                                overflow: "hidden", ...{ background: offer.bg }
                            }}>
                                <div style={{
                                    fontFamily: "'Orbitron', sans-serif", fontSize: "12px",
                                    letterSpacing: "2px", color: "var(--muted)", marginBottom: "8px"
                                }}>{offer.title}</div>
                                <div style={{
                                    fontFamily: "'Rajdhani', sans-serif", fontSize: "48px",
                                    fontWeight: 700, color: "var(--title)", marginBottom: "16px"
                                }}>{offer.discount}</div>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: "14px",
                                    color: "var(--text)", lineHeight: 1.6, marginBottom: "32px"
                                }}>{offer.desc}</p>
                                <a href="/#contact" className="btn-orange" style={{ width: "100%", justifyContent: "center" }}>
                                    CLAIM OFFER ▸
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

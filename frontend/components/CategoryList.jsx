"use client";
import { useState } from "react";
import { useInView } from "../utils/hooks";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { HexBg } from "./Hero";
import { useRouter } from 'next/navigation';

export default function CategoryList() {
    const [ref, inView] = useInView();
    const [cat, setCat] = useState("ALL");
    const router = useRouter();

    const filtered = cat === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

    return (
        <section id="products" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative"
        }}>
            <HexBg opacity={0.03} />
            <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1, display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "opacity 0.6s" }}>
                
                {/* LEFT SIDEBAR: CATEGORY NAV */}
                <div style={{ flex: "0 0 280px", background: "var(--card)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", position: "sticky", top: "100px", overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", color: "var(--orange)", margin: 0 }}>All Categories</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {CATEGORIES.map(c => (
                            <button key={c.id} onClick={() => setCat(c.id)} style={{
                                padding: "14px 20px", textAlign: "left", background: cat === c.id ? "rgba(255,92,26,0.1)" : "transparent",
                                border: "none", borderBottom: "1px solid rgba(255,255,255,0.02)", cursor: "pointer",
                                color: cat === c.id ? "var(--orange)" : "#fff", fontFamily: "'Inter', sans-serif", fontSize: "14px",
                                fontWeight: cat === c.id ? "600" : "400", transition: "all 0.2s"
                            }}>
                                {cat === c.id && <span style={{ marginRight: "8px" }}>&gt;</span>}
                                {c.label}
                                <span style={{ float: "right", color: "var(--muted)", fontSize: "12px" }}>
                                    {c.id === "ALL" ? PRODUCTS.length : PRODUCTS.filter(p=>p.cat === c.id).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT AREA: PRODUCT LIST */}
                <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "32px", color: "#fff", margin: 0 }}>
                            {CATEGORIES.find(c => c.id === cat)?.label || "Products"}
                        </h2>
                        <span style={{ color: "var(--muted)", fontSize: "14px" }}>Showing {filtered.length} products</span>
                    </div>

                    {filtered.map(p => (
                        <div key={p.id} style={{
                            background: "var(--card)", border: "1px solid rgba(255,255,255,0.08)",
                            padding: "24px", borderRadius: "8px", display: "flex", gap: "24px",
                            flexDirection: "row", flexWrap: "wrap", transition: "transform 0.2s"
                        }}>
                            {/* Product Image */}
                            <div style={{ flex: "0 0 180px", height: "180px", background: "var(--card2)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.04)" }} onClick={() => router.push('/product/' + p.id)}>
                                {p.img.startsWith('/') ? <img src={p.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px"}} /> : p.img}
                            </div>

                            {/* Product Details (Middle) */}
                            <div style={{ flex: "1", minWidth: "250px" }}>
                                <div style={{ color: p.color, fontSize: "10px", fontFamily: "'Orbitron', sans-serif", letterSpacing: "1px", marginBottom: "4px" }}>{p.badge}</div>
                                <h3 onClick={() => router.push('/product/' + p.id)} style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "24px", color: "#00A8E8", margin: "0 0 12px 0", cursor: "pointer" }}>
                                    {p.name}
                                </h3>
                                
                                <div style={{ fontSize: "18px", color: "#fff", fontWeight: "700", marginBottom: "8px" }}>
                                    {/* TODO: Add actual API driven pricing. Using deterministic block to prevent Hydration errors */}
                                    ₹ { (p.id % 10) * 3 + 5 } / Meter 
                                    <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: "400", marginLeft: "8px" }}>(Get Latest Price)</span>
                                </div>
                                <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
                                    Minimum order quantity: 1000 Meter
                                </div>

                                <ul style={{ listStyleType: "square", paddingLeft: "16px", color: "var(--text)", fontSize: "13px", lineHeight: "1.8", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                                    <li>Thermal Rating: {p.temp}</li>
                                    <li>Dimensions: {p.dia}</li>
                                    {p.voltage !== "—" && <li>Voltage limit: {p.voltage}</li>}
                                    <li>High durability</li>
                                    <li>Flawless finish</li>
                                </ul>
                            </div>

                            {/* Actions (Right) */}
                            <div style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "24px" }}>
                                <a href="tel:+918048970649" style={{
                                    background: "rgba(37,211,102,0.1)", border: "1px solid #25D366", color: "#25D366",
                                    padding: "10px", textAlign: "center", borderRadius: "4px", textDecoration: "none",
                                    fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: "600", transition: "all 0.2s"
                                }}>
                                    📞 Call Now
                                </a>
                                <a href="/#contact" style={{
                                    background: "var(--orange)", border: "1px solid var(--orange)", color: "#fff",
                                    padding: "10px", textAlign: "center", borderRadius: "4px", textDecoration: "none",
                                    fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: "600", transition: "all 0.2s"
                                }}>
                                    Get Best Quote
                                </a>
                                <a href="https://wa.me/918048970649" target="_blank" rel="noopener noreferrer" style={{
                                    background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                                    padding: "10px", textAlign: "center", borderRadius: "4px", textDecoration: "none",
                                    fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", transition: "all 0.2s"
                                }}>
                                    Yes! I am interested
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

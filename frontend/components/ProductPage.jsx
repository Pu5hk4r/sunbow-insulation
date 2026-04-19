"use client";
import React, { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";
import FloatingContact from "./FloatingContact";
import ThreeDViewer from "./ThreeDViewer";
import { PRODUCTS } from "../data/products";

export default function ProductPage({ productId }) {
    const product = PRODUCTS.find(p => p.id === parseInt(productId));
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(100);

    if (!product) return <div style={{ color: "var(--title)", padding: "100px" }}>Product not found.</div>;

    const c = product.color;
    const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);

    return (
        <main style={{ minHeight: "100vh", position: "relative", background: "var(--dark)", paddingBottom: "100px" }}>
            <GlobalStyles />
            <Navbar />
            <FloatingContact />

            <div style={{ maxWidth: "1400px", margin: "100px auto 0", padding: "0 5%" }}>
                {/* BREADCRUMBS */}
                <div style={{
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", color: "var(--muted)",
                    marginBottom: "32px", display: "flex", gap: "8px"
                }}>
                    <a href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</a>
                    <span>›</span>
                    <a href="/#products" style={{ color: "var(--muted)", textDecoration: "none" }}>Catalog</a>
                    <span>›</span>
                    <span style={{ color: "var(--title)" }}>{product.name}</span>
                </div>

                {/* TOP HERO PRODUCT SECTION */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: "40px", alignItems: "start" }}>
                    
                    {/* LEFT: 3D VIEW & GALLERY */}
                    <div>
                        <div style={{ 
                            background: "var(--card)", border: `1px solid ${c}33`, padding: "20px",
                            boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 0 80px ${c}0a`
                        }}>
                            <ThreeDViewer product={product} />
                        </div>
                        <div style={{ display: "flex", gap: "10px", marginTop: "16px", overflowX: "auto" }}>
                            {product.gallery.map((img, i) => (
                                <div key={i} onClick={() => setActiveImg(i)} style={{
                                    width: "80px", height: "80px", flexShrink: 0,
                                    border: `2px solid ${activeImg === i ? c : "rgba(var(--text-rgb), 0.1)"}`,
                                    cursor: "pointer", transition: "all 0.2s", opacity: activeImg === i ? 1 : 0.6,
                                    background: "var(--card2)"
                                }}>
                                    {img.startsWith('/') ? <img src={img} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} /> : <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"32px"}}>{img}</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MIDDLE: INFO & FEATURES */}
                    <div>
                        <div className="tag" style={{ marginBottom: "12px", background:`${c}1a`, color: c, padding:"4px 12px", border:`1px solid ${c}44`, display:"inline-block" }}>
                            {product.badge}
                        </div>
                        <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "36px", color: "var(--title)", lineHeight: 1.1, marginBottom: "8px" }}>
                            {product.name}
                        </h1>
                        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "14px", color: c, marginBottom: "20px" }}>
                            {product.tagline}
                        </div>
                        
                        {/* Fake Ratings for Amazon Feel */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                            <div style={{ color: "#FFB347", fontSize: "18px" }}>★★★★★</div>
                            <span style={{ color: "#00A8E8", fontSize: "14px", fontFamily: "'Inter', sans-serif" }}>1,024 industrial reviews</span>
                        </div>

                        <div style={{ width: "100%", height: "1px", background: "rgba(var(--text-rgb), 0.1)", marginBottom: "24px" }} />

                        <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", color: "var(--title)", marginBottom: "12px" }}>About this item</h3>
                        <ul style={{ 
                            fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--text)", 
                            lineHeight: 1.8, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px"
                        }}>
                            <li><strong>Premium Build Quality:</strong> {product.desc} Designed to withstand extreme manufacturing environments.</li>
                            <li><strong>Thermal Rating:</strong> Certified for environments up to {product.temp}. Ensuring zero failure rates under heavy load.</li>
                            <li><strong>Dimensions:</strong> Readily available in sizes ranging {product.dia}, perfectly compatible with standard gauge outputs.</li>
                            {product.voltage !== "—" && <li><strong>Electrical Safety:</strong> Rated for {product.voltage} providing crucial arc protection and short-circuit prevention.</li>}
                            <li><strong>Common Applications:</strong> Industry verified for {product.uses.join(", ")}.</li>
                        </ul>
                    </div>

                    {/* RIGHT: QUOTE CART BOX */}
                    <div style={{ 
                        background: "var(--card)", border: "1px solid rgba(var(--text-rgb), 0.1)", 
                        padding: "30px", borderRadius: "8px", position: "sticky", top: "100px"
                    }}>
                        <div style={{ fontSize: "28px", color: "var(--title)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, marginBottom: "12px" }}>
                            Bulk Inquiry
                        </div>
                        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "24px" }}>
                            Pricing varies based on MOQ. Request a custom quote to lock in today's rates.
                        </p>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", color: "var(--title)", fontSize: "13px", marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>Required Quantity (Meters)</label>
                            <div style={{ display: "flex", border: "1px solid rgba(var(--text-rgb), 0.2)", borderRadius: "4px" }}>
                                <button onClick={() => setQty(q => Math.max(10, q - 50))} style={{ background: "rgba(var(--text-rgb), 0.05)", border: "none", color: "var(--title)", padding: "12px", cursor: "pointer" }}>-</button>
                                <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} style={{ width: "100%", background: "transparent", border: "none", color: "var(--title)", textAlign: "center", outline: "none", fontSize: "16px" }} />
                                <button onClick={() => setQty(q => q + 50)} style={{ background: "rgba(var(--text-rgb), 0.05)", border: "none", color: "var(--title)", padding: "12px", cursor: "pointer" }}>+</button>
                            </div>
                        </div>

                        <div style={{ color: "#25D366", fontSize: "14px", fontWeight: "600", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span>●</span> In Stock (Dispatches in 24 hrs)
                        </div>

                        <button className="btn-orange" style={{ width: "100%", justifyContent: "center", marginBottom: "16px" }}>
                            ADD TO QUOTE CART
                        </button>
                        <button className="btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                            BUY NOW ON WHATSAPP
                        </button>

                        <div style={{ marginTop: "24px", borderTop: "1px solid rgba(var(--text-rgb), 0.1)", paddingTop: "16px", fontSize: "12px", color: "var(--muted)", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{ display: "flex", justifyContent: "space-between" }}><span>Ships from</span> <span>Delhi Factory</span></span>
                            <span style={{ display: "flex", justifyContent: "space-between" }}><span>Sold by</span> <span>Sunbow Insulation</span></span>
                            <span style={{ display: "flex", justifyContent: "space-between" }}><span>Returns</span> <span>7-Day Replacement</span></span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM: RECOMMENDATIONS (CAROUSEL) */}
                <div style={{ marginTop: "80px", borderTop: "1px solid rgba(var(--text-rgb), 0.1)", paddingTop: "60px" }}>
                    <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "28px", color: "var(--title)", marginBottom: "32px" }}>
                        <span style={{ color: "var(--orange)" }}>›</span> Customers who viewed this item also viewed
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                        {related.map(r => (
                            <a href={`/product/${r.id}`} key={r.id} style={{
                                textDecoration: "none", background: "var(--card)", border: "1px solid rgba(var(--text-rgb), 0.05)", padding: "24px",
                                display: "flex", flexDirection: "column", transition: "transform 0.3s", cursor: "pointer"
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{ height: "160px", background: "var(--card2)", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" }}>
                                    {r.img.startsWith('/') ? <img src={r.img} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} /> : r.img}
                                </div>
                                <div style={{ color: "#00A8E8", fontSize: "12px", marginBottom: "8px" }}>★★★★★ 24</div>
                                <div style={{ color: "#00A8E8", fontSize: "16px", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, flexGrow: 1 }}>{r.name}</div>
                                <div style={{ color: "var(--title)", fontSize: "20px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, marginTop: "12px" }}>Request Quote</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

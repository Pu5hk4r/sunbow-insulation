"use client";
import { useState, useEffect } from "react";
import ThreeDViewer from "./ThreeDViewer";

export default function ProductModal({ product, onClose }) {
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        const fn = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [onClose]);

    if (!product) return null;
    const c = product.color;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "rgba(7,7,15,0.92)", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px", animation: "fadeIn .25s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "var(--card)", border: `1px solid ${c}33`,
                    width: "100%", maxWidth: "940px", maxHeight: "90vh",
                    overflow: "auto", position: "relative",
                    boxShadow: `0 40px 120px rgba(0,0,0,.8), 0 0 0 1px ${c}22`,
                }}
            >
                <button onClick={onClose} style={{
                    position: "absolute", top: "16px", right: "16px", zIndex: 10,
                    background: "rgba(var(--text-rgb), .1)", border: "none", color: "var(--title)",
                    width: "36px", height: "36px", cursor: "pointer", fontSize: "16px",
                }}>✕</button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                    {/* LEFT */}
                    <div style={{ padding: "40px", borderRight: `1px solid ${c}22` }}>
                        <span style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                            fontWeight: 700, background: `${c}22`, color: c,
                            padding: "4px 12px", border: `1px solid ${c}44`,
                            display: "inline-block", marginBottom: "16px"
                        }}>{product.badge}</span>

                        <ThreeDViewer product={product} />

                        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                            {product.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    style={{
                                        width: "64px", height: "64px", flexShrink: 0,
                                        background: `${c}${activeImg === i ? "33" : "11"}`,
                                        border: `1px solid ${c}${activeImg === i ? "66" : "22"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "24px", cursor: "pointer", transition: "all .2s",
                                    }}
                                >
                                    {img.startsWith('/') ? <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : img}
                                </div>
                            ))}
                        </div>

                        {product.certifications && (
                            <div style={{ marginTop: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {product.certifications.map((cert, i) => (
                                    <span key={i} style={{
                                        fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "1px",
                                        color: "var(--muted)", border: "1px solid rgba(var(--text-rgb), .1)",
                                        padding: "3px 10px"
                                    }}>{cert}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div style={{ padding: "40px" }}>
                        <div className="tag" style={{ marginBottom: "10px" }}>▸ {product.cat}</div>
                        <h2 style={{
                            fontFamily: "'Rajdhani',sans-serif", fontSize: "28px", fontWeight: 700,
                            color: "var(--title)", marginBottom: "6px", lineHeight: 1.1
                        }}>{product.name}</h2>
                        <div style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "10px", letterSpacing: "2px",
                            color: c, marginBottom: "16px"
                        }}>{product.tagline}</div>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "var(--muted)",
                            lineHeight: 1.8, marginBottom: "24px"
                        }}>{product.desc}</p>

                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                            {[`🌡 ${product.temp}`, `⊙ ${product.dia}`, product.voltage !== "—" && `⚡ ${product.voltage}`]
                                .filter(Boolean).map((s, i) => (
                                    <span key={i} style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "11px", fontWeight: 600,
                                        letterSpacing: "1px", background: "rgba(var(--text-rgb), .05)", 
                                        border: "1px solid rgba(var(--text-rgb), .08)",
                                        padding: "4px 12px", color: "rgba(var(--text-rgb), .65)"
                                    }}>{s}</span>
                                ))}
                        </div>

                        <div style={{ border: `1px solid ${c}22`, marginBottom: "28px" }}>
                            <div style={{
                                padding: "10px 16px", background: `${c}11`,
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                                letterSpacing: "3px", color: c, fontWeight: 700
                            }}>TECHNICAL SPECIFICATIONS</div>
                            {product.specs.map((s, i) => (
                                <div key={i} style={{
                                    display: "flex", justifyContent: "space-between",
                                    padding: "10px 16px", borderTop: "1px solid rgba(var(--text-rgb), .04)",
                                    background: i % 2 === 0 ? "rgba(var(--text-rgb), .01)" : "transparent",
                                }}>
                                    <span style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", color: "var(--muted)", fontWeight: 600
                                    }}>{s.label}</span>
                                    <span style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", color: "rgba(var(--text-rgb), .85)", fontWeight: 600
                                    }}>{s.value}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: "28px" }}>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                                letterSpacing: "3px", color: "var(--muted)", marginBottom: "12px"
                            }}>COMMON APPLICATIONS</div>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {product.uses.map((u, i) => (
                                    <span key={i} style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", fontWeight: 600,
                                        background: `${c}11`, border: `1px solid ${c}33`,
                                        color: c, padding: "4px 12px"
                                    }}>▸ {u}</span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <a href="#contact" onClick={onClose} className="btn-orange"
                                style={{ justifyContent: "center" }}>
                                REQUEST QUOTE FOR THIS PRODUCT ▸
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

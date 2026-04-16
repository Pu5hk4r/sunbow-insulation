"use client";
import { useState } from "react";
import { useInView } from "../utils/hooks";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { HexBg } from "./Hero";
import { useRouter } from 'next/navigation';

export default function ProductsGrid() {
    const [ref, inView] = useInView();
    const [cat, setCat] = useState("ALL");
    const [hovered, setHovered] = useState(null);
    const router = useRouter();

    const filtered = cat === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

    return (
        <section id="products" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <HexBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                    marginBottom: "48px", flexWrap: "wrap", gap: "20px",
                    opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                    transition: "all .6s ease",
                }}>
                    <div>
                        <div className="tag" style={{ marginBottom: "10px" }}>▸ PRODUCT CATALOG</div>
                        <h2 className="title" style={{ fontSize: "clamp(32px,4vw,58px)" }}>
                            INDUSTRIAL GRADE<br />
                            <span style={{ color: "var(--orange)" }}>INSULATION MATERIALS</span>
                        </h2>
                    </div>
                    <p style={{
                        fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "var(--muted)",
                        maxWidth: "300px", lineHeight: 1.75,
                    }}>
                        All products in custom sizes, grades & quantities.<br />
                        MOQ negotiable · Bulk discounts available.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
                    {CATEGORIES.map(c => (
                        <button key={c.id}
                            onClick={() => setCat(c.id)}
                            style={{
                                background: cat === c.id ? "var(--orange)" : "transparent",
                                border: cat === c.id ? "1px solid var(--orange)" : "1px solid rgba(255,255,255,.1)",
                                color: cat === c.id ? "#fff" : "var(--muted)",
                                padding: "8px 20px",
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                letterSpacing: "2px", fontWeight: 700, cursor: "pointer", transition: "all .22s",
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "2px",
                }}>
                    {filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className="pcard"
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => router.push('/product/' + p.id)}
                            style={{
                                background: "var(--card)",
                                border: hovered === p.id
                                    ? `1px solid ${p.color}55`
                                    : "1px solid rgba(255,255,255,.06)",
                                padding: "32px", position: "relative", overflow: "hidden",
                                opacity: inView ? 1 : 0,
                                transform: inView ? "none" : "translateY(40px)",
                                transition: `all .5s ease ${i * .02}s`,
                            }}
                        >
                            <div style={{
                                position: "absolute", top: 0, right: 0,
                                width: "80px", height: "80px",
                                background: hovered === p.id ? `${p.color}18` : "transparent",
                                clipPath: "polygon(100% 0%,0% 0%,100% 100%)",
                                transition: "background .3s",
                            }} />

                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "flex-start", marginBottom: "20px"
                            }}>
                                <div style={{
                                    width: "68px", height: "68px",
                                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}0a)`,
                                    border: `1px solid ${p.color}44`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "30px",
                                    filter: hovered === p.id ? `drop-shadow(0 0 14px ${p.color}99)` : "none",
                                    transition: "filter .3s",
                                }}>
                                    {p.img.startsWith('/') ? <img src={p.img} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : p.img}
                                </div>
                                <span style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                                    fontWeight: 700,
                                    background: `${p.badgeColor}22`, color: p.badgeColor,
                                    padding: "5px 12px", border: `1px solid ${p.badgeColor}44`,
                                }}>{p.badge}</span>
                            </div>

                            <h3 style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "21px",
                                fontWeight: 700, color: "#fff", margin: "0 0 4px", letterSpacing: "1px"
                            }}>{p.name}</h3>

                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                letterSpacing: "2px", color: p.color, marginBottom: "14px"
                            }}>{p.tagline}</div>

                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                                {[`🌡 ${p.temp}`, `⊙ ${p.dia}`, p.voltage !== "—" && `⚡ ${p.voltage}`]
                                    .filter(Boolean).map((s, j) => (
                                        <span key={j} style={{
                                            fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                            fontWeight: 600, letterSpacing: "1px",
                                            background: "rgba(255,255,255,.05)",
                                            border: "1px solid rgba(255,255,255,.08)",
                                            padding: "3px 10px", color: "rgba(255,255,255,.6)",
                                        }}>{s}</span>
                                    ))}
                            </div>

                            <p style={{
                                fontSize: "13px", color: "rgba(255,255,255,.42)",
                                fontFamily: "'Inter',sans-serif", lineHeight: 1.7,
                                marginBottom: "22px", fontWeight: 300,
                            }}>{p.desc}</p>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                    letterSpacing: "2px", color: "var(--muted)"
                                }}>CLICK FOR 3D VIEW + SPECS</span>
                                <span style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                    letterSpacing: "2px", fontWeight: 700, color: p.color,
                                    opacity: hovered === p.id ? 1 : .5, transition: "opacity .3s",
                                }}>VIEW ▸</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

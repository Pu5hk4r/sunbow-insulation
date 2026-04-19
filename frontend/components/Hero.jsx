"use client";
import { useState, useEffect, useCallback } from "react";
import { STATS } from "../data/products";

export function HexBg({ opacity = 0.05 }) {
    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            <svg width="100%" height="100%" style={{ opacity }}>
                <defs>
                    <pattern id="hexbg" width="60" height="52" patternUnits="userSpaceOnUse">
                        <polygon points="30,2 58,17 58,46 30,61 2,46 2,17"
                            fill="none" stroke="#FF5C1A" strokeWidth=".6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexbg)" />
            </svg>
        </div>
    );
}

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => { setTimeout(() => setLoaded(true), 150); }, []);

    const onMouse = useCallback(e => {
        setMouse({ x: (e.clientX / window.innerWidth - .5) * 40, y: (e.clientY / window.innerHeight - .5) * 30 });
    }, []);

    return (
        <section onMouseMove={onMouse} style={{
            minHeight: "100vh", background: "var(--dark)",
            display: "flex", alignItems: "center",
            position: "relative", overflow: "hidden", padding: "80px 5% 0",
        }}>
            <HexBg opacity={0.05} />

            <div style={{
                position: "absolute", top: "8%", right: "4%", width: "700px", height: "700px",
                background: "radial-gradient(circle,rgba(255,92,26,.11) 0%,transparent 65%)", pointerEvents: "none"
            }} />
            <div style={{
                position: "absolute", bottom: "-8%", left: "-4%", width: "500px", height: "500px",
                background: "radial-gradient(circle,rgba(255,179,71,.07) 0%,transparent 65%)", pointerEvents: "none"
            }} />

            <div style={{
                position: "absolute", left: 0, right: 0, height: "2px", zIndex: 5, pointerEvents: "none",
                background: "linear-gradient(90deg,transparent,rgba(255,92,26,.4),transparent)",
                animation: "scanline 5s linear infinite",
            }} />

            <div style={{
                position: "absolute", top: 0, bottom: 0, right: 0, width: "44%",
                background: "linear-gradient(135deg,transparent,rgba(255,92,26,.04))",
                clipPath: "polygon(20% 0%,100% 0%,100% 100%,0% 100%)", pointerEvents: "none"
            }} />

            <div style={{
                position: "absolute", right: "5%", top: "50%",
                transform: `translate(${mouse.x * .4}px, calc(-50% + ${mouse.y * .25}px))`,
                animation: "float 7s ease-in-out infinite",
                pointerEvents: "none", zIndex: 1,
                transition: "transform .08s ease",
            }}>
                <svg width="360" height="360" viewBox="0 0 360 360" style={{ opacity: .16 }}>
                    {[1, 2, 3, 4, 5].map(r => (
                        <polygon key={r}
                            points="180,8 340,95 340,265 180,352 20,265 20,95"
                            fill="none" stroke="#FF5C1A" strokeWidth="1.5"
                            style={{
                                transform: `scale(${r * .18 + .08})`, transformOrigin: "180px 180px",
                                animation: `${r % 2 === 0 ? "rotate" : "rotateR"} ${10 + r * 5}s linear infinite`,
                                opacity: 1 - r * .16,
                            }} />
                    ))}
                    <text x="180" y="205" textAnchor="middle"
                        style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "80px",
                            fontWeight: 900, fill: "#FF5C1A", opacity: .55
                        }}>S</text>
                </svg>
            </div>

            <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.3)",
                    padding: "6px 18px", marginBottom: "28px",
                    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all .6s ease",
                }}>
                    <div style={{
                        width: "7px", height: "7px", background: "#FF5C1A", borderRadius: "50%",
                        animation: "pulse 2s infinite"
                    }} />
                    <span style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                        letterSpacing: "3px", color: "var(--orange)", fontWeight: 700
                    }}>ISO CERTIFIED · EST. 2005 · NANGLOI, DELHI</span>
                </div>

                <h1 style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "clamp(54px,9vw,128px)",
                    lineHeight: .87, fontWeight: 700, color: "var(--title)", marginBottom: "20px",
                    opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
                    transition: "all .7s ease .1s",
                }}>
                    <span className="glitch" data-text="ENGINEERED">ENGINEERED</span><br />
                    <span style={{
                        WebkitTextStroke: "2px var(--orange)", color: "transparent",
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: "clamp(44px,6.5vw,95px)",
                    }}>INSULATION</span><br />
                    <span style={{ color: "var(--orange)" }}>SOLUTIONS</span>
                </h1>

                <p style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "16px", fontWeight: 300,
                    color: "rgba(var(--text-rgb), .5)", maxWidth: "480px", lineHeight: 1.85, marginBottom: "40px",
                    opacity: loaded ? 1 : 0, transition: "all .7s ease .2s",
                }}>
                    Premium fiberglass, silicone &amp; electrical insulation materials trusted by
                    <strong style={{ color: "rgba(var(--text-rgb), .8)" }}> 10,000+ industries</strong> across
                    <strong style={{ color: "rgba(var(--text-rgb), .8)" }}> 50+ countries</strong>.
                </p>

                <div style={{
                    display: "flex", gap: "16px", flexWrap: "wrap",
                    opacity: loaded ? 1 : 0, transition: "all .7s ease .3s",
                }}>
                    <a href="#products" className="btn-orange">EXPLORE PRODUCTS ▸</a>
                    <a href="#contact" className="btn-ghost">REQUEST BULK QUOTE</a>
                </div>

                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                    borderTop: "1px solid rgba(var(--text-rgb), .08)", paddingTop: "36px", marginTop: "60px",
                    opacity: loaded ? 1 : 0, transition: "all .8s ease .5s",
                }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{
                            borderRight: i < 3 ? "1px solid rgba(var(--text-rgb), .08)" : "none",
                            paddingRight: "24px", marginRight: i < 3 ? "24px" : 0,
                        }}>
                            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{s.icon}</div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "32px",
                                fontWeight: 900, color: "var(--orange)", lineHeight: 1
                            }}>{s.val}</div>
                            <div style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                letterSpacing: "2px", color: "var(--muted)", marginTop: "4px"
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                opacity: loaded ? .5 : 0, transition: "opacity 1.2s ease 1s",
            }}>
                <div style={{
                    width: "1px", height: "50px",
                    background: "linear-gradient(to bottom,transparent,var(--orange))",
                    animation: "pulse 2s ease infinite"
                }} />
                <span style={{
                    fontFamily: "'Orbitron',sans-serif", fontSize: "8px",
                    letterSpacing: "4px", color: "var(--muted)"
                }}>SCROLL</span>
            </div>
        </section>
    );
}

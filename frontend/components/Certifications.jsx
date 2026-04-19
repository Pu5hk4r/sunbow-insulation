"use client";
import { useInView } from "../utils/hooks";
import { CERTIFICATIONS } from "../data/products";
import { HexBg } from "./Hero";

export default function Certifications() {
    const [ref, inView] = useInView();
    return (
        <section id="certifications" ref={ref} style={{
            background: "#08080F", padding: "100px 5%", position: "relative"
        }}>
            <HexBg opacity={0.03} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{
                    textAlign: "center", marginBottom: "60px",
                    opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                    transition: "all .6s ease"
                }}>
                    <div className="tag" style={{ marginBottom: "12px" }}>▸ QUALITY ASSURANCE</div>
                    <h2 className="title" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
                        CERTIFIED FOR <span style={{ color: "var(--orange)" }}>GLOBAL STANDARDS</span>
                    </h2>
                </div>

                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2px"
                }}>
                    {CERTIFICATIONS.map((c, i) => (
                        <div key={i} style={{
                            background: "var(--card)", border: "1px solid rgba(var(--text-rgb), .06)",
                            padding: "40px 28px", textAlign: "center", position: "relative", overflow: "hidden",
                            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                            transition: `all .5s ease ${i * .1}s`,
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${c.color}44`;
                                e.currentTarget.style.background = `rgba(${parseInt(c.color.slice(1,3),16)},${parseInt(c.color.slice(3,5),16)},${parseInt(c.color.slice(5,7),16)},0.05)`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = "rgba(var(--text-rgb), .06)";
                                e.currentTarget.style.background = "var(--card)";
                            }}
                        >
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                                background: `linear-gradient(90deg,transparent,${c.color},transparent)`
                            }} />
                            <div style={{
                                width: "72px", height: "72px", borderRadius: "50%", margin: "0 auto 20px",
                                background: `${c.color}18`, border: `2px solid ${c.color}44`,
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px",
                            }}>
                                {c.icon}
                            </div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "13px",
                                fontWeight: 700, letterSpacing: "2px", color: "var(--title)", marginBottom: "6px"
                            }}>{c.name}</div>
                            <div style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                letterSpacing: "1px", color: c.color, marginBottom: "10px"
                            }}>{c.body}</div>
                            <p style={{
                                fontFamily: "'Inter',sans-serif", fontSize: "12px",
                                color: "var(--muted)", lineHeight: 1.6
                            }}>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";
import { useInView, useCounter } from "../utils/hooks";
import { STATS } from "../data/products";

export default function StatsSection() {
    const [ref, inView] = useInView();
    const c0 = useCounter(STATS[0].num, inView);
    const c1 = useCounter(STATS[1].num, inView);
    const c2 = useCounter(STATS[2].num, inView);
    const c3 = useCounter(STATS[3].num, inView);
    const counts = [c0, c1, c2, c3];

    return (
        <section ref={ref} style={{
            background: "linear-gradient(135deg,#0E0E1C,#111120)",
            padding: "80px 5%", position: "relative", overflow: "hidden"
        }}>
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg,transparent,rgba(255,92,26,.04),transparent)",
                pointerEvents: "none",
            }} />
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{
                            background: "var(--card)", border: "1px solid rgba(255,255,255,.06)",
                            padding: "32px 24px", textAlign: "center", position: "relative",
                            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                            transition: `all .6s ease ${i * .12}s`,
                        }}>
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                                background: "linear-gradient(90deg,transparent,var(--orange),transparent)"
                            }} />
                            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{s.icon}</div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "40px",
                                fontWeight: 900, color: "var(--orange)", lineHeight: 1
                            }}>
                                {counts[i]}{s.suffix}
                            </div>
                            <div style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                letterSpacing: "2px", color: "var(--muted)", marginTop: "8px"
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

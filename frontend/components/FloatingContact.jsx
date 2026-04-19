"use client";
import { useState } from "react";

export default function FloatingContact() {
    const [hoverEmail, setHoverEmail] = useState(false);

    return (
        <div style={{
            position: "fixed", bottom: "30px", right: "30px",
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px",
            zIndex: 9999,
        }}>
            <a
                href="mailto:info@sunbowinsulation.in"
                onMouseEnter={() => setHoverEmail(true)}
                onMouseLeave={() => setHoverEmail(false)}
                style={{
                    display: "flex", alignItems: "center", justifyContent: "flex-end",
                    textDecoration: "none", color: "var(--title)"
                }}
            >
                <div style={{
                    overflow: "hidden", display: "flex", alignItems: "center",
                    background: "rgba(var(--text-rgb), 0.1)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(var(--text-rgb), 0.2)",
                    borderRadius: "24px", padding: hoverEmail ? "0 16px" : "0",
                    width: hoverEmail ? "140px" : "0", opacity: hoverEmail ? 1 : 0,
                    height: "48px", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    marginRight: "12px",
                    fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: "600",
                    letterSpacing: "1px", whiteSpace: "nowrap"
                }}>
                    EMAIL US
                </div>
                <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--orange), var(--gold))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 30px rgba(255,92,26,0.3)", transition: "transform 0.3s",
                    transform: hoverEmail ? "scale(1.1)" : "scale(1)",
                    fontSize: "24px", color: "var(--title)", border: "2px solid rgba(var(--text-rgb), 0.2)"
                }}>
                    ✉️
                </div>
            </a>

            <a
                href="https://wa.me/918048970649"
                target="_blank" rel="noopener noreferrer"
                style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 30px rgba(37,211,102,0.4)", position: "relative",
                    textDecoration: "none"
                }}
            >
                <div style={{
                    position: "absolute", inset: "-4px", borderRadius: "50%",
                    border: "2px solid #25D366", animation: "waPulse 2s infinite"
                }} />
                <span style={{ fontSize: "36px", zIndex: 2 }}>💬</span>
            </a>
        </div>
    );
}

"use client";
import { TICKER } from "../data/products";

export default function Ticker() {
    const items = [...TICKER, ...TICKER];
    return (
        <div style={{
            background: "linear-gradient(90deg,#FF5C1A,#FFB347,#FF5C1A)",
            padding: "11px 0", overflow: "hidden",
        }}>
            <div style={{ display: "flex", animation: "ticker 22s linear infinite", width: "max-content" }}>
                {items.map((t, i) => (
                    <span key={i} style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "11px",
                        letterSpacing: "4px", fontWeight: 700, color: "#fff",
                        whiteSpace: "nowrap", padding: "0 32px",
                    }}>◆ {t}</span>
                ))}
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { adminConfig } from "../data/products";

export default function FestivalPopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (adminConfig.activeFestival) {
            const hasSeen = sessionStorage.getItem("seen_festival_" + adminConfig.festivalName);
            if (!hasSeen) {
                setTimeout(() => setOpen(true), 1200);
            }
        }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("seen_festival_" + adminConfig.festivalName, "true");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.4s ease"
        }}>
            <div style={{
                background: "var(--card)", border: "2px solid var(--orange)",
                width: "90%", maxWidth: "500px", borderRadius: "16px",
                position: "relative", overflow: "hidden", textAlign: "center",
                boxShadow: "0 20px 80px rgba(255,92,26,0.4), 0 0 0 1px rgba(var(--text-rgb), 0.1)"
            }}>
                <button 
                    onClick={handleClose}
                    style={{
                        position: "absolute", top: "16px", right: "16px",
                        background: "rgba(0,0,0,0.5)", border: "none", color: "var(--title)",
                        width: "32px", height: "32px", borderRadius: "50%",
                        cursor: "pointer", fontSize: "16px", zIndex: 10
                    }}
                >✕</button>

                <div style={{
                    padding: "40px", background: `url(${adminConfig.festivalImage}) center/cover`,
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute", inset: 0, 
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.2), var(--card))"
                    }} />
                    <h2 style={{
                        position: "relative", zIndex: 1, fontFamily: "'Rajdhani', sans-serif",
                        fontSize: "36px", color: "var(--gold)", textShadow: "0 4px 12px rgba(0,0,0,1)"
                    }}>
                        {adminConfig.festivalName.toUpperCase()} OFFER!
                    </h2>
                </div>

                <div style={{ padding: "0 32px 40px" }}>
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "var(--text)",
                        lineHeight: 1.6, marginBottom: "24px"
                    }}>
                        {adminConfig.festivalMessage}
                    </p>
                    <a href="/offers" onClick={handleClose} className="btn-orange" style={{ width: "100%", justifyContent: "center", fontSize: "16px", padding: "16px 0" }}>
                        CLAIM FESTIVAL DISCOUNT ▸
                    </a>
                </div>
            </div>
        </div>
    );
}

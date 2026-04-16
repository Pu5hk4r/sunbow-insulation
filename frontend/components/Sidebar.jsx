"use client";
import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            <div 
                style={{
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
                    opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
                    transition: "opacity 0.4s ease", zIndex: 999
                }}
                onClick={onClose}
            />

            <div style={{
                position: "fixed", top: 0, right: 0, width: "320px", height: "100vh",
                background: "var(--card)", borderLeft: "1px solid var(--border-w)",
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                zIndex: 1000, display: "flex", flexDirection: "column",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.5)"
            }}>
                <div style={{
                    padding: "24px", borderBottom: "1px solid var(--border-w)",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    <span style={{ 
                        fontFamily: "'Orbitron', sans-serif", fontSize: "16px",
                        letterSpacing: "3px", color: "var(--orange)", fontWeight: 700 
                    }}>MENU</span>
                    <button onClick={onClose} style={{
                        background: "none", border: "none", color: "#fff",
                        fontSize: "24px", cursor: "pointer", opacity: 0.6
                    }}>✕</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "24px", gap: "24px" }}>
                    <a href="/#products" onClick={onClose} className="nav-link" style={{ fontSize: "16px" }}>🔥 PRODUCTS</a>
                    <a href="/offers" onClick={onClose} className="nav-link" style={{ fontSize: "16px", color: "#FFB347" }}>⭐ OFFERS & DEALS</a>
                    <a href="/#certifications" onClick={onClose} className="nav-link" style={{ fontSize: "16px" }}>🏆 CERTIFICATIONS</a>
                    <a href="/#contact" onClick={onClose} className="nav-link" style={{ fontSize: "16px" }}>📞 CONTACT</a>
                </div>

                <div style={{ marginTop: "auto", padding: "24px", borderTop: "1px solid var(--border-w)" }}>
                    <p style={{
                        fontFamily: "'Rajdhani', sans-serif", fontSize: "12px",
                        color: "var(--muted)", marginBottom: "12px"
                    }}>A-26B, Kunwar Singh Nagar, Nangloi, Delhi<br/>+91 80489 70649</p>
                    <a href="https://wa.me/918048970649" className="btn-orange" style={{ width: "100%", justifyContent: "center" }}>
                        💬 WHATSAPP US
                    </a>
                </div>
            </div>
        </>
    );
}

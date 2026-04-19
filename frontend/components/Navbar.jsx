"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [megaMenu, setMegaMenu] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: scrolled ? "var(--bg-glass)" : "transparent",
            backdropFilter: scrolled ? "blur(24px)" : "none",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
            transition: "all .4s ease",
            padding: "0 5%", height: "72px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <Logo size={44} spin />
                <div>
                    <div style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "16px",
                        fontWeight: 900, letterSpacing: "4px", color: "var(--title)", lineHeight: 1
                    }}>SUNBOW</div>
                    <div style={{
                        fontFamily: "'Rajdhani',sans-serif", fontSize: "9px",
                        letterSpacing: "5px", color: "var(--orange)", lineHeight: 1.3
                    }}>INSULATION PVT. LTD.</div>
                </div>
            </div>

            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "center" }} className="desktop-only">
                    
                    <div 
                        onMouseEnter={() => setMegaMenu(true)} 
                        onMouseLeave={() => setMegaMenu(false)}
                        style={{ position: "relative", padding: "10px 0" }}
                    >
                        <a href="/#products" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            Products <span style={{ fontSize: "10px", transition: "transform 0.2s", transform: megaMenu ? "rotate(180deg)" : "none" }}>▼</span>
                        </a>
                        
                        {megaMenu && (
                            <div style={{
                                position: "absolute", top: "100%", left: "-100px", width: "400px",
                                background: "var(--card)", border: "1px solid rgba(var(--text-rgb), 0.1)",
                                borderRadius: "8px", padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr",
                                gap: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.8)", zIndex: 300,
                                animation: "fadeIn 0.2s ease"
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "10px", color: "var(--orange)" }}>FIBERGLASS</div>
                                    <a href="/#products" className="nav-link" style={{ fontSize: "12px" }}>Raw Sleeves</a>
                                    <a href="/#products" className="nav-link" style={{ fontSize: "12px" }}>Twisted Yarn</a>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "10px", color: "var(--orange)" }}>ELECTRICAL</div>
                                    <a href="/#products" className="nav-link" style={{ fontSize: "12px" }}>Silicone Rubber</a>
                                    <a href="/#products" className="nav-link" style={{ fontSize: "12px" }}>Teflon Wire</a>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <a href="/#certifications" className="nav-link">Certifications</a>
                    <a href="/#contact" className="nav-link">Contact</a>
                    <a href="/offers" className="nav-link" style={{ color: "#FFB347" }}>Offers</a>
                </div>

                {/* THEME TOGGLE */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ThemeToggle />
                </div>

                {/* QUOTE CART */}
                <div style={{
                    position: "relative", cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", width: "40px", height: "40px",
                    background: "rgba(var(--text-rgb),0.05)", borderRadius: "50%",
                    border: "1px solid rgba(var(--text-rgb),0.1)"
                }}>
                    <span style={{ fontSize: "18px" }}>🛒</span>
                    <div style={{
                        position: "absolute", top: "-4px", right: "-4px",
                        background: "var(--orange)", color: "var(--title)",
                        width: "18px", height: "18px", borderRadius: "50%",
                        fontSize: "10px", display: "flex", alignItems: "center",
                        justifyContent: "center", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700
                    }}>0</div>
                </div>

                <button onClick={() => setSidebarOpen(true)} style={{
                    background: "none", border: "none", color: "var(--title)", cursor: "pointer",
                    fontSize: "24px", display: "flex", alignItems: "center"
                }}>
                    ☰
                </button>
            </div>
            
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </nav>
    );
}

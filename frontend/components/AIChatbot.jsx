"use client";
import { useState } from "react";

export default function AIChatbot() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { src: "ai", txt: "Hello! I am the Sunbow AI Assistant. How can I help you find insulation materials today?" }
    ]);
    const [val, setVal] = useState("");

    const send = () => {
        if (!val.trim()) return;
        setMsgs(m => [...m, { src: "user", txt: val }]);
        setVal("");
        
        // TODO: Replace this simulated timeout with actual fetch call to your AI backend / OpenAI wrapper
        setTimeout(() => {
            setMsgs(m => [...m, { src: "ai", txt: "My data analyst module is currently logging constraints. Please wait for my neural network update to be active!" }]);
        }, 1000);
    };

    return (
        <>
            {/* The Floating Bubble Toggle */}
            <button onClick={() => setOpen(!open)} style={{
                position: "fixed", bottom: "30px", left: "30px", zIndex: 9999,
                width: "64px", height: "64px", borderRadius: "50%", background: "var(--card)",
                border: "2px solid #00A8E8", color: "#00A8E8", fontSize: "32px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(0, 168, 232, 0.4)", transition: "transform 0.2s"
            }}>
                🤖
            </button>

            {/* The Chat Window */}
            {open && (
                <div style={{
                    position: "fixed", bottom: "104px", left: "30px", zIndex: 9999,
                    width: "340px", height: "480px", background: "var(--card)", 
                    border: "1px solid rgba(0, 168, 232, 0.3)", borderRadius: "12px",
                    display: "flex", flexDirection: "column", overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)", animation: "fadeIn 0.2s"
                }}>
                    <div style={{
                        background: "linear-gradient(90deg, #00A8E8, #2A5298)", padding: "16px",
                        display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                        <div style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", fontWeight: "700" }}>
                            <span style={{ marginRight: "8px" }}>🤖</span>Sunbow AI Assistant
                        </div>
                        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
                    </div>

                    <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                        {msgs.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.src === "ai" ? "flex-start" : "flex-end",
                                background: m.src === "ai" ? "rgba(255,255,255,0.05)" : "rgba(0, 168, 232, 0.2)",
                                padding: "12px 16px", borderRadius: "12px", borderBottomLeftRadius: m.src === "ai" ? 0 : "12px",
                                borderBottomRightRadius: m.src === "user" ? 0 : "12px", maxWidth: "85%",
                                fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--text)", lineHeight: 1.5
                            }}>
                                {m.txt}
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "8px" }}>
                        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about insulation..." style={{
                            flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                            padding: "10px 16px", color: "#fff", borderRadius: "24px", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "14px"
                        }} />
                        <button onClick={send} style={{
                            background: "#00A8E8", border: "none", width: "40px", height: "40px",
                            borderRadius: "50%", color: "#fff", cursor: "pointer", display: "flex", 
                            alignItems: "center", justifyContent: "center"
                        }}>➤</button>
                    </div>
                </div>
            )}
        </>
    );
}

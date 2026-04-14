import { useState, useEffect, useRef, useCallback } from "react";

/* ── GLOBAL STYLES ─────────────────────────────────────────────── */
const G = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{
      --orange:#FF5C1A;--gold:#FFB347;--dark:#07070F;--card:#0E0E1C;
      --border:rgba(255,92,26,0.18);--text:rgba(255,255,255,0.85);
      --muted:rgba(255,255,255,0.4);--white:#fff;
    }
    html{scroll-behavior:smooth;}
    body{background:var(--dark);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;}
    ::selection{background:var(--orange);color:#fff;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:#0a0a14;}
    ::-webkit-scrollbar-thumb{background:var(--orange);border-radius:2px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideRight{from{width:0}to{width:100%}}
    @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes rotateSlowRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.95)}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(255,92,26,.3)}50%{box-shadow:0 0 60px rgba(255,92,26,.7)}}
    @keyframes scanline{0%{top:-10%}100%{top:110%}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(4);opacity:0}}
    @keyframes borderRun{
      0%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
      25%{clip-path:polygon(0 0,100% 0,100% 0,0 0)}
      50%{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%)}
      75%{clip-path:polygon(0 100%,100% 100%,100% 100%,0 100%)}
      100%{clip-path:polygon(0 0,0 0,0 100%,0 100%)}
    }
    @keyframes countUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}}
    @keyframes particleFloat{
      0%{transform:translate(0,0) rotate(0deg);opacity:1}
      100%{transform:translate(var(--tx),var(--ty)) rotate(360deg);opacity:0}
    }

    .nav-link{color:var(--muted);text-decoration:none;font-family:'Rajdhani',sans-serif;
      font-size:13px;letter-spacing:2px;font-weight:600;transition:color .2s;position:relative;}
    .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;
      background:var(--orange);transition:width .3s;}
    .nav-link:hover{color:var(--orange);}
    .nav-link:hover::after{width:100%;}

    .product-card{background:var(--card);border:1px solid rgba(255,255,255,0.06);
      transition:all .4s cubic-bezier(.25,.8,.25,1);cursor:pointer;position:relative;overflow:hidden;}
    .product-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,
      rgba(255,92,26,0) 0%,rgba(255,92,26,.06) 100%);opacity:0;transition:opacity .4s;}
    .product-card:hover{border-color:var(--border);transform:translateY(-6px);
      box-shadow:0 24px 60px rgba(255,92,26,.15);}
    .product-card:hover::before{opacity:1;}

    .cat-btn{background:transparent;border:1px solid rgba(255,255,255,.1);color:var(--muted);
      padding:8px 20px;font-family:'Rajdhani',sans-serif;font-size:12px;letter-spacing:2px;
      font-weight:600;cursor:pointer;transition:all .25s;}
    .cat-btn.active,.cat-btn:hover{background:var(--orange);border-color:var(--orange);color:#fff;}

    .stat-card{border:1px solid rgba(255,255,255,.06);background:var(--card);
      padding:32px 24px;text-align:center;position:relative;overflow:hidden;}
    .stat-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
      background:linear-gradient(90deg,transparent,var(--orange),transparent);}

    .section-tag{font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:4px;
      color:var(--orange);font-weight:700;}
    .section-title{font-family:'Rajdhani',sans-serif;font-weight:700;color:#fff;line-height:.95;}

    .btn-primary{display:inline-flex;align-items:center;gap:10px;
      background:linear-gradient(135deg,var(--orange),var(--gold));
      color:#fff;padding:14px 32px;text-decoration:none;
      font-family:'Rajdhani',sans-serif;font-size:13px;letter-spacing:3px;font-weight:700;
      border:none;cursor:pointer;position:relative;overflow:hidden;transition:all .3s;
      clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(255,92,26,.5);}
    .btn-secondary{display:inline-flex;align-items:center;gap:10px;
      border:1px solid rgba(255,255,255,.2);color:#fff;padding:14px 32px;text-decoration:none;
      font-family:'Rajdhani',sans-serif;font-size:13px;letter-spacing:3px;font-weight:700;
      background:transparent;cursor:pointer;transition:all .3s;
      clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);}
    .btn-secondary:hover{border-color:var(--orange);background:rgba(255,92,26,.08);}

    .in-view{animation:fadeUp .7s ease forwards;}
    .glitch{position:relative;}
    .glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;}
    .glitch::before{color:var(--orange);animation:glitch1 3s infinite;}
    .glitch::after{color:var(--gold);animation:glitch2 3s infinite;}
    @keyframes glitch1{
      0%,90%,100%{clip-path:inset(100% 0 0 0);transform:translate(0)}
      92%{clip-path:inset(20% 0 60% 0);transform:translate(-3px)}
      94%{clip-path:inset(50% 0 30% 0);transform:translate(3px)}
      96%{clip-path:inset(70% 0 10% 0);transform:translate(-3px)}
    }
    @keyframes glitch2{
      0%,85%,100%{clip-path:inset(100% 0 0 0);transform:translate(0)}
      87%{clip-path:inset(40% 0 40% 0);transform:translate(3px)}
      89%{clip-path:inset(10% 0 70% 0);transform:translate(-3px)}
    }
  `}</style>
);

/* ── DATA ────────────────────────────────────────────────────────── */
const CATEGORIES = ["ALL", "FIBERGLASS", "SILICONE", "ELECTRICAL", "YARN & CLOTH", "CABLES"];

const PRODUCTS = [
    {
        id: 1, cat: "FIBERGLASS", name: "Fiberglass Braided Sleeve", sub: "E-Glass / C-Glass", temp: "550°C", dia: "Ø 2–100mm", voltage: "—", badge: "BESTSELLER", badgeColor: "#FF5C1A",
        desc: "Ultra-high temp protection for industrial wiring. Woven E-glass braiding resists abrasion, chemicals & flame.", img: "🔶",
        specs: ["Temp: up to 550°C", "Dia: 2mm to 100mm", "Varnished / Unvarnished", "Custom lengths available"]
    },
    {
        id: 2, cat: "SILICONE", name: "Silicone Rubber Sleeve", sub: "High Flexibility Grade", temp: "200°C", dia: "Ø 1–80mm", voltage: "—", badge: "HIGH DEMAND", badgeColor: "#00C2A8",
        desc: "Superior flexibility & chemical resistance. Ideal for automotive harnesses, aerospace wiring, food machinery.", img: "🟢",
        specs: ["Temp: -60°C to +200°C", "Flame retardant", "FDA food-grade available", "Colour coded options"]
    },
    {
        id: 3, cat: "ELECTRICAL", name: "Electrical Insulation Sleeve", sub: "HV Motor & Transformer Grade", temp: "180°C", dia: "Ø 1–60mm", voltage: "35kV", badge: "CERTIFIED", badgeColor: "#7B61FF",
        desc: "Precision-engineered for high-voltage environments. Used in motors, transformers, switchgear & generators.", img: "⚡",
        specs: ["Voltage: up to 35kV", "Class F / Class H", "UL & CE compliant", "IEC 60684 standard"]
    },
    {
        id: 4, cat: "YARN & CLOTH", name: "Fiberglass Yarn", sub: "E-Glass Twisted / Texturized", temp: "550°C", dia: "Tex 22–2400", voltage: "—", badge: "EXPORT GRADE", badgeColor: "#F5A623",
        desc: "Premium roving and twisted yarn for weaving, braiding & reinforcement applications across industries.", img: "🧵",
        specs: ["Tex: 22 to 2400", "E-Glass / ECR-Glass", "Sizing: compatible with epoxy", "Custom spooling"]
    },
    {
        id: 5, cat: "YARN & CLOTH", name: "Fiberglass Woven Cloth & Tape", sub: "Plain & Twill Weave", temp: "550°C", dia: "25–1500mm width", voltage: "—", badge: "CUSTOM SIZES", badgeColor: "#E84393",
        desc: "Woven fabric for thermal blankets, composite manufacture, pipe wrapping, furnace linings & gaskets.", img: "🔲",
        specs: ["Width: 25mm to 1500mm", "Plain / Twill / Satin", "Silicone coated option", "Fire blanket grade"]
    },
    {
        id: 6, cat: "FIBERGLASS", name: "Varnished Fiberglass Sleeve", sub: "Resin Impregnated", temp: "450°C", dia: "Ø 2–50mm", voltage: "—", badge: "PREMIUM", badgeColor: "#FF6B2B",
        desc: "Resin-impregnated rigid sleeve for coil bobbin support, motor slot liner, capacitor insulation.", img: "🟠",
        specs: ["Lacquer / Resin coated", "Rigid & semi-rigid", "Tight dimensional tolerance", "Oil resistant"]
    },
    {
        id: 7, cat: "SILICONE", name: "Silicone Resin Coated Sleeve", sub: "Silicon Resin Grade", temp: "250°C", dia: "Ø 2–60mm", voltage: "—", badge: "INDUSTRIAL", badgeColor: "#00A8E8",
        desc: "Silicon resin coating gives excellent dielectric strength and moisture resistance for harsh environments.", img: "🔵",
        specs: ["Temp: up to 250°C", "High dielectric strength", "Moisture proof", "Chemical resistant"]
    },
    {
        id: 8, cat: "CABLES", name: "Silicone Rubber Cable", sub: "Single & Multi-Core", temp: "180°C", dia: "0.5–50mm²", voltage: "1.1kV", badge: "NEW", badgeColor: "#22C55E",
        desc: "Flexible silicone insulated & sheathed cables for furnaces, ovens, heaters & high-temp equipment.", img: "🟡",
        specs: ["Temp: -60°C to +180°C", "Single / Multi core", "Tinned copper conductor", "IEC 60245 standard"]
    },
    {
        id: 9, cat: "ELECTRICAL", name: "PVC Teflon Sleeve", sub: "PTFE / FEP Grade", temp: "260°C", dia: "Ø 0.5–30mm", voltage: "600V", badge: "TEFLON", badgeColor: "#A855F7",
        desc: "PTFE shrink tube and Teflon sleeves with outstanding chemical inertness for lab & medical-grade use.", img: "🟣",
        specs: ["PTFE / FEP material", "260°C continuous", "Chemical inert", "Low friction coefficient"]
    },
];

const STATS = [
    { val: "12+", label: "Years of Manufacturing", icon: "🏭" },
    { val: "500+", label: "Product Variants", icon: "📦" },
    { val: "50+", label: "Countries Exported", icon: "🌍" },
    { val: "10K+", label: "Happy Clients", icon: "🤝" },
];

const INDUSTRIES = [
    { name: "Power & Energy", icon: "⚡", desc: "Transformers, switchgear, cables" },
    { name: "Automotive", icon: "🚗", desc: "Harness sleeves, engine insulation" },
    { name: "Aerospace", icon: "✈️", desc: "High-temp wire management" },
    { name: "Railways", icon: "🚆", desc: "Traction motors, rolling stock" },
    { name: "Electronics", icon: "💻", desc: "PCB, coil, sensor protection" },
    { name: "Steel & Furnace", icon: "🔥", desc: "Ladle covers, furnace linings" },
    { name: "Chemical Plants", icon: "⚗️", desc: "Acid-resistant insulation" },
    { name: "Defence", icon: "🛡️", desc: "Military-grade specifications" },
];

const TICKER_ITEMS = [
    "FIBERGLASS SLEEVES", "SILICONE RUBBER", "ELECTRICAL INSULATION", "TEFLON TUBES",
    "FIBERGLASS YARN", "WOVEN CLOTH", "BRAIDED SLEEVES", "HV CABLES", "ISO CERTIFIED",
    "EXPORT QUALITY", "SINCE 2012", "MADE IN INDIA", "50+ COUNTRIES"
];

/* ── HOOKS ──────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function useCounter(target, inView, duration = 1800) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const n = parseInt(target.replace(/\D/g, ""));
        let start = 0, prev = null;
        const step = (ts) => {
            if (!prev) prev = ts;
            const progress = Math.min((ts - prev) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setVal(Math.floor(ease * n));
            if (progress < 1) requestAnimationFrame(step);
            else setVal(n);
        };
        requestAnimationFrame(step);
    }, [inView, target, duration]);
    return val;
}

/* ── SVG LOGO (animated) ────────────────────────────────────────── */
function SunbowLogo({ size = 48, animated = false }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
            </defs>
            {/* Outer hex ring */}
            <polygon points="50,4 93,27.5 93,72.5 50,96 7,72.5 7,27.5"
                fill="none" stroke="url(#lg1)" strokeWidth="2.5"
                style={animated ? { animation: "rotateSlow 12s linear infinite", transformOrigin: "50px 50px" } : {}} />
            {/* Inner hex */}
            <polygon points="50,18 78,33 78,67 50,82 22,67 22,33"
                fill="url(#lg1)" opacity=".15" />
            {/* S letter */}
            <text x="50" y="65" textAnchor="middle"
                style={{
                    fontFamily: "'Orbitron',sans-serif", fontSize: "38px", fontWeight: 900,
                    fill: "url(#lg1)", letterSpacing: "-2px"
                }}>S</text>
            {/* Corner dots */}
            {[[50, 4], [93, 27.5], [93, 72.5], [50, 96], [7, 72.5], [7, 27.5]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="#FF5C1A"
                    style={animated ? { animation: `pulse 2s ease ${i * .3}s infinite` } : {}} />
            ))}
        </svg>
    );
}

/* ── PARTICLE BURST ─────────────────────────────────────────────── */
function Particles() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        tx: `${(Math.random() - 0.5) * 200}px`,
        ty: `${(Math.random() - 0.5) * 200}px`,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 2,
        dur: Math.random() * 3 + 2,
    }));
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {particles.map(p => (
                <div key={p.id} style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: p.size + "px", height: p.size + "px",
                    background: "#FF5C1A",
                    borderRadius: "50%",
                    "--tx": p.tx, "--ty": p.ty,
                    animation: `particleFloat ${p.dur}s ease ${p.delay}s infinite`,
                    opacity: 0.6
                }} />
            ))}
        </div>
    );
}

/* ── ANIMATED GRID BG ───────────────────────────────────────────── */
function GridBg({ opacity = 0.04 }) {
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FF5C1A" strokeWidth=".5" />
                    </pattern>
                    <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
                        <polygon points="30,2 58,17 58,46 30,61 2,46 2,17"
                            fill="none" stroke="#FF5C1A" strokeWidth=".5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>
        </div>
    );
}

/* ── SCANLINE EFFECT ─────────────────────────────────────────────── */
function Scanline() {
    return (
        <div style={{
            position: "absolute", left: 0, right: 0, height: "2px", zIndex: 5, pointerEvents: "none",
            background: "linear-gradient(90deg,transparent,rgba(255,92,26,.4),transparent)",
            animation: "scanline 4s linear infinite",
        }} />
    );
}

/* ── NAVBAR ─────────────────────────────────────────────────────── */
function Navbar() {
    const [sc, setSc] = useState(false);
    const [mob, setMob] = useState(false);
    useEffect(() => {
        const fn = () => setSc(window.scrollY > 60);
        window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
                background: sc ? "rgba(7,7,15,0.97)" : "transparent",
                backdropFilter: sc ? "blur(24px)" : "none",
                borderBottom: sc ? "1px solid rgba(255,92,26,.12)" : "none",
                transition: "all .4s ease",
                padding: "0 5%", height: "72px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                    <SunbowLogo size={44} animated />
                    <div>
                        <div style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "16px",
                            fontWeight: 900, letterSpacing: "4px", color: "#fff", lineHeight: 1
                        }}>SUNBOW</div>
                        <div style={{
                            fontFamily: "'Rajdhani',sans-serif", fontSize: "9px",
                            letterSpacing: "5px", color: "var(--orange)", lineHeight: 1.2
                        }}>INSULATION PVT. LTD.</div>
                    </div>
                </div>

                {/* Desktop nav */}
                <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    {["Products", "Industries", "About", "Certifications", "Contact"].map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
                    ))}
                    <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: "11px" }}>
                        GET QUOTE ▸
                    </a>
                </div>
            </nav>
        </>
    );
}

/* ── HERO ────────────────────────────────────────────────────────── */
function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);
    const handleMouse = useCallback((e) => {
        setMousePos({ x: (e.clientX / window.innerWidth - .5) * 30, y: (e.clientY / window.innerHeight - .5) * 30 });
    }, []);

    return (
        <section onMouseMove={handleMouse} style={{
            minHeight: "100vh", background: "var(--dark)",
            display: "flex", alignItems: "center",
            position: "relative", overflow: "hidden", padding: "80px 5% 0",
        }}>
            <GridBg opacity={0.05} />
            <Scanline />
            <Particles />

            {/* Radial glows */}
            <div style={{
                position: "absolute", top: "10%", right: "5%", width: "700px", height: "700px",
                background: "radial-gradient(circle,rgba(255,92,26,.1) 0%,transparent 65%)", pointerEvents: "none"
            }} />
            <div style={{
                position: "absolute", bottom: "-10%", left: "-5%", width: "500px", height: "500px",
                background: "radial-gradient(circle,rgba(255,179,71,.06) 0%,transparent 65%)", pointerEvents: "none"
            }} />

            {/* Diagonal accent bar */}
            <div style={{
                position: "absolute", top: 0, bottom: 0, right: 0, width: "42%",
                background: "linear-gradient(135deg,transparent 0%,rgba(255,92,26,.04) 100%)",
                clipPath: "polygon(18% 0%,100% 0%,100% 100%,0% 100%)",
                pointerEvents: "none"
            }} />

            {/* Floating 3D hex visual */}
            <div style={{
                position: "absolute", right: "6%", top: "50%",
                transform: `translate(${mousePos.x * .5}px,${-50 + mousePos.y * .3}%)`,
                transition: "transform .1s ease",
                animation: "float 6s ease-in-out infinite",
                pointerEvents: "none", zIndex: 1
            }}>
                <svg width="380" height="380" viewBox="0 0 380 380" style={{ opacity: .18 }}>
                    {[1, 2, 3, 4].map(r => (
                        <polygon key={r}
                            points="190,10 350,100 350,280 190,370 30,280 30,100"
                            fill="none" stroke="#FF5C1A" strokeWidth={1.5}
                            style={{
                                transform: `scale(${r * .22 + .1})`, transformOrigin: "190px 190px",
                                animation: `rotateSlow ${8 + r * 4}s linear ${r % 2 === 0 ? "reverse" : "normal"} infinite`,
                                opacity: 1 - r * .15
                            }} />
                    ))}
                    <text x="190" y="210" textAnchor="middle"
                        style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "72px",
                            fontWeight: 900, fill: "#FF5C1A", opacity: .6
                        }}>S</text>
                </svg>
            </div>

            {/* Hero content */}
            <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

                {/* Badge */}
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.3)",
                    padding: "6px 18px", marginBottom: "28px",
                    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all .6s ease"
                }}>
                    <div style={{
                        width: "7px", height: "7px", background: "#FF5C1A", borderRadius: "50%",
                        animation: "pulse 2s infinite"
                    }} />
                    <span style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "10px", letterSpacing: "3px",
                        color: "var(--orange)", fontWeight: 700
                    }}>
                        ISO CERTIFIED · EST. 2012 · NANGLOI, DELHI
                    </span>
                </div>

                {/* Main headline */}
                <h1 style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "clamp(56px,9vw,130px)",
                    lineHeight: .88, fontWeight: 700, color: "#fff", marginBottom: "20px",
                    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
                    transition: "all .7s ease .1s"
                }}>
                    <span className="glitch" data-text="ENGINEERED">ENGINEERED</span><br />
                    <span style={{
                        WebkitTextStroke: "2px var(--orange)", color: "transparent",
                        fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(48px,7vw,100px)"
                    }}>INSULATION</span><br />
                    <span style={{ color: "var(--orange)" }}>SOLUTIONS</span>
                </h1>

                <p style={{
                    fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(255,255,255,.5)",
                    maxWidth: "500px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300,
                    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all .7s ease .2s"
                }}>
                    Premium fiberglass, silicone & electrical insulation materials trusted by
                    <strong style={{ color: "rgba(255,255,255,.8)" }}> 10,000+ industries</strong> across
                    <strong style={{ color: "rgba(255,255,255,.8)" }}> 50+ countries</strong>.
                    Manufactured in Delhi since 2012.
                </p>

                <div style={{
                    display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px",
                    opacity: loaded ? 1 : 0, transition: "all .7s ease .3s"
                }}>
                    <a href="#products" className="btn-primary">EXPLORE PRODUCTS ▸</a>
                    <a href="#contact" className="btn-secondary">REQUEST BULK QUOTE</a>
                </div>

                {/* Stats bar */}
                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                    borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: "36px",
                    gap: "0",
                    opacity: loaded ? 1 : 0, transition: "all .8s ease .5s"
                }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{
                            borderRight: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none",
                            padding: `0 ${i === 0 ? "0" : "24px"}`,
                        }}>
                            <div style={{ fontSize: "36px", marginBottom: "4px" }}>{s.icon}</div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "32px",
                                fontWeight: 900, color: "var(--orange)", lineHeight: 1
                            }}>
                                {s.val}
                            </div>
                            <div style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                letterSpacing: "2px", color: "var(--muted)", marginTop: "4px"
                            }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                opacity: loaded ? .5 : 0, transition: "opacity 1s ease 1.2s"
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

/* ── TICKER ─────────────────────────────────────────────────────── */
function Ticker() {
    const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div style={{
            background: "linear-gradient(90deg,#FF5C1A,#FFB347,#FF5C1A)",
            padding: "12px 0", overflow: "hidden", position: "relative", zIndex: 10
        }}>
            <div style={{ display: "flex", animation: "ticker 20s linear infinite", width: "max-content" }}>
                {items.map((t, i) => (
                    <span key={i} style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "11px", letterSpacing: "4px",
                        fontWeight: 700, color: "#fff", whiteSpace: "nowrap", padding: "0 32px"
                    }}>◆ {t}</span>
                ))}
            </div>
        </div>
    );
}

/* ── PRODUCTS ────────────────────────────────────────────────────── */
function Products() {
    const [ref, inView] = useInView();
    const [cat, setCat] = useState("ALL");
    const [hover, setHover] = useState(null);
    const [selected, setSelected] = useState(null);
    const filtered = cat === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

    return (
        <section id="products" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <GridBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                    marginBottom: "48px", flexWrap: "wrap", gap: "24px"
                }}>
                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
                        transition: "all .6s ease"
                    }}>
                        <div className="section-tag" style={{ marginBottom: "10px" }}>▸ PRODUCT CATALOG</div>
                        <h2 className="section-title" style={{ fontSize: "clamp(32px,4vw,60px)" }}>
                            INDUSTRIAL GRADE<br />
                            <span style={{ color: "var(--orange)" }}>INSULATION MATERIALS</span>
                        </h2>
                    </div>
                    <div style={{
                        fontSize: "13px", color: "var(--muted)", fontFamily: "'Rajdhani',sans-serif",
                        maxWidth: "320px", lineHeight: 1.7,
                        opacity: inView ? 1 : 0, transition: "all .6s ease .2s"
                    }}>
                        All products available in custom sizes, grades & quantities.
                        MOQ negotiable for bulk orders.
                    </div>
                </div>

                {/* Category filter */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
                    {CATEGORIES.map(c => (
                        <button key={c} className={`cat-btn ${cat === c ? "active" : ""}`}
                            onClick={() => setCat(c)}>{c}</button>
                    ))}
                </div>

                {/* Product grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: "2px" }}>
                    {filtered.map((p, i) => (
                        <div key={p.id} className="product-card"
                            onMouseEnter={() => setHover(p.id)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => setSelected(selected === p.id ? null : p.id)}
                            style={{
                                padding: "32px",
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(40px)",
                                transition: `all .5s ease ${i * .07}s`
                            }}>

                            {/* Top row */}
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "flex-start", marginBottom: "20px"
                            }}>
                                <div style={{
                                    width: "64px", height: "64px",
                                    background: `linear-gradient(135deg,${p.badgeColor}22,${p.badgeColor}11)`,
                                    border: `1px solid ${p.badgeColor}44`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "28px",
                                    filter: hover === p.id ? `drop-shadow(0 0 12px ${p.badgeColor}88)` : "none",
                                    transition: "filter .3s"
                                }}>{p.img}</div>
                                <span style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                                    fontWeight: 700,
                                    background: `${p.badgeColor}22`, color: p.badgeColor,
                                    padding: "5px 12px", border: `1px solid ${p.badgeColor}44`
                                }}>{p.badge}</span>
                            </div>

                            {/* Name */}
                            <h3 style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "22px", fontWeight: 700,
                                color: "#fff", margin: "0 0 4px", letterSpacing: "1px"
                            }}>{p.name}</h3>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                                color: p.badgeColor, marginBottom: "12px"
                            }}>{p.sub}</div>

                            {/* Spec pills */}
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                                {[`🌡 ${p.temp}`, `⊙ ${p.dia}`, p.voltage !== "—" && `⚡ ${p.voltage}`]
                                    .filter(Boolean).map((s, j) => (
                                        <span key={j} style={{
                                            fontFamily: "'Rajdhani',sans-serif", fontSize: "11px", fontWeight: 600,
                                            letterSpacing: "1px",
                                            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                                            padding: "3px 10px", color: "rgba(255,255,255,.6)"
                                        }}>{s}</span>
                                    ))}
                            </div>

                            <p style={{
                                fontSize: "13px", color: "rgba(255,255,255,.45)",
                                fontFamily: "'Inter',sans-serif", lineHeight: 1.7, marginBottom: "20px"
                            }}>{p.desc}</p>

                            {/* Expanded specs */}
                            {selected === p.id && (
                                <div style={{
                                    marginBottom: "16px", padding: "16px",
                                    background: "rgba(255,92,26,.06)", border: "1px solid rgba(255,92,26,.2)",
                                    animation: "fadeIn .3s ease"
                                }}>
                                    {p.specs.map((s, j) => (
                                        <div key={j} style={{
                                            fontFamily: "'Rajdhani',sans-serif", fontSize: "12px", letterSpacing: "1px",
                                            color: "rgba(255,255,255,.7)", padding: "4px 0",
                                            borderBottom: j < p.specs.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                                            display: "flex", gap: "8px", alignItems: "center"
                                        }}>
                                            <span style={{ color: "var(--orange)" }}>▸</span>{s}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* CTA row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <button onClick={(e) => { e.stopPropagation(); setSelected(selected === p.id ? null : p.id); }}
                                    style={{
                                        background: "none", border: "none", cursor: "pointer",
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "11px", letterSpacing: "2px",
                                        color: p.badgeColor, fontWeight: 700
                                    }}>
                                    {selected === p.id ? "HIDE SPECS ▴" : "VIEW SPECS ▾"}
                                </button>
                                <a href="#contact" onClick={e => e.stopPropagation()}
                                    style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "11px", letterSpacing: "2px",
                                        fontWeight: 700, color: "#fff", textDecoration: "none",
                                        background: `linear-gradient(135deg,${p.badgeColor},${p.badgeColor}bb)`,
                                        padding: "8px 18px",
                                        clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                        transition: "opacity .2s"
                                    }}>REQUEST QUOTE</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── VIDEO DEMO SECTION ──────────────────────────────────────────── */
function VideoSection() {
    const [ref, inView] = useInView();
    const [playing, setPlaying] = useState(false);

    return (
        <section style={{ background: "#08080F", padding: "100px 5%", position: "relative", overflow: "hidden" }} ref={ref}>
            <GridBg opacity={0.03} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
                        transition: "all .7s ease"
                    }}>
                        <div className="section-tag" style={{ marginBottom: "12px" }}>▸ MANUFACTURING EXCELLENCE</div>
                        <h2 className="section-title" style={{ fontSize: "clamp(32px,4vw,52px)", marginBottom: "20px" }}>
                            SEE HOW WE<br /><span style={{ color: "var(--orange)" }}>MANUFACTURE</span><br />QUALITY
                        </h2>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "var(--muted)",
                            lineHeight: 1.8, marginBottom: "32px"
                        }}>
                            Our state-of-the-art facility in Nangloi, Delhi runs precision braiding,
                            coating and testing lines. Every product undergoes rigorous QC before dispatch.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            {[
                                { icon: "🏭", text: "In-house braiding, coating & winding machines" },
                                { icon: "🔬", text: "In-line quality testing at every stage" },
                                { icon: "📋", text: "Full traceability — batch number to shipment" },
                                { icon: "📦", text: "Custom packaging & export documentation" },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: "14px", alignItems: "center",
                                    opacity: inView ? 1 : 0, transition: `all .5s ease ${.3 + i * .1}s`
                                }}>
                                    <div style={{
                                        width: "40px", height: "40px", flexShrink: 0,
                                        background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px"
                                    }}>{item.icon}</div>
                                    <span style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "14px",
                                        fontWeight: 600, color: "rgba(255,255,255,.75)", letterSpacing: "1px"
                                    }}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <a href="#contact" className="btn-primary">VISIT OUR FACILITY ▸</a>
                    </div>

                    {/* Video placeholder with play button */}
                    <div style={{
                        position: "relative",
                        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
                        transition: "all .7s ease .2s"
                    }}>
                        {/* Fake video thumbnail */}
                        <div style={{
                            background: "linear-gradient(135deg,#0E0E1C 0%,#12121F 100%)",
                            border: "1px solid rgba(255,92,26,.2)",
                            aspectRatio: "16/9", position: "relative", overflow: "hidden", cursor: "pointer"
                        }} onClick={() => setPlaying(!playing)}>
                            <GridBg opacity={0.1} />

                            {/* Simulated factory image with CSS art */}
                            <div style={{
                                position: "absolute", inset: 0,
                                background: `
                  radial-gradient(ellipse at 30% 70%, rgba(255,92,26,.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 30%, rgba(255,179,71,.1) 0%, transparent 50%),
                  linear-gradient(180deg, #0a0a14 0%, #121220 100%)
                `
                            }} />

                            {/* Machinery silhouette CSS art */}
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                                background: "linear-gradient(to top,rgba(20,20,35,.9),transparent)"
                            }}>
                                <div style={{
                                    position: "absolute", bottom: "20px", left: "20px", right: "20px",
                                    display: "flex", gap: "8px", alignItems: "flex-end"
                                }}>
                                    {[60, 90, 45, 110, 70, 85, 55].map((h, i) => (
                                        <div key={i} style={{
                                            flex: 1, height: h + "px",
                                            background: `rgba(255,92,26,${.1 + i * .03})`,
                                            border: "1px solid rgba(255,92,26,.2)"
                                        }} />
                                    ))}
                                </div>
                            </div>

                            {/* Play button */}
                            <div style={{
                                position: "absolute", top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                width: "72px", height: "72px", borderRadius: "50%",
                                background: "rgba(255,92,26,.9)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "24px",
                                animation: "glow 2s ease-in-out infinite",
                                transition: "transform .2s"
                            }}>▶</div>

                            {/* Labels */}
                            <div style={{
                                position: "absolute", top: "16px", left: "16px",
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px", letterSpacing: "3px",
                                color: "rgba(255,255,255,.6)"
                            }}>FACILITY TOUR</div>
                            <div style={{
                                position: "absolute", top: "16px", right: "16px",
                                background: "rgba(255,92,26,.8)", padding: "4px 10px",
                                fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px", color: "#fff"
                            }}>
                                ● LIVE
                            </div>
                        </div>

                        {/* Corner decoration */}
                        <div style={{
                            position: "absolute", top: "-8px", left: "-8px",
                            width: "40px", height: "40px",
                            borderTop: "2px solid var(--orange)", borderLeft: "2px solid var(--orange)"
                        }} />
                        <div style={{
                            position: "absolute", bottom: "-8px", right: "-8px",
                            width: "40px", height: "40px",
                            borderBottom: "2px solid var(--orange)", borderRight: "2px solid var(--orange)"
                        }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── INDUSTRIES ──────────────────────────────────────────────────── */
function Industries() {
    const [ref, inView] = useInView();
    const [hov, setHov] = useState(null);
    return (
        <section id="industries" ref={ref} style={{ background: "var(--dark)", padding: "100px 5%", position: "relative" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{
                    textAlign: "center", marginBottom: "60px",
                    opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
                    transition: "all .6s ease"
                }}>
                    <div className="section-tag" style={{ marginBottom: "12px" }}>▸ SECTORS WE SERVE</div>
                    <h2 className="section-title" style={{ fontSize: "clamp(32px,4vw,56px)" }}>
                        INDUSTRIES WE <span style={{ color: "var(--orange)" }}>POWER</span>
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "2px" }}>
                    {INDUSTRIES.map((ind, i) => (
                        <div key={i}
                            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                            style={{
                                background: hov === i ? "rgba(255,92,26,.07)" : "rgba(255,255,255,.02)",
                                border: `1px solid ${hov === i ? "rgba(255,92,26,.3)" : "rgba(255,255,255,.06)"}`,
                                padding: "32px 24px", cursor: "default", transition: "all .3s",
                                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: `${i * .06}s`
                            }}>
                            <div style={{
                                fontSize: "36px", marginBottom: "14px",
                                filter: hov === i ? "drop-shadow(0 0 10px rgba(255,92,26,.6))" : "none",
                                transition: "filter .3s"
                            }}>{ind.icon}</div>
                            <h3 style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "18px", fontWeight: 700,
                                color: hov === i ? "var(--orange)" : "#fff", letterSpacing: "1px",
                                marginBottom: "6px", transition: "color .3s"
                            }}>{ind.name}</h3>
                            <p style={{
                                fontFamily: "'Inter',sans-serif", fontSize: "12px",
                                color: "var(--muted)", lineHeight: 1.5
                            }}>{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── STATS SECTION ───────────────────────────────────────────────── */
function StatsSection() {
    const [ref, inView] = useInView();
    const counts = STATS.map(s => useCounter(s.val, inView));
    return (
        <section style={{
            background: "linear-gradient(135deg,#0E0E1C 0%,#12121A 100%)",
            padding: "80px 5%", position: "relative", overflow: "hidden"
        }} ref={ref}>
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg,transparent,rgba(255,92,26,.04),transparent)",
                pointerEvents: "none"
            }} />
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
                    {STATS.map((s, i) => (
                        <div key={i} className="stat-card" style={{
                            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
                            transition: `all .6s ease ${i * .12}s`
                        }}>
                            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{s.icon}</div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "42px",
                                fontWeight: 900, color: "var(--orange)", lineHeight: 1
                            }}>
                                {counts[i]}{s.val.replace(/\d/g, "")}
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

/* ── CONTACT ─────────────────────────────────────────────────────── */
function Contact() {
    const [ref, inView] = useInView();
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "", qty: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.name || !form.phone) return;
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false); setSent(true);
    };

    const inp = {
        width: "100%", background: "rgba(255,255,255,.03)",
        border: "none", borderBottom: "1px solid rgba(255,92,26,.3)",
        color: "#fff", padding: "12px 0", marginBottom: "20px",
        fontSize: "14px", fontFamily: "'Inter',sans-serif", fontWeight: 300,
        outline: "none", boxSizing: "border-box", transition: "border-color .2s"
    };

    return (
        <section id="contact" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <GridBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }}>

                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
                        transition: "all .7s ease"
                    }}>
                        <div className="section-tag" style={{ marginBottom: "12px" }}>▸ GET IN TOUCH</div>
                        <h2 className="section-title" style={{ fontSize: "clamp(32px,4vw,52px)", marginBottom: "20px" }}>
                            REQUEST A<br /><span style={{ color: "var(--orange)" }}>QUOTE TODAY</span>
                        </h2>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "var(--muted)",
                            lineHeight: 1.8, marginBottom: "48px"
                        }}>
                            Share your requirement — our technical team responds within <strong style={{ color: "rgba(255,255,255,.8)" }}>2 hours</strong> with
                            detailed specifications and competitive pricing.
                        </p>

                        {[
                            { icon: "📍", label: "Factory", val: "A-26B, Kunwar Singh Nagar, Nangloi, Delhi 110041" },
                            { icon: "📞", label: "Call / WhatsApp", val: "+91 80489 70649" },
                            { icon: "✉️", label: "Email", val: "info@sunbowinsulation.in" },
                            { icon: "⏰", label: "Response Time", val: "Within 2 hours (Mon–Sat)" },
                        ].map((c, i) => (
                            <div key={i} style={{
                                display: "flex", gap: "16px", marginBottom: "24px",
                                opacity: inView ? 1 : 0, transition: `all .5s ease ${.3 + i * .1}s`
                            }}>
                                <div style={{
                                    width: "44px", height: "44px", flexShrink: 0,
                                    background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px"
                                }}>{c.icon}</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                        letterSpacing: "3px", color: "var(--orange)", marginBottom: "4px"
                                    }}>{c.label}</div>
                                    <div style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "14px",
                                        fontWeight: 600, color: "rgba(255,255,255,.8)"
                                    }}>{c.val}</div>
                                </div>
                            </div>
                        ))}

                        {/* WhatsApp CTA */}
                        <a href="https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote%20for%20insulation%20products"
                            target="_blank" rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "12px",
                                background: "#25D366", color: "#fff", padding: "14px 28px",
                                textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                                fontSize: "13px", letterSpacing: "2px", fontWeight: 700,
                                animation: "glow 2s ease-in-out infinite",
                                clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)"
                            }}>
                            <span style={{ fontSize: "20px" }}>💬</span> CHAT ON WHATSAPP NOW
                        </a>
                    </div>

                    {/* Form */}
                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
                        transition: "all .7s ease .2s"
                    }}>
                        {sent ? (
                            <div style={{
                                background: "rgba(255,92,26,.08)", border: "1px solid rgba(255,92,26,.25)",
                                padding: "60px 40px", textAlign: "center"
                            }}>
                                <div style={{
                                    width: "72px", height: "72px", borderRadius: "50%",
                                    background: "rgba(255,92,26,.15)", border: "2px solid var(--orange)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "32px", margin: "0 auto 20px"
                                }}>✓</div>
                                <h3 style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "18px",
                                    color: "var(--orange)", marginBottom: "12px", letterSpacing: "2px"
                                }}>
                                    ENQUIRY SUBMITTED
                                </h3>
                                <p style={{
                                    fontFamily: "'Inter',sans-serif", fontSize: "14px",
                                    color: "var(--muted)", lineHeight: 1.7
                                }}>
                                    Thank you! Our team will contact you within 2 hours.<br />
                                    You'll receive a WhatsApp confirmation shortly.
                                </p>
                            </div>
                        ) : (
                            <div style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,.06)", padding: "40px" }}>
                                <div style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "11px",
                                    letterSpacing: "3px", color: "var(--orange)", marginBottom: "28px"
                                }}>
                                    ▸ ENQUIRY FORM
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                                    <input placeholder="Full Name *" value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        style={inp} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                        onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                    <input placeholder="Company Name" value={form.company}
                                        onChange={e => setForm({ ...form, company: e.target.value })}
                                        style={inp} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                        onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                    <input placeholder="Phone / WhatsApp *" value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        style={inp} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                        onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                    <input placeholder="Email Address" value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        style={inp} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                        onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                </div>
                                <input placeholder="Product Required (e.g. Fiberglass Sleeve 10mm)" value={form.product}
                                    onChange={e => setForm({ ...form, product: e.target.value })}
                                    style={{ ...inp, width: "100%" }} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                    onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                <input placeholder="Quantity / MOQ Required" value={form.qty}
                                    onChange={e => setForm({ ...form, qty: e.target.value })}
                                    style={{ ...inp, width: "100%" }} onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                    onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                <textarea placeholder="Additional specs, size, grade or special requirements..."
                                    value={form.message} rows={4}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ ...inp, resize: "vertical", width: "100%" }}
                                    onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                    onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"} />
                                <button className="btn-primary" onClick={submit}
                                    style={{
                                        width: "100%", justifyContent: "center", fontSize: "12px",
                                        opacity: loading ? .7 : 1, cursor: loading ? "wait" : "pointer"
                                    }}>
                                    {loading ? "SENDING ENQUIRY..." : "SUBMIT ENQUIRY → GET WHATSAPP REPLY ▸"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
    return (
        <footer style={{
            background: "#050510", borderTop: "1px solid rgba(255,92,26,.1)", padding: "48px 5% 28px"
        }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                            <SunbowLogo size={40} />
                            <div>
                                <div style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "14px",
                                    fontWeight: 900, letterSpacing: "3px", color: "#fff"
                                }}>SUNBOW</div>
                                <div style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "9px",
                                    letterSpacing: "4px", color: "var(--orange)"
                                }}>INSULATION PVT. LTD.</div>
                            </div>
                        </div>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "var(--muted)",
                            lineHeight: 1.8, maxWidth: "260px"
                        }}>
                            Manufacturer & exporter of premium fiberglass and silicone insulation products since 2012.
                        </p>
                    </div>
                    {[
                        { title: "Products", links: ["Fiberglass Sleeves", "Silicone Sleeves", "Electrical Insulation", "Fiberglass Yarn", "Woven Cloth", "PVC Teflon"] },
                        { title: "Company", links: ["About Us", "Manufacturing", "Certifications", "Quality Policy", "Export", "Careers"] },
                        { title: "Contact", links: ["Get a Quote", "WhatsApp Us", "Email Us", "Delhi Factory", "Distributor Enquiry", "Support"] },
                    ].map((col, i) => (
                        <div key={i}>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px", letterSpacing: "3px",
                                color: "var(--orange)", marginBottom: "16px", fontWeight: 700
                            }}>{col.title}</div>
                            {col.links.map((l, j) => (
                                <div key={j} style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "13px",
                                    letterSpacing: "1px", color: "var(--muted)", marginBottom: "8px",
                                    cursor: "pointer", transition: "color .2s"
                                }}
                                    onMouseEnter={e => e.target.style.color = "#fff"}
                                    onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: "24px",
                    display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"
                }}>
                    <div style={{
                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                        letterSpacing: "1px", color: "rgba(255,255,255,.25)"
                    }}>
                        © 2024 Sunbow Insulation Pvt. Ltd. · All Rights Reserved · Made in India 🇮🇳
                    </div>
                    <div style={{ display: "flex", gap: "24px" }}>
                        {["Privacy Policy", "Terms", "GST: XXXXXXXXXXXX"].map((l, i) => (
                            <span key={i} style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                letterSpacing: "1px", color: "rgba(255,255,255,.25)", cursor: "pointer"
                            }}>{l}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ── WHATSAPP FLOAT ──────────────────────────────────────────────── */
function WAButton() {
    return (
        <a href="https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote%20for%20Sunbow%20insulation%20products"
            target="_blank" rel="noopener noreferrer"
            title="Chat on WhatsApp"
            style={{
                position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
                width: "60px", height: "60px", borderRadius: "50%",
                background: "#25D366", display: "flex", alignItems: "center",
                justifyContent: "center", textDecoration: "none", fontSize: "28px",
                animation: "waPulse 2s ease infinite",
                boxShadow: "0 4px 20px rgba(37,211,102,.4)",
                transition: "transform .2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >💬</a>
    );
}

/* ── APP ─────────────────────────────────────────────────────────── */
export default function App() {
    return (
        <>
            <G />
            <Navbar />
            <Hero />
            <Ticker />
            <Products />
            <VideoSection />
            <StatsSection />
            <Industries />
            <Contact />
            <Footer />
            <WAButton />
        </>
    );
}

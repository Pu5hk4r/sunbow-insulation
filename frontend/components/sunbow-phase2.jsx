"use client";

/**
 * ============================================================
 *  SUNBOW INSULATION — PHASE 2
 *  3D Product Viewer + Enhanced Product Gallery
 * ============================================================
 *
 *  DEVELOPER NOTES (Pushkar):
 *  --------------------------
 *  ✅ All data is in the DATA SECTION below — easy to edit
 *  ✅ Every image slot has a TODO comment with what to replace
 *  ✅ Emojis are TEMPORARY placeholders — swap with real images
 *  ✅ Three.js 3D viewer is self-contained in <ProductViewer3D>
 *  ✅ Later: replace CSS 3D with actual .glb 3D models from client
 *
 *  PHASE ROADMAP:
 *  Phase 1 ✅ — Website shell, hero, products, contact
 *  Phase 2 ✅ — 3D viewer, image gallery, product detail modal
 *  Phase 3 🔜 — FastAPI backend (store enquiries in PostgreSQL)
 *  Phase 4 🔜 — Admin panel (client dashboard)
 *  Phase 5 🔜 — WhatsApp automation
 *  Phase 6 🔜 — Analytics dashboard
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    :root {
      --orange:    #FF5C1A;
      --orange-lt: #FF7A3D;
      --gold:      #FFB347;
      --dark:      #07070F;
      --card:      #0E0E1C;
      --card2:     #111120;
      --border:    rgba(255,92,26,0.18);
      --border-w:  rgba(255,255,255,0.06);
      --text:      rgba(255,255,255,0.85);
      --muted:     rgba(255,255,255,0.4);
      --dim:       rgba(255,255,255,0.15);
    }

    html { scroll-behavior: smooth; }
    body { background: var(--dark); color: var(--text);
           font-family: 'Inter', sans-serif; overflow-x: hidden; }
    ::selection { background: var(--orange); color: #fff; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0a0a14; }
    ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 2px; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes rotate   { to{transform:rotate(360deg)} }
    @keyframes rotateR  { to{transform:rotate(-360deg)} }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
    @keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes scanline { 0%{top:-5%} 100%{top:105%} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes glow     { 0%,100%{box-shadow:0 0 20px rgba(255,92,26,.3)} 50%{box-shadow:0 0 50px rgba(255,92,26,.7)} }
    @keyframes waPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0)} }
    @keyframes spin3d   {
      0%   { transform: rotateY(0deg) rotateX(10deg); }
      100% { transform: rotateY(360deg) rotateX(10deg); }
    }
    @keyframes glitch1 {
      0%,90%,100%{ clip-path:inset(100% 0 0 0); transform:translate(0) }
      91%{ clip-path:inset(20% 0 60% 0); transform:translate(-3px) }
      93%{ clip-path:inset(50% 0 30% 0); transform:translate(3px) }
      95%{ clip-path:inset(70% 0 10% 0); transform:translate(-2px) }
    }
    @keyframes glitch2 {
      0%,86%,100%{ clip-path:inset(100% 0 0 0); transform:translate(0) }
      88%{ clip-path:inset(40% 0 40% 0); transform:translate(3px) }
      90%{ clip-path:inset(10% 0 70% 0); transform:translate(-3px) }
    }

    /* ── REUSABLE CLASSES ── */
    .glitch { position:relative; }
    .glitch::before, .glitch::after {
      content: attr(data-text);
      position: absolute; top:0; left:0; width:100%; height:100%;
    }
    .glitch::before { color:var(--orange); animation: glitch1 4s infinite; }
    .glitch::after  { color:var(--gold);   animation: glitch2 4s infinite; }

    .tag {
      font-family:'Orbitron',sans-serif; font-size:10px; letter-spacing:4px;
      color:var(--orange); font-weight:700;
    }
    .title {
      font-family:'Rajdhani',sans-serif; font-weight:700;
      color:#fff; line-height:.93;
    }

    .btn-orange {
      display:inline-flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,var(--orange),var(--gold));
      color:#fff; padding:14px 32px; text-decoration:none;
      font-family:'Rajdhani',sans-serif; font-size:13px;
      letter-spacing:3px; font-weight:700; border:none; cursor:pointer;
      clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
      transition:all .3s; position:relative; overflow:hidden;
    }
    .btn-orange:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(255,92,26,.5); }

    .btn-ghost {
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid rgba(255,255,255,.2); color:#fff; padding:14px 32px;
      text-decoration:none; font-family:'Rajdhani',sans-serif; font-size:13px;
      letter-spacing:3px; font-weight:700; background:transparent; cursor:pointer;
      clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
      transition:all .3s;
    }
    .btn-ghost:hover { border-color:var(--orange); background:rgba(255,92,26,.08); }

    .nav-link {
      color:var(--muted); text-decoration:none;
      font-family:'Rajdhani',sans-serif; font-size:13px;
      letter-spacing:2px; font-weight:600; transition:color .2s;
      position:relative;
    }
    .nav-link::after {
      content:''; position:absolute; bottom:-4px; left:0;
      width:0; height:1px; background:var(--orange); transition:width .3s;
    }
    .nav-link:hover { color:var(--orange); }
    .nav-link:hover::after { width:100%; }

    .skeleton {
      background: linear-gradient(90deg, #1a1a2e 25%, #22223a 50%, #1a1a2e 75%);
      background-size: 400px 100%;
      animation: shimmer 1.5s infinite;
    }

    /* ── PRODUCT CARD HOVER ── */
    .pcard { transition: all .35s cubic-bezier(.25,.8,.25,1); cursor:pointer; }
    .pcard:hover {
      transform: translateY(-8px);
      box-shadow: 0 28px 70px rgba(255,92,26,.18);
      border-color: var(--border) !important;
    }

    /* ── 3D VIEWER ── */
    .viewer-scene {
      perspective: 900px;
      perspective-origin: 50% 50%;
    }
    .viewer-object {
      transform-style: preserve-3d;
      animation: spin3d 8s linear infinite;
    }
    .viewer-face {
      position: absolute;
      backface-visibility: visible;
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   ██████  DATA SECTION  ██████
   All product data, categories, stats, etc. live here.
   Easy for Pushkar to edit — everything in one place.
───────────────────────────────────────────────────────────── */

/**
 * PRODUCT CATEGORIES
 * TODO: Add/remove categories as client's product line grows
 */
const CATEGORIES = [
    { id: "ALL", label: "All Products" },
    { id: "FIBERGLASS", label: "Fiberglass" },
    { id: "SILICONE", label: "Silicone" },
    { id: "ELECTRICAL", label: "Electrical" },
    { id: "YARN", label: "Yarn & Cloth" },
    { id: "CABLES", label: "Cables" },
    { id: "TEFLON", label: "Teflon / PTFE" },
];

/**
 * PRODUCTS ARRAY
 * ──────────────
 * Each product has:
 *   img       → TODO: Replace emoji with real product image path
 *               e.g. img: "/images/products/fiberglass-sleeve.jpg"
 *   gallery[] → TODO: Replace ["🔶","🔸","🟠"] with actual image paths
 *               e.g. ["/images/products/fg-sleeve-1.jpg", ...]
 *   model3d   → TODO: Replace with .glb file path for Three.js loader
 *               e.g. model3d: "/models/fiberglass-sleeve.glb"
 *   specs     → Technical specs (show in modal + product page)
 *   uses      → Common use-cases (show in modal)
 */
const PRODUCTS = [
    {
        id: 1,
        cat: "FIBERGLASS",
        name: "Fiberglass Braided Sleeve",
        tagline: "Ultra High Temp Wiring Protection",
        badge: "BESTSELLER",
        badgeColor: "#FF5C1A",

        // TODO: Replace with real product image
        // img: "/images/products/fiberglass-braided-sleeve.jpg"
        img: "🔶", // ← TEMPORARY EMOJI PLACEHOLDER

        // TODO: Replace each emoji with actual photo path
        // gallery: ["/img/fg-sl-1.jpg", "/img/fg-sl-2.jpg", "/img/fg-sl-3.jpg"]
        gallery: ["🔶", "🔸", "🟠"], // ← TEMPORARY

        // TODO: Replace with actual 3D GLB model when available
        // model3d: "/models/fiberglass-sleeve.glb"
        model3d: null, // ← null = use CSS 3D fallback

        color: "#FF5C1A",
        temp: "550°C",
        dia: "Ø 2–100mm",
        voltage: "—",
        material: "E-Glass / C-Glass",
        finish: "Varnished / Unvarnished",
        desc: "Ultra-high temperature resistant fiberglass braided sleeve for industrial wiring, motor coils, and transformer insulation. Excellent abrasion and flame resistance.",
        specs: [
            { label: "Max Temp", value: "550°C" },
            { label: "Diameter", value: "2mm to 100mm" },
            { label: "Material", value: "E-Glass / C-Glass" },
            { label: "Finish", value: "Varnished / Unvarnished / Resin coated" },
            { label: "Standard", value: "IEC 60684-2" },
            { label: "MOQ", value: "Negotiable — contact us" },
        ],
        uses: ["Motor winding", "Transformer insulation", "Furnace wiring", "Industrial cables"],
        certifications: ["ISO 9001", "IEC 60684"],
    },
    {
        id: 2,
        cat: "SILICONE",
        name: "Silicone Rubber Sleeve",
        tagline: "Maximum Flexibility, All Temperatures",
        badge: "HIGH DEMAND",
        badgeColor: "#00C2A8",
        img: "🟢", // TODO: "/images/products/silicone-rubber-sleeve.jpg"
        gallery: ["🟢", "🟩", "💚"], // TODO: real paths
        model3d: null,
        color: "#00C2A8",
        temp: "-60°C to +200°C",
        dia: "Ø 1–80mm",
        voltage: "—",
        material: "Silicone Rubber",
        finish: "Smooth / Matte",
        desc: "Superior flexibility and chemical resistance silicone sleeve. Ideal for automotive harnesses, aerospace, food-grade machinery and medical equipment.",
        specs: [
            { label: "Temp Range", value: "-60°C to +200°C" },
            { label: "Diameter", value: "1mm to 80mm" },
            { label: "Material", value: "Silicone Rubber" },
            { label: "Grade", value: "Industrial / FDA Food-grade" },
            { label: "Color", value: "Custom color coding available" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Automotive wiring harness", "Aerospace", "Food machinery", "Medical equipment"],
        certifications: ["ISO 9001", "FDA Food Grade"],
    },
    {
        id: 3,
        cat: "ELECTRICAL",
        name: "Electrical Insulation Sleeve",
        tagline: "High Voltage Motor & Transformer Grade",
        badge: "CERTIFIED",
        badgeColor: "#7B61FF",
        img: "⚡", // TODO: "/images/products/electrical-insulation-sleeve.jpg"
        gallery: ["⚡", "🔌", "🟣"], // TODO: real paths
        model3d: null,
        color: "#7B61FF",
        temp: "180°C",
        dia: "Ø 1–60mm",
        voltage: "Up to 35kV",
        material: "Fiberglass + Resin",
        finish: "Resin Impregnated",
        desc: "Precision-engineered for high-voltage motor windings, transformers, and switchgear. Class F and Class H ratings available.",
        specs: [
            { label: "Max Voltage", value: "35kV" },
            { label: "Temp Class", value: "Class F (155°C) / Class H (180°C)" },
            { label: "Diameter", value: "1mm to 60mm" },
            { label: "Standard", value: "IEC 60684, UL Listed" },
            { label: "Finish", value: "Resin Impregnated" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["HV Transformers", "Motor windings", "Switchgear", "Generators"],
        certifications: ["UL", "CE", "IEC 60684"],
    },
    {
        id: 4,
        cat: "YARN",
        name: "Fiberglass Yarn",
        tagline: "E-Glass Twisted & Texturized",
        badge: "EXPORT GRADE",
        badgeColor: "#F5A623",
        img: "🧵", // TODO: "/images/products/fiberglass-yarn.jpg"
        gallery: ["🧵", "🪢", "🟡"], // TODO: real paths
        model3d: null,
        color: "#F5A623",
        temp: "550°C",
        dia: "Tex 22–2400",
        voltage: "—",
        material: "E-Glass / ECR-Glass",
        finish: "Starch / Silane Sizing",
        desc: "Premium roving and twisted fiberglass yarn for weaving, braiding, knitting and composite reinforcement. Compatible with epoxy and polyester resins.",
        specs: [
            { label: "Tex Count", value: "22 to 2400" },
            { label: "Glass Type", value: "E-Glass / ECR-Glass" },
            { label: "Sizing", value: "Epoxy / Polyester compatible" },
            { label: "Spool Size", value: "Custom spooling available" },
            { label: "Twist", value: "S / Z twist" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Fabric weaving", "Braided sleeves", "Rope making", "Composites"],
        certifications: ["ISO 9001"],
    },
    {
        id: 5,
        cat: "YARN",
        name: "Fiberglass Woven Cloth & Tape",
        tagline: "Plain & Twill Weave — Custom Widths",
        badge: "CUSTOM SIZES",
        badgeColor: "#E84393",
        img: "🔲", // TODO: "/images/products/fiberglass-cloth.jpg"
        gallery: ["🔲", "⬛", "🟫"], // TODO: real paths
        model3d: null,
        color: "#E84393",
        temp: "550°C",
        dia: "25–1500mm width",
        voltage: "—",
        material: "Woven E-Glass",
        finish: "Plain / Silicone Coated",
        desc: "Woven fiberglass fabric and tape for thermal blankets, pipe wrapping, composite manufacture, furnace linings and fire-rated gaskets.",
        specs: [
            { label: "Width", value: "25mm to 1500mm" },
            { label: "Weave", value: "Plain / Twill / Satin" },
            { label: "Finish", value: "Silicone coated / Uncoated" },
            { label: "Grade", value: "Fire blanket / Industrial" },
            { label: "GSM", value: "100 to 800 GSM" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Thermal blankets", "Pipe wrapping", "Furnace linings", "Fire-rated gaskets"],
        certifications: ["ISO 9001"],
    },
    {
        id: 6,
        cat: "FIBERGLASS",
        name: "Varnished Fiberglass Sleeve",
        tagline: "Resin Impregnated Rigid Grade",
        badge: "PREMIUM",
        badgeColor: "#FF6B2B",
        img: "🟠", // TODO: "/images/products/varnished-fiberglass-sleeve.jpg"
        gallery: ["🟠", "🔶", "🟡"], // TODO: real paths
        model3d: null,
        color: "#FF6B2B",
        temp: "450°C",
        dia: "Ø 2–50mm",
        voltage: "—",
        material: "E-Glass + Lacquer",
        finish: "Varnish / Resin coated",
        desc: "Rigid to semi-rigid resin-impregnated fiberglass sleeve. Used for coil bobbin support, motor slot liners, capacitor insulation and tight-tolerance assemblies.",
        specs: [
            { label: "Max Temp", value: "450°C" },
            { label: "Diameter", value: "2mm to 50mm" },
            { label: "Finish", value: "Lacquer / Resin coated" },
            { label: "Rigidity", value: "Rigid & Semi-rigid" },
            { label: "Tolerance", value: "±0.1mm" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Coil bobbins", "Motor slot liners", "Capacitor insulation"],
        certifications: ["ISO 9001"],
    },
    {
        id: 7,
        cat: "SILICONE",
        name: "Silicone Resin Coated Sleeve",
        tagline: "High Dielectric Strength",
        badge: "INDUSTRIAL",
        badgeColor: "#00A8E8",
        img: "🔵", // TODO: "/images/products/silicone-resin-sleeve.jpg"
        gallery: ["🔵", "🔹", "🟦"], // TODO: real paths
        model3d: null,
        color: "#00A8E8",
        temp: "250°C",
        dia: "Ø 2–60mm",
        voltage: "—",
        material: "Fiberglass + Silicon Resin",
        finish: "Silicon Resin Coated",
        desc: "Silicon resin coating over fiberglass braid gives excellent dielectric strength, moisture resistance and thermal stability for harsh industrial environments.",
        specs: [
            { label: "Max Temp", value: "250°C" },
            { label: "Diameter", value: "2mm to 60mm" },
            { label: "Dielectric", value: "High strength" },
            { label: "Moisture", value: "Moisture proof" },
            { label: "Chemical", value: "Chemical resistant" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Harsh industrial environments", "Outdoor wiring", "Mining equipment"],
        certifications: ["ISO 9001"],
    },
    {
        id: 8,
        cat: "CABLES",
        name: "Silicone Rubber Cable",
        tagline: "Single & Multi-Core HT Flexible Cable",
        badge: "NEW",
        badgeColor: "#22C55E",
        img: "🟡", // TODO: "/images/products/silicone-rubber-cable.jpg"
        gallery: ["🟡", "🔆", "💛"], // TODO: real paths
        model3d: null,
        color: "#22C55E",
        temp: "-60°C to +180°C",
        dia: "0.5–50mm²",
        voltage: "1.1kV",
        material: "Silicone + Tinned Copper",
        finish: "Silicone Sheathed",
        desc: "Flexible silicone insulated and sheathed cables for furnaces, ovens, industrial heaters and high-temperature equipment. IEC 60245 compliant.",
        specs: [
            { label: "Temp Range", value: "-60°C to +180°C" },
            { label: "Core", value: "Single / Multi-core" },
            { label: "Conductor", value: "Tinned annealed copper" },
            { label: "Voltage", value: "1.1kV" },
            { label: "Standard", value: "IEC 60245" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Furnaces", "Industrial ovens", "Heaters", "High-temp equipment"],
        certifications: ["IEC 60245"],
    },
    {
        id: 9,
        cat: "TEFLON",
        name: "PVC Teflon / PTFE Sleeve",
        tagline: "Chemical Inert — Lab & Medical Grade",
        badge: "TEFLON",
        badgeColor: "#A855F7",
        img: "🟣", // TODO: "/images/products/ptfe-teflon-sleeve.jpg"
        gallery: ["🟣", "🔮", "💜"], // TODO: real paths
        model3d: null,
        color: "#A855F7",
        temp: "260°C",
        dia: "Ø 0.5–30mm",
        voltage: "600V",
        material: "PTFE / FEP",
        finish: "Smooth PTFE",
        desc: "PTFE shrink tubing and Teflon sleeves with outstanding chemical inertness, low friction and excellent dielectric properties for lab, medical and pharmaceutical use.",
        specs: [
            { label: "Max Temp", value: "260°C continuous" },
            { label: "Diameter", value: "0.5mm to 30mm" },
            { label: "Material", value: "PTFE / FEP" },
            { label: "Chemical", value: "Fully chemically inert" },
            { label: "Friction", value: "Ultra-low friction" },
            { label: "MOQ", value: "Negotiable" },
        ],
        uses: ["Laboratories", "Medical devices", "Pharmaceutical", "Chemical processing"],
        certifications: ["ISO 9001", "FDA"],
    },
];

/**
 * COMPANY STATS
 * TODO: Update numbers as client grows
 */
const STATS = [
    { val: "12+", suffix: "+", num: 12, label: "Years Manufacturing", icon: "🏭" },
    { val: "500+", suffix: "+", num: 500, label: "Product Variants", icon: "📦" },
    { val: "50+", suffix: "+", num: 50, label: "Countries Exported", icon: "🌍" },
    { val: "10K+", suffix: "K+", num: 10, label: "Happy Clients", icon: "🤝" },
];

/**
 * CERTIFICATIONS
 * TODO: Add actual certification images/logos when available
 * cert_img → TODO: replace emoji with logo path
 */
const CERTIFICATIONS = [
    {
        name: "ISO 9001:2015",
        body: "Bureau Veritas",
        desc: "Quality Management System",
        // cert_img: "/images/certs/iso-9001.png" ← TODO
        icon: "🏆",
        color: "#F5A623",
    },
    {
        name: "IEC 60684",
        body: "International Electrotechnical Commission",
        desc: "Flexible Insulating Sleeving Standard",
        // cert_img: "/images/certs/iec.png" ← TODO
        icon: "⚡",
        color: "#7B61FF",
    },
    {
        name: "UL Listed",
        body: "Underwriters Laboratories",
        desc: "US Safety & Performance Standard",
        // cert_img: "/images/certs/ul.png" ← TODO
        icon: "🛡️",
        color: "#00C2A8",
    },
    {
        name: "CE Marked",
        body: "European Conformity",
        desc: "EU Market Compliance",
        // cert_img: "/images/certs/ce.png" ← TODO
        icon: "🇪🇺",
        color: "#E84393",
    },
];

/**
 * TICKER MARQUEE ITEMS
 * TODO: Client can add more keywords here
 */
const TICKER = [
    "FIBERGLASS SLEEVES", "SILICONE RUBBER", "ELECTRICAL INSULATION", "TEFLON PTFE",
    "FIBERGLASS YARN", "WOVEN CLOTH", "BRAIDED SLEEVES", "HV CABLES", "ISO 9001",
    "EXPORT QUALITY", "SINCE 2012", "MADE IN INDIA 🇮🇳", "50+ COUNTRIES",
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function useCounter(target, active, duration = 1800) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let prev = null;
        const step = (ts) => {
            if (!prev) prev = ts;
            const p = Math.min((ts - prev) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(step);
            else setVal(target);
        };
        requestAnimationFrame(step);
    }, [active, target, duration]);
    return val;
}

/* ─────────────────────────────────────────────────────────────
   SVG LOGO  (animated hexagonal mark)
───────────────────────────────────────────────────────────── */
function Logo({ size = 48, spin = false }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
            </defs>
            {/* Outer ring */}
            <polygon
                points="50,3 95,26 95,74 50,97 5,74 5,26"
                fill="none" stroke="url(#logoGrad)" strokeWidth="2.5"
                style={spin ? { animation: "rotate 10s linear infinite", transformOrigin: "50px 50px" } : {}}
            />
            {/* Mid ring */}
            <polygon
                points="50,16 80,32 80,68 50,84 20,68 20,32"
                fill="url(#logoGrad)" opacity="0.12"
                style={spin ? { animation: "rotateR 14s linear infinite", transformOrigin: "50px 50px" } : {}}
            />
            {/* S letterform */}
            <text x="50" y="67" textAnchor="middle"
                style={{
                    fontFamily: "'Orbitron',sans-serif", fontSize: "40px",
                    fontWeight: 900, fill: "url(#logoGrad)",
                }}>S</text>
            {/* Corner accent dots */}
            {[[50, 3], [95, 26], [95, 74], [50, 97], [5, 74], [5, 26]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="#FF5C1A"
                    style={{ animation: `pulse 2s ease ${i * 0.28}s infinite` }} />
            ))}
        </svg>
    );
}

/* ─────────────────────────────────────────────────────────────
   3D PRODUCT VIEWER  (CSS 3D — replace with Three.js GLB later)
   ──────────────────────────────────────────────────────────────
   TODO (Phase 3 upgrade):
   1. npm install three @react-three/fiber @react-three/drei
   2. Replace <CSS3DViewer> with <Canvas> + <useGLTF(product.model3d)>
   3. Add OrbitControls for user drag-to-rotate
   4. Load real .glb models from client's factory scans
───────────────────────────────────────────────────────────── */
function ProductViewer3D({ product }) {
    const [angle, setAngle] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [manualAngle, setManualAngle] = useState(null);
    const rafRef = useRef(null);

    // Auto-rotate when not dragging
    useEffect(() => {
        if (dragging || manualAngle !== null) return;
        rafRef.current = requestAnimationFrame(function loop() {
            setAngle(a => (a + 0.4) % 360);
            rafRef.current = requestAnimationFrame(loop);
        });
        return () => cancelAnimationFrame(rafRef.current);
    }, [dragging, manualAngle]);

    const onMouseDown = (e) => { setDragging(true); setStartX(e.clientX); };
    const onMouseMove = (e) => {
        if (!dragging) return;
        const delta = e.clientX - startX;
        setManualAngle(a => ((a ?? angle) + delta * 0.4) % 360);
        setStartX(e.clientX);
    };
    const onMouseUp = () => { setDragging(false); setTimeout(() => setManualAngle(null), 2000); };

    const displayAngle = manualAngle ?? angle;
    const c = product.color || "#FF5C1A";

    return (
        <div
            onMouseDown={onMouseDown} onMouseMove={onMouseMove}
            onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            style={{
                width: "100%", height: "340px", position: "relative",
                cursor: dragging ? "grabbing" : "grab",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                background: `radial-gradient(ellipse at center, ${c}11 0%, transparent 70%)`,
                border: `1px solid ${c}22`,
                userSelect: "none",
            }}
        >
            {/* Grid floor */}
            <div style={{
                position: "absolute", bottom: "24px", left: "10%", right: "10%", height: "2px",
                background: `linear-gradient(90deg, transparent, ${c}44, transparent)`,
            }} />
            <div style={{
                position: "absolute", bottom: "24px", left: "10%", right: "10%",
                height: "40px",
                background: `linear-gradient(to bottom, ${c}08, transparent)`,
            }} />

            {/* The 3D sleeve — CSS cylinder simulation */}
            <div className="viewer-scene" style={{ width: "180px", height: "220px", position: "relative" }}>
                <div style={{
                    width: "100%", height: "100%",
                    transform: `rotateY(${displayAngle}deg) rotateX(8deg)`,
                    transformStyle: "preserve-3d",
                    position: "relative",
                    transition: dragging ? "none" : "transform .05s linear",
                }}>
                    {/* Cylinder body faces */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const rot = i * 30;
                        return (
                            <div key={i} style={{
                                position: "absolute",
                                width: "120px", height: "220px",
                                left: "30px", top: "0",
                                background: `linear-gradient(180deg, ${c}cc 0%, ${c}44 40%, ${c}88 100%)`,
                                border: `1px solid ${c}66`,
                                transform: `rotateY(${rot}deg) translateZ(60px)`,
                                opacity: 0.7 + Math.sin((rot + displayAngle) * Math.PI / 180) * 0.3,
                            }} />
                        );
                    })}

                    {/* Top cap */}
                    <div style={{
                        position: "absolute",
                        width: "120px", height: "120px",
                        left: "30px", top: "-60px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${c}ff 0%, ${c}44 100%)`,
                        border: `2px solid ${c}`,
                        transform: "rotateX(90deg) translateZ(0px)",
                    }} />

                    {/* Bottom cap */}
                    <div style={{
                        position: "absolute",
                        width: "120px", height: "120px",
                        left: "30px", bottom: "-60px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${c}88 0%, ${c}22 100%)`,
                        border: `1px solid ${c}66`,
                        transform: "rotateX(-90deg) translateZ(0px)",
                    }} />
                </div>
            </div>

            {/* Labels */}
            <div style={{
                position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "3px",
                color: "var(--muted)"
            }}>
                {/* TODO: Remove this label when real 3D model is loaded */}
                DRAG TO ROTATE · 3D PREVIEW
            </div>

            {/* Reflection */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(135deg, rgba(255,255,255,.04) 0%, transparent 50%)",
            }} />

            {/* TODO: when Three.js .glb model is ready, replace entire div above with:
       *   <Canvas camera={{ position: [0, 0, 4] }}>
       *     <ambientLight intensity={0.5} />
       *     <spotLight position={[10, 10, 10]} />
       *     <Suspense fallback={null}>
       *       <GLBModel url={product.model3d} />
       *     </Suspense>
       *     <OrbitControls />
       *   </Canvas>
       */}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL MODAL
───────────────────────────────────────────────────────────── */
function ProductModal({ product, onClose }) {
    const [activeImg, setActiveImg] = useState(0);
    useEffect(() => {
        const fn = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [onClose]);

    if (!product) return null;
    const c = product.color;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "rgba(7,7,15,0.92)", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px",
                animation: "fadeIn .25s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "var(--card)", border: `1px solid ${c}33`,
                    width: "100%", maxWidth: "940px", maxHeight: "90vh",
                    overflow: "auto", position: "relative",
                    boxShadow: `0 40px 120px rgba(0,0,0,.8), 0 0 0 1px ${c}22`,
                }}
            >
                {/* Close */}
                <button onClick={onClose} style={{
                    position: "absolute", top: "16px", right: "16px", zIndex: 10,
                    background: "rgba(255,255,255,.1)", border: "none", color: "#fff",
                    width: "36px", height: "36px", cursor: "pointer", fontSize: "16px",
                }}>✕</button>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>

                    {/* LEFT — 3D viewer + gallery */}
                    <div style={{ padding: "40px", borderRight: `1px solid ${c}22` }}>
                        {/* Badge */}
                        <span style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                            fontWeight: 700, background: `${c}22`, color: c,
                            padding: "4px 12px", border: `1px solid ${c}44`,
                            display: "inline-block", marginBottom: "16px"
                        }}>{product.badge}</span>

                        {/* 3D Viewer */}
                        <ProductViewer3D product={product} />

                        {/* Gallery thumbnails */}
                        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                            {product.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    style={{
                                        width: "64px", height: "64px", flexShrink: 0,
                                        background: `${c}${activeImg === i ? "33" : "11"}`,
                                        border: `1px solid ${c}${activeImg === i ? "66" : "22"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "24px", cursor: "pointer", transition: "all .2s",
                                    }}
                                >
                                    {/* TODO: Replace emoji with <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
                                    {img}
                                </div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div style={{ marginTop: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {product.certifications.map((cert, i) => (
                                <span key={i} style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "1px",
                                    color: "var(--muted)", border: "1px solid rgba(255,255,255,.1)",
                                    padding: "3px 10px"
                                }}>{cert}</span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Specs + CTA */}
                    <div style={{ padding: "40px" }}>
                        <div className="tag" style={{ marginBottom: "10px" }}>▸ {product.cat}</div>
                        <h2 style={{
                            fontFamily: "'Rajdhani',sans-serif", fontSize: "28px", fontWeight: 700,
                            color: "#fff", marginBottom: "6px", lineHeight: 1.1
                        }}>{product.name}</h2>
                        <div style={{
                            fontFamily: "'Orbitron',sans-serif", fontSize: "10px", letterSpacing: "2px",
                            color: c, marginBottom: "16px"
                        }}>{product.tagline}</div>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "var(--muted)",
                            lineHeight: 1.8, marginBottom: "24px"
                        }}>{product.desc}</p>

                        {/* Quick spec pills */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                            {[`🌡 ${product.temp}`, `⊙ ${product.dia}`, product.voltage !== "—" && `⚡ ${product.voltage}`]
                                .filter(Boolean).map((s, i) => (
                                    <span key={i} style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "11px", fontWeight: 600,
                                        letterSpacing: "1px",
                                        background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                                        padding: "4px 12px", color: "rgba(255,255,255,.65)"
                                    }}>{s}</span>
                                ))}
                        </div>

                        {/* Detailed specs table */}
                        <div style={{
                            border: `1px solid ${c}22`, marginBottom: "28px"
                        }}>
                            <div style={{
                                padding: "10px 16px",
                                background: `${c}11`,
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                                letterSpacing: "3px", color: c, fontWeight: 700
                            }}>TECHNICAL SPECIFICATIONS</div>
                            {product.specs.map((s, i) => (
                                <div key={i} style={{
                                    display: "flex", justifyContent: "space-between",
                                    padding: "10px 16px",
                                    borderTop: "1px solid rgba(255,255,255,.04)",
                                    background: i % 2 === 0 ? "rgba(255,255,255,.01)" : "transparent",
                                }}>
                                    <span style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", color: "var(--muted)", fontWeight: 600
                                    }}>{s.label}</span>
                                    <span style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", color: "rgba(255,255,255,.85)", fontWeight: 600
                                    }}>{s.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Use cases */}
                        <div style={{ marginBottom: "28px" }}>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                                letterSpacing: "3px", color: "var(--muted)", marginBottom: "12px"
                            }}>COMMON APPLICATIONS</div>
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {product.uses.map((u, i) => (
                                    <span key={i} style={{
                                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                        letterSpacing: "1px", fontWeight: 600,
                                        background: `${c}11`, border: `1px solid ${c}33`,
                                        color: c, padding: "4px 12px"
                                    }}>▸ {u}</span>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <a href="#contact" onClick={onClose} className="btn-orange"
                                style={{ justifyContent: "center" }}>
                                REQUEST QUOTE FOR THIS PRODUCT ▸
                            </a>
                            <a
                                href={`https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(product.name)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                                    background: "#25D366", color: "#fff", padding: "12px 32px",
                                    textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                                    fontSize: "12px", letterSpacing: "3px", fontWeight: 700,
                                    clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
                                }}
                            >💬 WHATSAPP FOR FAST QUOTE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            background: scrolled ? "rgba(7,7,15,0.97)" : "transparent",
            backdropFilter: scrolled ? "blur(24px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,92,26,.12)" : "none",
            transition: "all .4s ease",
            padding: "0 5%", height: "72px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <Logo size={44} spin />
                <div>
                    <div style={{
                        fontFamily: "'Orbitron',sans-serif", fontSize: "16px",
                        fontWeight: 900, letterSpacing: "4px", color: "#fff", lineHeight: 1
                    }}>SUNBOW</div>
                    <div style={{
                        fontFamily: "'Rajdhani',sans-serif", fontSize: "9px",
                        letterSpacing: "5px", color: "var(--orange)", lineHeight: 1.3
                    }}>INSULATION PVT. LTD.</div>
                </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                {["Products", "Industries", "About", "Certifications", "Contact"].map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
                ))}
                <a href="#contact" className="btn-orange" style={{ padding: "10px 24px", fontSize: "11px" }}>
                    GET QUOTE ▸
                </a>
            </div>
        </nav>
    );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function HexBg({ opacity = 0.05 }) {
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

function Hero() {
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

            {/* Glow blobs */}
            <div style={{
                position: "absolute", top: "8%", right: "4%", width: "700px", height: "700px",
                background: "radial-gradient(circle,rgba(255,92,26,.11) 0%,transparent 65%)", pointerEvents: "none"
            }} />
            <div style={{
                position: "absolute", bottom: "-8%", left: "-4%", width: "500px", height: "500px",
                background: "radial-gradient(circle,rgba(255,179,71,.07) 0%,transparent 65%)", pointerEvents: "none"
            }} />

            {/* Scanline */}
            <div style={{
                position: "absolute", left: 0, right: 0, height: "2px", zIndex: 5, pointerEvents: "none",
                background: "linear-gradient(90deg,transparent,rgba(255,92,26,.4),transparent)",
                animation: "scanline 5s linear infinite",
            }} />

            {/* Diagonal band */}
            <div style={{
                position: "absolute", top: 0, bottom: 0, right: 0, width: "44%",
                background: "linear-gradient(135deg,transparent,rgba(255,92,26,.04))",
                clipPath: "polygon(20% 0%,100% 0%,100% 100%,0% 100%)", pointerEvents: "none"
            }} />

            {/* Floating 3D hex graphic */}
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

            {/* Hero text */}
            <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", width: "100%" }}>

                {/* Badge */}
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
                    }}>ISO CERTIFIED · EST. 2012 · NANGLOI, DELHI</span>
                </div>

                <h1 style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    fontSize: "clamp(54px,9vw,128px)",
                    lineHeight: .87, fontWeight: 700, color: "#fff", marginBottom: "20px",
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
                    color: "rgba(255,255,255,.5)", maxWidth: "480px", lineHeight: 1.85, marginBottom: "40px",
                    opacity: loaded ? 1 : 0, transition: "all .7s ease .2s",
                }}>
                    Premium fiberglass, silicone & electrical insulation materials trusted by
                    <strong style={{ color: "rgba(255,255,255,.8)" }}> 10,000+ industries</strong> across
                    <strong style={{ color: "rgba(255,255,255,.8)" }}> 50+ countries</strong>.
                </p>

                <div style={{
                    display: "flex", gap: "16px", flexWrap: "wrap",
                    opacity: loaded ? 1 : 0, transition: "all .7s ease .3s",
                }}>
                    <a href="#products" className="btn-orange">EXPLORE PRODUCTS ▸</a>
                    <a href="#contact" className="btn-ghost">REQUEST BULK QUOTE</a>
                </div>

                {/* Stats */}
                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                    borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: "36px", marginTop: "60px",
                    opacity: loaded ? 1 : 0, transition: "all .8s ease .5s",
                }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{
                            borderRight: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none",
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

            {/* Scroll indicator */}
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

/* ─────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────── */
function Ticker() {
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

/* ─────────────────────────────────────────────────────────────
   PRODUCTS  (Phase 2 — with modal + 3D viewer)
───────────────────────────────────────────────────────────── */
function Products() {
    const [ref, inView] = useInView();
    const [cat, setCat] = useState("ALL");
    const [hovered, setHovered] = useState(null);
    const [modal, setModal] = useState(null); // product object

    const filtered = cat === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

    return (
        <section id="products" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <HexBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                    marginBottom: "48px", flexWrap: "wrap", gap: "20px",
                    opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                    transition: "all .6s ease",
                }}>
                    <div>
                        <div className="tag" style={{ marginBottom: "10px" }}>▸ PRODUCT CATALOG</div>
                        <h2 className="title" style={{ fontSize: "clamp(32px,4vw,58px)" }}>
                            INDUSTRIAL GRADE<br />
                            <span style={{ color: "var(--orange)" }}>INSULATION MATERIALS</span>
                        </h2>
                    </div>
                    <p style={{
                        fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "var(--muted)",
                        maxWidth: "300px", lineHeight: 1.75,
                    }}>
                        All products in custom sizes, grades & quantities.<br />
                        MOQ negotiable · Bulk discounts available.
                    </p>
                </div>

                {/* Category filter */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
                    {CATEGORIES.map(c => (
                        <button key={c.id}
                            onClick={() => setCat(c.id)}
                            style={{
                                background: cat === c.id ? "var(--orange)" : "transparent",
                                border: cat === c.id ? "1px solid var(--orange)" : "1px solid rgba(255,255,255,.1)",
                                color: cat === c.id ? "#fff" : "var(--muted)",
                                padding: "8px 20px",
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                letterSpacing: "2px", fontWeight: 700, cursor: "pointer", transition: "all .22s",
                            }}
                        >{c.label}</button>
                    ))}
                </div>

                {/* Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "2px",
                }}>
                    {filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className="pcard"
                            onMouseEnter={() => setHovered(p.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setModal(p)}
                            style={{
                                background: "var(--card)",
                                border: hovered === p.id
                                    ? `1px solid ${p.color}55`
                                    : "1px solid rgba(255,255,255,.06)",
                                padding: "32px", position: "relative", overflow: "hidden",
                                opacity: inView ? 1 : 0,
                                transform: inView ? "none" : "translateY(40px)",
                                transition: `all .5s ease ${i * .07}s`,
                            }}
                        >
                            {/* Corner glow */}
                            <div style={{
                                position: "absolute", top: 0, right: 0,
                                width: "80px", height: "80px",
                                background: hovered === p.id ? `${p.color}18` : "transparent",
                                clipPath: "polygon(100% 0%,0% 0%,100% 100%)",
                                transition: "background .3s",
                            }} />

                            {/* Top row */}
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "flex-start", marginBottom: "20px"
                            }}>
                                <div style={{
                                    width: "68px", height: "68px",
                                    background: `linear-gradient(135deg, ${p.color}22, ${p.color}0a)`,
                                    border: `1px solid ${p.color}44`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "30px",
                                    filter: hovered === p.id ? `drop-shadow(0 0 14px ${p.color}99)` : "none",
                                    transition: "filter .3s",
                                }}>
                                    {/* TODO: Replace emoji with:
                   * <img src={p.img} alt={p.name}
                   *   style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                   */}
                                    {p.img}
                                </div>
                                <span style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px", letterSpacing: "2px",
                                    fontWeight: 700,
                                    background: `${p.badgeColor}22`, color: p.badgeColor,
                                    padding: "5px 12px", border: `1px solid ${p.badgeColor}44`,
                                }}>{p.badge}</span>
                            </div>

                            <h3 style={{
                                fontFamily: "'Rajdhani',sans-serif", fontSize: "21px",
                                fontWeight: 700, color: "#fff", margin: "0 0 4px", letterSpacing: "1px"
                            }}>{p.name}</h3>

                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                letterSpacing: "2px", color: p.color, marginBottom: "14px"
                            }}>{p.tagline}</div>

                            {/* Spec pills */}
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                                {[`🌡 ${p.temp}`, `⊙ ${p.dia}`, p.voltage !== "—" && `⚡ ${p.voltage}`]
                                    .filter(Boolean).map((s, j) => (
                                        <span key={j} style={{
                                            fontFamily: "'Rajdhani',sans-serif", fontSize: "11px",
                                            fontWeight: 600, letterSpacing: "1px",
                                            background: "rgba(255,255,255,.05)",
                                            border: "1px solid rgba(255,255,255,.08)",
                                            padding: "3px 10px", color: "rgba(255,255,255,.6)",
                                        }}>{s}</span>
                                    ))}
                            </div>

                            <p style={{
                                fontSize: "13px", color: "rgba(255,255,255,.42)",
                                fontFamily: "'Inter',sans-serif", lineHeight: 1.7,
                                marginBottom: "22px", fontWeight: 300,
                            }}>{p.desc}</p>

                            {/* Bottom CTA */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "9px",
                                    letterSpacing: "2px", color: "var(--muted)"
                                }}>CLICK FOR 3D VIEW + SPECS</span>
                                <span style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                                    letterSpacing: "2px", fontWeight: 700, color: p.color,
                                    opacity: hovered === p.id ? 1 : .5, transition: "opacity .3s",
                                }}>VIEW ▸</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
   CERTIFICATIONS  (new section Phase 2)
───────────────────────────────────────────────────────────── */
function Certifications() {
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
                            background: "var(--card)", border: "1px solid rgba(255,255,255,.06)",
                            padding: "40px 28px", textAlign: "center", position: "relative", overflow: "hidden",
                            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
                            transition: `all .5s ease ${i * .1}s`,
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${c.color}44`;
                                e.currentTarget.style.background = `rgba(${c.color},0.05)`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
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
                                {/* TODO: Replace with:
                 * <img src={c.cert_img} alt={c.name}
                 *   style={{width:"48px",height:"48px",objectFit:"contain"}}/>
                 */}
                                {c.icon}
                            </div>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "13px",
                                fontWeight: 700, letterSpacing: "2px", color: "#fff", marginBottom: "6px"
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

/* ─────────────────────────────────────────────────────────────
   STATS COUNTER
───────────────────────────────────────────────────────────── */
function StatsSection() {
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

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────── */
function Contact() {
    const [ref, inView] = useInView();
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "", qty: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!form.name || !form.phone) return;
        setLoading(true);
        // TODO: Replace with real API call to FastAPI backend
        // const res = await fetch("/api/enquiries", {
        //   method:"POST",
        //   headers:{"Content-Type":"application/json"},
        //   body:JSON.stringify(form)
        // });
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false); setSent(true);
    };

    const inp = {
        width: "100%", background: "rgba(255,255,255,.03)", border: "none",
        borderBottom: "1px solid rgba(255,92,26,.3)", color: "#fff",
        padding: "12px 0", marginBottom: "18px", fontSize: "14px", fontWeight: 300,
        fontFamily: "'Inter',sans-serif", outline: "none", boxSizing: "border-box",
        transition: "border-color .2s",
    };

    return (
        <section id="contact" ref={ref} style={{
            background: "var(--dark)", padding: "100px 5%", position: "relative", overflow: "hidden"
        }}>
            <HexBg opacity={0.04} />
            <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "start" }}>

                    {/* Left info */}
                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-40px)",
                        transition: "all .7s ease"
                    }}>
                        <div className="tag" style={{ marginBottom: "12px" }}>▸ GET IN TOUCH</div>
                        <h2 className="title" style={{ fontSize: "clamp(32px,4vw,52px)", marginBottom: "20px" }}>
                            REQUEST A<br /><span style={{ color: "var(--orange)" }}>QUOTE TODAY</span>
                        </h2>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontSize: "15px", color: "var(--muted)",
                            lineHeight: 1.85, marginBottom: "48px", fontWeight: 300,
                        }}>
                            Share your requirement — our technical team responds within
                            <strong style={{ color: "rgba(255,255,255,.8)" }}> 2 hours </strong>
                            with detailed specifications and competitive pricing.
                        </p>

                        {[
                            { icon: "📍", label: "Factory Address", val: "A-26B, Kunwar Singh Nagar, Nangloi, Delhi 110041" },
                            { icon: "📞", label: "Call / WhatsApp", val: "+91 80489 70649" },
                            { icon: "✉️", label: "Email", val: "info@sunbowinsulation.in" },
                            { icon: "⏰", label: "Response Time", val: "Within 2 hours (Mon–Sat, 9am–7pm)" },
                        ].map((c, i) => (
                            <div key={i} style={{
                                display: "flex", gap: "16px", marginBottom: "24px",
                                opacity: inView ? 1 : 0, transition: `all .5s ease ${.3 + i * .1}s`,
                            }}>
                                <div style={{
                                    width: "44px", height: "44px", flexShrink: 0,
                                    background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
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

                        <a href="https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote"
                            target="_blank" rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "12px",
                                background: "#25D366", color: "#fff", padding: "14px 28px",
                                textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                                fontSize: "13px", letterSpacing: "2px", fontWeight: 700,
                                animation: "glow 2s ease-in-out infinite",
                                clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)",
                            }}>
                            <span style={{ fontSize: "20px" }}>💬</span> CHAT ON WHATSAPP
                        </a>
                    </div>

                    {/* Right form */}
                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(40px)",
                        transition: "all .7s ease .2s",
                    }}>
                        {sent ? (
                            <div style={{
                                background: "rgba(255,92,26,.08)", border: "1px solid rgba(255,92,26,.25)",
                                padding: "60px 40px", textAlign: "center",
                            }}>
                                <div style={{
                                    width: "70px", height: "70px", borderRadius: "50%",
                                    background: "rgba(255,92,26,.15)", border: "2px solid var(--orange)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "30px", margin: "0 auto 20px",
                                }}>✓</div>
                                <h3 style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "18px",
                                    color: "var(--orange)", marginBottom: "12px", letterSpacing: "2px"
                                }}>ENQUIRY RECEIVED</h3>
                                <p style={{
                                    fontFamily: "'Inter',sans-serif", fontSize: "14px",
                                    color: "var(--muted)", lineHeight: 1.7
                                }}>
                                    Our team will contact you within 2 hours.<br />
                                    WhatsApp confirmation sent to {form.phone}.
                                    {/* TODO: When backend is ready, this will trigger:
                   * 1. PostgreSQL insert (enquiries table)
                   * 2. WhatsApp message to client (Meta API)
                   * 3. WhatsApp confirmation to customer
                   * 4. Admin dashboard notification
                   */}
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                background: "var(--card)", border: "1px solid rgba(255,255,255,.06)", padding: "40px"
                            }}>
                                <div style={{
                                    fontFamily: "'Orbitron',sans-serif", fontSize: "11px",
                                    letterSpacing: "3px", color: "var(--orange)", marginBottom: "28px"
                                }}>▸ SEND ENQUIRY</div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                                    {[
                                        { key: "name", ph: "Full Name *", type: "text" },
                                        { key: "company", ph: "Company Name", type: "text" },
                                        { key: "phone", ph: "Phone / WhatsApp *", type: "tel" },
                                        { key: "email", ph: "Email Address", type: "email" },
                                    ].map(f => (
                                        <input key={f.key} type={f.type} placeholder={f.ph}
                                            value={form[f.key]}
                                            onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                            style={inp}
                                            onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                            onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"}
                                        />
                                    ))}
                                </div>

                                {[
                                    { key: "product", ph: "Product Required (e.g. Fiberglass Sleeve 10mm, 1000 pcs)" },
                                    { key: "qty", ph: "Quantity / Estimated MOQ" },
                                ].map(f => (
                                    <input key={f.key} placeholder={f.ph}
                                        value={form[f.key]}
                                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        style={{ ...inp, width: "100%" }}
                                        onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                        onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"}
                                    />
                                ))}

                                <textarea placeholder="Additional specs, size, grade, certification needed..."
                                    value={form.message} rows={4}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{ ...inp, resize: "vertical", width: "100%" }}
                                    onFocus={e => e.target.style.borderBottomColor = "#FF5C1A"}
                                    onBlur={e => e.target.style.borderBottomColor = "rgba(255,92,26,.3)"}
                                />

                                <button className="btn-orange" onClick={submit}
                                    style={{
                                        width: "100%", justifyContent: "center", fontSize: "12px",
                                        opacity: loading ? .7 : 1, cursor: loading ? "wait" : "pointer"
                                    }}>
                                    {loading ? "SENDING..." : "SUBMIT ENQUIRY → GET WHATSAPP REPLY ▸"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
    return (
        <footer style={{
            background: "#050510", borderTop: "1px solid rgba(255,92,26,.1)",
            padding: "48px 5% 28px"
        }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: "40px", marginBottom: "40px"
                }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                            <Logo size={40} />
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
                            lineHeight: 1.8, maxWidth: "260px", fontWeight: 300
                        }}>
                            Manufacturer & exporter of premium fiberglass and silicone insulation
                            products since 2012. Serving 50+ countries.
                        </p>
                    </div>

                    {[
                        { title: "Products", links: ["Fiberglass Sleeves", "Silicone Rubber", "Electrical Insulation", "Fiberglass Yarn", "Woven Cloth", "PVC Teflon / PTFE"] },
                        { title: "Company", links: ["About Us", "Manufacturing", "Certifications", "Quality Policy", "Export", "Careers"] },
                        { title: "Contact", links: ["Get a Quote", "WhatsApp Us", "Email Us", "Delhi Factory", "Distributor Enquiry", "Support"] },
                    ].map((col, i) => (
                        <div key={i}>
                            <div style={{
                                fontFamily: "'Orbitron',sans-serif", fontSize: "10px",
                                letterSpacing: "3px", color: "var(--orange)", marginBottom: "16px", fontWeight: 700
                            }}>{col.title}</div>
                            {col.links.map((l, j) => (
                                <div key={j} style={{
                                    fontFamily: "'Rajdhani',sans-serif", fontSize: "13px",
                                    letterSpacing: "1px", color: "var(--muted)", marginBottom: "9px", cursor: "pointer",
                                    transition: "color .2s"
                                }}
                                    onMouseEnter={e => e.target.style.color = "#fff"}
                                    onMouseLeave={e => e.target.style.color = "var(--muted)"}
                                >{l}</div>
                            ))}
                        </div>
                    ))}
                </div>

                <div style={{
                    borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: "24px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: "12px"
                }}>
                    <div style={{
                        fontFamily: "'Rajdhani',sans-serif", fontSize: "12px",
                        letterSpacing: "1px", color: "rgba(255,255,255,.25)"
                    }}>
                        © 2024 Sunbow Insulation Pvt. Ltd. · All Rights Reserved · Made in India 🇮🇳
                    </div>
                    <div style={{ display: "flex", gap: "24px" }}>
                        {["Privacy Policy", "Terms & Conditions", "GST No: PENDING"].map((l, i) => (
                            /* TODO: Replace "GST No: PENDING" with actual GST number from client */
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

/* ─────────────────────────────────────────────────────────────
   WHATSAPP FLOAT BUTTON
───────────────────────────────────────────────────────────── */
function WAButton() {
    return (
        <a href="https://wa.me/918048970649?text=Hello%2C%20I%20need%20a%20quote%20for%20Sunbow%20products"
            target="_blank" rel="noopener noreferrer"
            title="Chat on WhatsApp for fast quote"
            style={{
                position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
                width: "62px", height: "62px", borderRadius: "50%",
                background: "#25D366",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", fontSize: "28px",
                animation: "waPulse 2.5s ease infinite",
                boxShadow: "0 4px 20px rgba(37,211,102,.4)",
                transition: "transform .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >💬</a>
    );
}

// ── POPUP CONFIG ──────────────────────────────────────────────
// TODO: Client edits these from admin panel (Phase 4)
// For now change text/dates here manually
const POPUP_CONFIG = {
    enabled: true,
    triggerAfterSeconds: 4,     // show after 4 seconds
    showOncePerSession: true,   // don't annoy repeat visitors

    // Festivals — set dates, auto-activates in range
    festivals: [
        {
            name: "Diwali Special",
            active: true,           // ← client toggles this
            startDate: "2024-10-15",
            endDate: "2024-11-05",
            badge: "🪔 Diwali Special Offer",
            title: "Illuminate your business this Diwali",
            sub: "Special pricing on all fiberglass and silicone sleeves",
            offer1: "15% off bulk orders",
            offer2: "Free shipping above ₹50K",
            cta: "Get Diwali Quote on WhatsApp",
            color: "#FF8C00",
            expires: "2024-11-05",
        },
        // TODO: Add more festivals
        // { name: "Republic Day", startDate: "2025-01-24", endDate: "2025-01-27", ... }
        // { name: "Independence Day", startDate: "2025-08-13", endDate: "2025-08-16", ... }
    ],

    // Always-on discount popup (when no festival is active)
    default: {
        badge: "💰 Bulk Order Discount",
        title: "Order more, save more",
        sub: "Tiered pricing for wholesale and export orders",
        offer1: "500m+ → 10% off",
        offer2: "2000m+ → 20% off",
        cta: "Calculate my savings",
        color: "#185FA5",
    }
};

function PopupBanner() {
    const [visible, setVisible] = useState(false);

    // Find active festival or use default
    const today = new Date();
    const festival = POPUP_CONFIG.festivals.find(f => {
        if (!f.active) return false;
        return today >= new Date(f.startDate) && today <= new Date(f.endDate);
    });
    const popup = festival || POPUP_CONFIG.default;

    useEffect(() => {
        if (!POPUP_CONFIG.enabled) return;
        if (sessionStorage.getItem("popup_shown")) return; // once per session
        const t = setTimeout(() => {
            setVisible(true);
            sessionStorage.setItem("popup_shown", "1");
        }, POPUP_CONFIG.triggerAfterSeconds * 1000);
        return () => clearTimeout(t);
    }, []);

    if (!visible) return null;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(7,7,15,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px", animation: "fadeIn .3s ease"
        }} onClick={() => setVisible(false)}>
            <div onClick={e => e.stopPropagation()} style={{
                background: "#0E0E1C", border: `1px solid ${popup.color}44`,
                borderRadius: "4px", width: "400px", maxWidth: "95%",
                boxShadow: `0 0 60px ${popup.color}33`, overflow: "hidden"
            }}>
                {/* Header strip */}
                <div style={{ background: `${popup.color}22`, padding: "28px 28px 20px", textAlign: "center" }}>
                    <div style={{
                        fontSize: "13px", color: popup.color, letterSpacing: "2px",
                        fontFamily: "'Orbitron',sans-serif", marginBottom: "10px"
                    }}>{popup.badge}</div>
                    <h3 style={{
                        fontFamily: "'Rajdhani',sans-serif", fontSize: "24px",
                        fontWeight: 700, color: "#fff", margin: "0 0 8px"
                    }}>{popup.title}</h3>
                    <p style={{
                        fontFamily: "'Inter',sans-serif", fontSize: "13px",
                        color: "rgba(255,255,255,.55)", margin: 0
                    }}>{popup.sub}</p>
                </div>

                {/* Offer chips */}
                <div style={{ padding: "20px 28px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                        {[popup.offer1, popup.offer2].map((o, i) => (
                            <div key={i} style={{
                                flex: 1, background: `${popup.color}18`,
                                border: `1px solid ${popup.color}33`, padding: "8px 12px",
                                textAlign: "center", fontFamily: "'Rajdhani',sans-serif",
                                fontSize: "12px", fontWeight: 700, letterSpacing: "1px", color: popup.color
                            }}>
                                {o}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <a href={`https://wa.me/918048970649?text=Hi, I saw your ${popup.badge} and want a quote`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            display: "block", background: popup.color, color: "#fff",
                            padding: "14px", textAlign: "center", textDecoration: "none",
                            fontFamily: "'Rajdhani',sans-serif", fontSize: "13px",
                            letterSpacing: "2px", fontWeight: 700,
                            clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)"
                        }}>
                        {popup.cta} ▸
                    </a>

                    {/* Dismiss */}
                    <button onClick={() => setVisible(false)} style={{
                        display: "block", width: "100%", marginTop: "10px", background: "none",
                        border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer",
                        fontFamily: "'Inter',sans-serif", fontSize: "12px", padding: "6px"
                    }}>No thanks, close</button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────── */
export default function App() {
    return (
        <>
            <GlobalStyles />
            <PopupBanner />
            <Navbar />
            <Hero />
            <Ticker />
            <Products />         {/* ← Phase 2: 3D viewer + modal */}
            <Certifications />   {/* ← Phase 2: new section */}
            <StatsSection />
            <Contact />
            <Footer />
            <WAButton />
        </>
    );
}

/*
 * ============================================================
 *  PUSHKAR'S TODO LIST — replace before going live
 * ============================================================
 *
 *  IMAGES (most important):
 *  ✏️  Each product → replace img emoji with real photo path
 *  ✏️  Each product → replace gallery[] emojis with real photos
 *  ✏️  Certifications → replace cert_img paths with actual logos
 *
 *  DATA from client:
 *  ✏️  GST number (in Footer)
 *  ✏️  Exact product catalog (add/remove products)
 *  ✏️  Real phone, email, address (verify current ones)
 *  ✏️  Company incorporation year (currently 2012)
 *
 *  3D MODELS (Phase 3 upgrade):
 *  ✏️  Get .glb product scan files from client
 *  ✏️  Install: npm install three @react-three/fiber @react-three/drei
 *  ✏️  Replace <ProductViewer3D> CSS with real Three.js Canvas
 *
 *  BACKEND (Phase 3):
 *  ✏️  Connect form submit() to FastAPI POST /api/enquiries
 *  ✏️  Add JWT auth for admin panel
 *  ✏️  WhatsApp automation on form submit
 * ============================================================
 */
// 📋 Your Immediate Checklist from Client
// Ask the client for these things right now:

// Product photos — at least 2-3 per product
// GST number
// Certification logos (ISO, UL, CE)
// Exact product list — confirm all 9 or add more
// Company email — verify info@sunbowinsulation.in
"use client";

export default function GlobalStyles() {
    return (
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

        .desktop-only { display: none; }
        @media (min-width: 900px) {
            .desktop-only { display: flex !important; }
        }
    
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
      `}</style>
    );
}

"use client";

export default function Logo({ size = 48, spin = false }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
            </defs>
            <polygon
                points="50,3 95,26 95,74 50,97 5,74 5,26"
                fill="none" stroke="url(#logoGrad)" strokeWidth="2.5"
                style={spin ? { animation: "rotate 10s linear infinite", transformOrigin: "50px 50px" } : {}}
            />
            <polygon
                points="50,16 80,32 80,68 50,84 20,68 20,32"
                fill="url(#logoGrad)" opacity="0.12"
                style={spin ? { animation: "rotateR 14s linear infinite", transformOrigin: "50px 50px" } : {}}
            />
            <text x="50" y="67" textAnchor="middle"
                style={{
                    fontFamily: "'Orbitron',sans-serif", fontSize: "40px",
                    fontWeight: 900, fill: "url(#logoGrad)",
                }}>S</text>
            {[[50, 3], [95, 26], [95, 74], [50, 97], [5, 74], [5, 26]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="#FF5C1A"
                    style={{ animation: `pulse 2s ease ${i * 0.28}s infinite` }} />
            ))}
        </svg>
    );
}

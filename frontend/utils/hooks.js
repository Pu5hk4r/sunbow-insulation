import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.12) {
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

export function useCounter(target, active, duration = 1800) {
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

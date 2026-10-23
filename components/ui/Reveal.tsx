'use client';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
/** Content stays visible in the server HTML; motion only hides it after hydration. */
export function Reveal({ children, className = '', delay = 0 }: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: .12 });
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);
    const visible = { opacity: 1, y: 0, filter: 'blur(0px)' };
    const hidden = { opacity: 0, y: 28, filter: 'blur(8px)' };
    return <motion.div ref={ref} className={className} initial={false} animate={!hydrated || reduced || inView ? visible : hidden} transition={{ duration: .75, delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>;
}

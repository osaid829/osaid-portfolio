'use client';

import { useEffect, useRef } from 'react';

const glyphs = ' .·:+=*#%@';

export function AsciiField({ compact = false }: { compact?: boolean }) {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;
        let animation = 0;
        const render = (time: number) => {
            const width = compact ? 34 : Math.min(72, Math.max(40, Math.floor(element.clientWidth / 10)));
            const height = compact ? 12 : 18;
            const phase = reduced ? 1.8 : time * 0.00055;
            const lines = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
                const dx = x / width - .5;
                const dy = y / height - .5;
                const radius = Math.sqrt(dx * dx + dy * dy);
                const wave = Math.sin(dx * 14 + phase * 3) + Math.cos(dy * 18 - phase * 2) + Math.sin(radius * 30 - phase * 4);
                const intensity = Math.max(0, Math.min(1, (wave + 2.2) / 4.6 - radius * .5));
                return glyphs[Math.floor(intensity * (glyphs.length - 1))];
            }).join('')).join('\n');
            element.textContent = lines;
            frame += 1;
            if (!reduced || frame === 1) animation = window.requestAnimationFrame(render);
        };
        animation = window.requestAnimationFrame(render);
        return () => window.cancelAnimationFrame(animation);
    }, [compact]);

    return <pre ref={ref} className={`ascii-field${compact ? ' ascii-field-compact' : ''}`} aria-hidden="true" />;
}

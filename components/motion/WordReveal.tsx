'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const words = 'The details are not the decoration. They are the experience.'.split(' ');

export function WordReveal() {
    const scope = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const targets = gsap.utils.toArray<HTMLElement>('.manifesto-word', scope.current);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            gsap.set(targets, { opacity: 1 });
            return;
        }
        gsap.fromTo(targets, { opacity: .12 }, {
            opacity: 1,
            stagger: .1,
            ease: 'none',
            scrollTrigger: {
                trigger: scope.current,
                start: 'top 78%',
                end: 'bottom 32%',
                scrub: true,
                invalidateOnRefresh: true,
            },
        });
    }, { scope });

    return <div ref={scope} className="manifesto">
        <p aria-label={words.join(' ')}>{words.map((word, index) => <span className="manifesto-word" aria-hidden="true" key={`${word}-${index}`}>{word} </span>)}</p>
    </div>;
}

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const panels = [
    {
        title: 'Make the first move obvious.',
        copy: 'The strongest interfaces remove hesitation before they add decoration.',
        image: 'https://picsum.photos/seed/kinetic-light/1400/1100',
    },
    {
        title: 'Give the system a pulse.',
        copy: 'Motion should reveal hierarchy, confirm an action, or make a relationship easier to feel.',
        image: 'https://picsum.photos/seed/midnight-material/1400/1100',
    },
    {
        title: 'Leave room for the human.',
        copy: 'A polished build still needs space for curiosity, mistakes, and the next good question.',
        image: 'https://picsum.photos/seed/soft-geometry/1400/1100',
    },
];

export function FocusGallery() {
    const scope = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const desktop = window.matchMedia('(min-width: 768px)').matches;
        const cards = gsap.utils.toArray<HTMLElement>('.focus-card', scope.current);
        const images = gsap.utils.toArray<HTMLElement>('.focus-card-image', scope.current);
        if (reduce || !desktop) {
            gsap.set([...cards, ...images], { clearProps: 'all' });
            return;
        }

        const intro = scope.current?.querySelector<HTMLElement>('.focus-intro');
        if (intro) {
            ScrollTrigger.create({
                trigger: scope.current,
                start: 'top top+=112',
                end: 'bottom bottom-=80',
                pin: intro,
                pinSpacing: false,
                invalidateOnRefresh: true,
            });
        }

        cards.forEach((card, index) => {
            const image = images[index];
            gsap.fromTo(card, { scale: .8, opacity: .2 }, {
                scale: 1,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%',
                    end: 'top 26%',
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
            if (image) {
                gsap.fromTo(image, { scale: 1.2, filter: 'grayscale(1) brightness(.55)' }, {
                    scale: 1,
                    filter: 'grayscale(.15) brightness(.95)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 96%',
                        end: 'bottom 15%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            }
            const next = cards[index + 1];
            if (next) {
                gsap.to(card, {
                    scale: .92,
                    opacity: .2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: next,
                        start: 'top 88%',
                        end: 'top 24%',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            }
        });
        ScrollTrigger.refresh();
    }, { scope });

    return <div ref={scope} className="focus-shell">
        <div className="focus-intro">
            <h2>Good work gets clearer<br /><em>as it moves.</em></h2>
            <p>Three things I return to whenever an idea starts to become an interface.</p>
        </div>
        <div className="focus-gallery">
            {panels.map(panel => <article className="focus-card" key={panel.title}>
                <div className="focus-card-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(5, 6, 10, .08), rgba(5, 6, 10, .78)), url('${panel.image}')` }} aria-hidden="true" />
                <div className="focus-card-copy">
                    <h3>{panel.title}</h3>
                    <p>{panel.copy}</p>
                </div>
            </article>)}
        </div>
    </div>;
}

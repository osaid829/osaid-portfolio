import { FocusGallery } from '@/components/motion/FocusGallery';
import { WordReveal } from '@/components/motion/WordReveal';

export function Approach() {
    return <section id="approach" className="section focus-section" aria-label="How Osaid approaches the work">
        <div className="shell">
            <p className="section-intro-line">A practical creative practice</p>
        </div>
        <div className="shell">
            <FocusGallery />
        </div>
        <WordReveal />
    </section>;
}

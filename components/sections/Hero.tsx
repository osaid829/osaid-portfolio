import { CoreExperience } from '@/components/three/CoreExperience';
import { AsciiField } from '@/components/motion/AsciiField';
import { site } from '@/config/site';
import { Icon } from '@/components/ui/Icon';

export function Hero() {
    return <section id="home" className="hero shell" aria-labelledby="hero-title">
        <div className="hero-layout">
            <div className="hero-copy">
                <p className="hero-kicker">Full-stack / creative developer</p>
                <h1 id="hero-title">I build <span className="inline-hero-image" aria-hidden="true" /> interfaces<br className="desktop-break" /> that hold up.</h1>
                <p className="hero-description">{site.description}</p>
                <div className="hero-actions">
                    <a className="hero-cta hero-cta-primary" href="#projects">View selected work <span><Icon name="arrow" /></span></a>
                    {site.githubUrl && <a className="hero-cta hero-cta-secondary" href={site.githubUrl} target="_blank" rel="noopener noreferrer">Open GitHub <span><Icon name="arrow" /></span></a>}
                </div>
            </div>
            <div className="hero-stage" aria-label="Interactive 3D system study">
                <AsciiField />
                <div className="hero-stage-glow" aria-hidden="true" />
                <CoreExperience />
            </div>
        </div>
        <div className="hero-bottom">
            <p>Interfaces, systems, and the details between them.</p>
            <a href="#about" className="scroll-link">Keep going <Icon name="down" /></a>
        </div>
    </section>;
}

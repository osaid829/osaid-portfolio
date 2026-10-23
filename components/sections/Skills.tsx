import { AsciiField } from '@/components/motion/AsciiField';

export function Skills() {
    return <section id="skills" className="section shell skills-section" aria-labelledby="skills-title">
        <div className="chapter-heading chapter-heading-wide">
            <h2 id="skills-title">Built where design<br /><span>meets systems.</span></h2>
            <p>A connected toolkit for turning loose ideas into interfaces people can understand, use, and remember.</p>
        </div>
        <div className="bento-grid" aria-label="Capabilities">
            <article className="bento-card bento-card-primary">
                <div className="bento-card-copy">
                    <p className="bento-kicker">Interfaces</p>
                    <h3>Clear on the surface.<br />Thoughtful underneath.</h3>
                    <p>Responsive product surfaces with the right rhythm, states, and small moments of feedback.</p>
                </div>
                <div className="bento-network-wrap">
                    <img src="/generated/skill-network.svg" width="700" height="455" loading="lazy" alt="A connected network showing frontend, interactive UI, 3D web, Python, and AI integration." />
                </div>
            </article>
            <article className="bento-card bento-card-secondary" style={{ backgroundImage: "linear-gradient(135deg, rgba(7, 8, 14, .18), rgba(7, 8, 14, .92)), url('https://picsum.photos/seed/quiet-architecture/1200/900')" }}>
                <div className="bento-card-copy">
                    <p className="bento-kicker">Systems</p>
                    <h3>Logic that disappears into the experience.</h3>
                    <p>Figma, Next.js, React, TypeScript, application logic, API integration.</p>
                </div>
            </article>
            <article className="bento-card bento-card-tertiary">
                <AsciiField compact />
                <div className="bento-card-copy">
                    <p className="bento-kicker">Spatial work</p>
                    <h3>Motion with a reason to exist.</h3>
                    <p>Three.js, R3F, procedural art, and interactions that reward attention.</p>
                </div>
            </article>
        </div>
    </section>;
}

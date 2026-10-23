import { Reveal } from '@/components/ui/Reveal';

export function About() {
    return <section id="about" className="section shell about-section" aria-labelledby="about-title">
        <div className="chapter-heading">
            <h2 id="about-title">The surface is only<br /><em>the beginning.</em></h2>
            <p>Good digital work makes the complex feel natural. That is the part I keep coming back to.</p>
        </div>
        <Reveal className="about-grid">
            <div className="about-visual" aria-hidden="true">
                <div className="about-visual-orbit orbit-one" />
                <div className="about-visual-orbit orbit-two" />
                <div className="about-visual-core" />
                <span>curiosity / clarity / craft</span>
            </div>
            <div className="about-copy">
                <p className="lead">I’m Osaid, a full-stack / creative developer. I care about the seam between a good idea and a good interaction.</p>
                <p>I build web products and small tools, then keep looking for the decisions that make them clearer, faster, and more interesting. The surface matters. So do the systems, states, and constraints underneath it.</p>
                <p>This space is a record of that practice: shipped experiments, open questions, and the next thing worth building.</p>
                <dl className="profile-data">
                    <div><dt>Focus</dt><dd>Web applications / Interactive experiences</dd></div>
                    <div><dt>Method</dt><dd>Build, inspect, understand, refine</dd></div>
                    <div><dt>Off screen</dt><dd>Fiction, chess & a Rubik’s cube</dd></div>
                </dl>
            </div>
        </Reveal>
    </section>;
}

import { SocialLinks } from '@/components/ui/SocialLinks';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/config/site';

export function Contact() {
    return <>
        <section id="contact" className="contact section shell" aria-labelledby="contact-title">
            <div className="contact-heading">
                <p className="section-intro-line">The next good problem</p>
                <h2 id="contact-title">Let’s make something<br /><span>people remember.</span></h2>
            </div>
            <div className="contact-grid">
                <div className="contact-copy">
                    <p className="contact-lead">A clear idea. An interesting problem. Enough room to make it feel inevitable.</p>
                    <p>Tell me what you are trying to make, where it feels stuck, or what should feel different. I’ll bring a point of view and a working first step.</p>
                    {site.email && <a className="hero-cta hero-cta-primary contact-cta" href={`mailto:${site.email}`}>Start a conversation <span><Icon name="arrow" /></span></a>}
                </div>
                <div className="contact-panel">
                    {site.email && <a className="contact-path" href={`mailto:${site.email}`}><span>{site.email}</span><Icon name="arrow" /></a>}
                    <SocialLinks compact />
                </div>
            </div>
        </section>
        <footer className="shell footer">
            <a className="footer-name" href="#home">OSAID<span>+</span></a>
            <div><span>Full-stack / creative developer</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
            <p>© {new Date().getFullYear()} Osaid</p>
        </footer>
    </>;
}

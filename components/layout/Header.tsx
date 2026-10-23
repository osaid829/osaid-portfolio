'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useReducedMotion } from 'framer-motion';
const links = [{ id: 'about', label: 'About' }, { id: 'skills', label: 'Toolkit' }, { id: 'approach', label: 'Approach' }, { id: 'projects', label: 'Work' }, { id: 'contact', label: 'Contact' }];
export function Header() {
    const [active, setActive] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const reduced = useReducedMotion();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries)
                if (entry.isIntersecting)
                    setActive(entry.target.id);
        }, { rootMargin: '-15% 0px -55% 0px' });
        ['home', ...links.map(x => x.id)].forEach(id => { const element = document.getElementById(id); if (element)
            observer.observe(element); });
        return () => observer.disconnect();
    }, []);
    const closeMenu = () => setMenuOpen(false);
    return <header className="site-header">
        {!reduced && <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX: scrollYProgress }} />}
        <div className="shell header-inner">
            <a className="wordmark" href="#home" aria-label="Osaid, home" onClick={closeMenu}>o<span className="mark-cross">+</span>said<span className="wordmark-period">.</span></a>
            <nav className="desktop-nav" aria-label="Main navigation">
                {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined}>{link.label}</a>)}
            </nav>
            <span className="header-note">Full-stack / creative developer</span>
            <button className={`menu-button${menuOpen ? ' is-open' : ''}`} type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(value => !value)}>
                <span /><span />
            </button>
        </div>
        <AnimatePresence>
            {menuOpen && <motion.nav id="mobile-navigation" className="mobile-nav shell" aria-label="Mobile navigation" initial={reduced ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .28, ease: [.32, .72, 0, 1] }}>
                {links.map((link, i) => <motion.a key={link.id} href={`#${link.id}`} onClick={closeMenu} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : i * .04, duration: .35, ease: [.32, .72, 0, 1] }}>{link.label}<span aria-hidden="true">↗</span></motion.a>)}
            </motion.nav>}
        </AnimatePresence>
    </header>;
}

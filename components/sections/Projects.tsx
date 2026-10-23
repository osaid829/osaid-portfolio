import { ProjectAccordion } from '@/components/motion/ProjectAccordion';
import { fallbackProjects } from '@/data/fallback-projects';

export function Projects() {
    return <section id="projects" className="section shell projects-section" aria-labelledby="projects-title" data-source="curated">
        <div className="chapter-heading chapter-heading-wide">
            <p className="section-intro-line">A few things I have made</p>
            <h2 id="projects-title">The work is still<br /><em>moving.</em></h2>
            <p>Open a project, stay with it for a minute, and look for the decisions behind the surface.</p>
        </div>
        <ProjectAccordion projects={fallbackProjects} />
    </section>;
}

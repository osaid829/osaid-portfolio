'use client';

import { useState } from 'react';
import type { Project } from '@/data/fallback-projects';
import { Icon } from '@/components/ui/Icon';

const visuals = [
    'https://picsum.photos/seed/spatial-interface/1400/1100',
    'https://picsum.photos/seed/quiet-hospitality/1400/1100',
    'https://picsum.photos/seed/creative-system/1400/1100',
];

export function ProjectAccordion({ projects }: { projects: Project[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return <div className="project-accordion" role="list">
        {projects.map((project, index) => {
            const active = activeIndex === index;
            const panelId = `project-panel-${project.id}`;
            return <article className={`project-accordion-item${active ? ' is-active' : ''}`} key={project.id} role="listitem" onMouseEnter={() => setActiveIndex(index)}>
                <div className="project-accordion-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(5, 6, 10, .16), rgba(5, 6, 10, .9)), url('${visuals[index % visuals.length]}')` }} aria-hidden="true" />
                <button className="project-accordion-trigger" type="button" aria-expanded={active} aria-controls={panelId} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)}>
                    <span>{project.year}</span>
                    <h3>{project.name}</h3>
                    <span className="project-accordion-open" aria-hidden="true">{active ? 'Close' : 'Open'} <Icon name="arrow" /></span>
                </button>
                <div className="project-accordion-details" id={panelId} hidden={!active}>
                    <p>{project.description}</p>
                    {project.role && <p className="project-accordion-role">{project.role}</p>}
                    {project.outcome && <p className="project-accordion-outcome">{project.outcome}</p>}
                    <div className="project-actions">
                        {project.homepage && <a className="text-link" href={project.homepage} target="_blank" rel="noopener noreferrer">Visit project <Icon name="arrow" /></a>}
                        {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <Icon name="arrow" /></a>}
                    </div>
                </div>
            </article>;
        })}
    </div>;
}

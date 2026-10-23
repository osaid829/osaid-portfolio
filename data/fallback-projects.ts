/** Owner-reported projects. These are not fetched repository records or client claims. */
export interface Project {
    id: string;
    name: string;
    description: string;
    language: string | null;
    stars: number | null;
    githubUrl: string | null;
    homepage: string | null;
    updatedAt: string | null;
    category: string;
    year?: string;
    role?: string;
    outcome?: string;
    tags?: string[];
    study?: 1 | 2 | 3;
}
export const fallbackProjects: Project[] = [
    {
        id: 'showcase',
        name: '3D Interactive Showcase',
        description: 'A self-initiated web experience exploring spatial interaction, motion, and a flexible visual identity for a fictional business.',
        language: 'TypeScript',
        stars: null,
        githubUrl: null,
        homepage: 'https://3d-interactive-website-ashen.vercel.app',
        updatedAt: null,
        category: 'SELF-INITIATED / INTERACTIVE WEB',
        year: '2026',
        role: 'Art direction · frontend · 3D',
        outcome: 'A working study in how motion can guide attention without getting in the way.',
        tags: ['Next.js', 'Three.js', 'Motion'],
        study: 1,
    },
    {
        id: 'hospitality',
        name: 'Hospitality Concept',
        description: 'A restaurant website sample using atmosphere, pacing, and focused calls to action to introduce a place.',
        language: null,
        stars: null,
        githubUrl: 'https://github.com/osaid829/sample-resturantsite-design',
        homepage: null,
        updatedAt: null,
        category: 'CONCEPT / WEB EXPERIENCE',
        year: '2025',
        role: 'Concept · interface · responsive build',
        outcome: 'A compact visual system that makes a small hospitality brand feel considered from the first scroll.',
        tags: ['React', 'Responsive UI', 'Visual design'],
        study: 2,
    },
    {
        id: 'portfolio',
        name: 'Osaid Portfolio',
        description: 'This portfolio: a responsive developer site with procedural artwork, a WebGL fallback, and an honest project index.',
        language: null,
        stars: null,
        githubUrl: 'https://github.com/osaid829/osaid-portfolio',
        homepage: null,
        updatedAt: null,
        category: 'PERSONAL / DEVELOPER PORTFOLIO',
        year: '2026',
        role: 'Product thinking · engineering · art direction',
        outcome: 'A living interface for showing both the surface and the system underneath it.',
        tags: ['Next.js', 'TypeScript', 'R3F'],
        study: 3,
    },
];

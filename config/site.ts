/** Replace placeholders here or supply the corresponding NEXT_PUBLIC_ variables. */
// Verified through the connected GitHub account on 20 September 2026.
export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'osaid829';
export const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '[INSTAGRAM_HANDLE]';
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || '[LINKEDIN_URL]';
export const ACCENT_COLOR = process.env.NEXT_PUBLIC_ACCENT_COLOR || '[ACCENT_COLOR]';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';
export const isConfigured = (value: string) => value.trim().length > 0 && !value.includes('[');
export const githubUsername = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(GITHUB_USERNAME) ? GITHUB_USERNAME : null;
export const instagramHandle = /^[a-z\d._]{1,30}$/i.test(INSTAGRAM_HANDLE.replace(/^@/, '')) ? INSTAGRAM_HANDLE.replace(/^@/, '') : null;
function linkedinProfile(value: string): string | null {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && ['linkedin.com', 'www.linkedin.com'].includes(url.hostname) && url.pathname.startsWith('/in/') && !url.username && !url.password ? url.href : null;
    }
    catch {
        return null;
    }
}
export const site = {
    name: 'Osaid',
    role: 'Full-Stack / Creative Developer',
    description: 'Full-stack and creative developer building clear web products, interactive systems, and the details between them.',
    // Explicit preview-only colour; ACCENT_COLOR remains unconfigured until supplied.
    accent: /^#[0-9a-f]{6}$/i.test(ACCENT_COLOR) ? ACCENT_COLOR : '#c3ed88',
    githubUrl: githubUsername ? `https://github.com/${githubUsername}` : null,
    email: CONTACT_EMAIL.trim(),
    url: SITE_URL.trim(),
    socials: [
        { name: 'GitHub', href: githubUsername ? `https://github.com/${githubUsername}` : null, placeholder: '[GITHUB_USERNAME]', icon: 'github' },
        { name: 'Instagram', href: instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : null, placeholder: '[INSTAGRAM_HANDLE]', icon: 'instagram' },
        { name: 'LinkedIn', href: linkedinProfile(LINKEDIN_URL), placeholder: '[LINKEDIN_URL]', icon: 'linkedin' },
    ],
} as const;

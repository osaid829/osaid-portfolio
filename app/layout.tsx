import type { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';
import { site } from '@/config/site';
import './globals.css';
export const metadata: Metadata = {
    metadataBase: new URL(site.url || 'http://localhost:3000'),
    title: { default: 'Osaid — Full-Stack / Creative Developer', template: '%s — Osaid' },
    description: site.description,
    authors: [{ name: site.name }],
    creator: site.name,
    icons: { icon: '/icon.svg' },
    openGraph: { title: 'Osaid — Full-Stack / Creative Developer', description: site.description, type: 'website', images: ['/preview.jpg'] },
    twitter: { card: 'summary_large_image', title: 'Osaid — Full-Stack / Creative Developer', description: site.description, images: ['/preview.jpg'] },
};
export const viewport: Viewport = { themeColor: '#0b0f0e' };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" style={{ '--accent': site.accent } as CSSProperties}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }

import type { SVGProps } from 'react';
export type IconName = 'arrow' | 'down' | 'github' | 'instagram' | 'linkedin' | 'pause' | 'play';
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & {
    name: IconName;
}) {
    const paths: Record<IconName, React.ReactNode> = {
        arrow: <path d="M5 19 19 5M5 5h14v14"/>,
        down: <path d="M12 4v16m-6-6 6 6 6-6"/>,
        github: <><path d="M9 19c-4 1-4-2-5-2m10 5v-4c0-1 .3-2 1-2 4-.5 6-2 6-6 0-2-.7-3-2-4 .3-1 .3-2 0-3-2 0-3 1-4 2a13 13 0 0 0-6 0C8 4 7 3 5 3c-.3 1-.3 2 0 3-1.3 1-2 2-2 4 0 4 2 5.5 6 6 .7 0 1 1 1 2v4"/></>,
        instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
        linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4"/></>,
        pause: <><path d="M8 5v14M16 5v14"/></>,
        play: <path d="m8 5 11 7-11 7Z"/>,
    };
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

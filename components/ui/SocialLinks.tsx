import { site } from '@/config/site';
import { Icon } from './Icon';
export function SocialLinks({ compact = false }: {
    compact?: boolean;
}) {
    const connected = site.socials.filter(social => social.href);
    return <div className={compact ? 'social-links compact' : 'social-links'}>{connected.map(social =>
            <a key={social.name} href={social.href ?? undefined} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} profile (opens in a new tab)`}><Icon name={social.icon}/><span>{social.name}</span><Icon name="arrow" /></a>)}</div>;
}

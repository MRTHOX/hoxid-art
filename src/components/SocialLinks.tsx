import React from 'react';
import { typography } from '@/utils/typography';

const LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/hoxid_',
    label: 'IG',
    icon: (
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
        <rect x="3" y="3" width="10" height="10" rx="2" ry="2" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" fill="none" strokeWidth="1" />
        <circle cx="11.5" cy="4.5" r=".8" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'X',
    href: 'https://x.com/HOXID_',
    label: 'X',
    icon: (
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
        <path d="M3 3l10 10m0-10L3 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
];

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${typography.meta} ${className}`}>
      {LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-opacity duration-150"
          aria-label={link.name}
        >
          {link.icon}
          <span className="text-[0.65rem] tracking-[0.4em] uppercase">{link.label}</span>
        </a>
      ))}
    </div>
  );
}

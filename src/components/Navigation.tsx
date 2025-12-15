'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { typography } from '@/utils/typography';

export default function Navigation() {
  const [manualMenuOpen, setManualMenuOpen] = useState(false);
  const [hoverMenuOpen, setHoverMenuOpen] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);
  const pathname = usePathname();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works' },
    { name: 'Available', path: '/available' },
    { name: 'Exhibitions', path: '/exhibitions' },
    { name: 'Practice', path: '/practice' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    const handleChange = (event: MediaQueryListEvent) => setHoverCapable(event.matches);
    setHoverCapable(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (hoverCapable) {
      setManualMenuOpen(false);
    }
  }, [hoverCapable]);

  const isMenuVisible = hoverMenuOpen || manualMenuOpen;

  return (
    <header
      className="fixed top-6 left-6 z-50 flex flex-col text-white"
      onMouseEnter={() => hoverCapable && setHoverMenuOpen(true)}
      onMouseLeave={() => hoverCapable && setHoverMenuOpen(false)}
    >
      <div className="flex items-center gap-3">
        <Link href="/" aria-label="HOXID home">
          <Image
            src="/brand/hoxid-mark.png"
            alt="HOXID mark"
            width={28}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>
        <button
          type="button"
          aria-expanded={isMenuVisible}
          onClick={() => setManualMenuOpen((prev) => !prev)}
          onFocus={() => setManualMenuOpen(true)}
          className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        >
          MENU
        </button>
      </div>

      {isMenuVisible && (
        <nav className="mt-4 flex flex-col space-y-1 text-foreground" aria-label="Primary">
          {pages.map((page) => {
            const active = pathname === page.path;
            return (
              <Link
                key={page.path}
                href={page.path}
                className={`flex items-center gap-2 text-sm ${typography.nav} text-white/70 hover:text-white`}
                onClick={() => setManualMenuOpen(false)}
              >
                <span className="flex-1 tracking-tight">{page.name}</span>
                {active && <span className="text-red-600 text-xs leading-none">•</span>}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

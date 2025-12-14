'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works' },
    { name: 'Available', path: '/available' },
    { name: 'Exhibitions', path: '/exhibitions' },
    { name: 'Bio', path: '/bio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <Link href="/" className="fixed top-7 left-6 z-50">
        <Image
          src="/brand/hoxid-mark.png"
          alt="HOXID mark"
          width={28}
          height={28}
          priority
          className="h-7 w-auto"
        />
      </Link>

      <nav className="hidden md:flex fixed top-8 left-16 z-50 gap-6">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className={`text-sm tracking-wide transition-all duration-200 ${
              pathname === page.path
                ? 'text-black border-b border-red-600'
                : 'text-black hover:text-red-600'
            }`}
          >
            {page.name}
          </Link>
        ))}
      </nav>

      <button
        className="md:hidden fixed top-8 right-8 z-50 text-black"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xl ${pathname === page.path ? 'border-b border-red-600' : ''}`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
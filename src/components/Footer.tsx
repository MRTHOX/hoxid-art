import React from 'react';
import Image from 'next/image';
import { socialLinks } from '@/data/content';
import { typography } from '@/utils/typography';

export default function Footer() {
  return (
    <footer className="fixed bottom-8 left-8 right-8 z-40 flex items-end justify-between">
      <div className="flex items-center">
        <Image
          src="/brand/hoxid-type.png"
          alt="HOXID"
          width={88}
          height={18}
          className="h-4 w-auto"
        />
      </div>

      <div className={`space-x-4 ${typography.meta}`}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

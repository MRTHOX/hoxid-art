import React from 'react';
import Image from 'next/image';
import SocialLinks from '@/components/SocialLinks';

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
      <SocialLinks />
    </footer>
  );
}

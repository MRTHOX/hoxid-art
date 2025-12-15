import React from 'react';
import Footer from '@/components/Footer';
import { bioText } from '@/data/content';
import { typography } from '@/utils/typography';

export default function BioPage() {
  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className={`${typography.h1} mb-8`}>Bio</h1>
          <div className={`${typography.body} max-w-prose whitespace-pre-line`}>
            {bioText}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React from 'react';
import Footer from '@/components/Footer';
import { bioText } from '@/data/content';

export default function BioPage() {
  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Bio</h1>
          <div className="space-y-4 text-sm leading-relaxed whitespace-pre-line">
            {bioText}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
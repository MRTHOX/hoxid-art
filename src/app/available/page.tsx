import React from 'react';
import AvailableWorkCard from '@/components/AvailableWorkCard';
import Footer from '@/components/Footer';
import { availableWorks } from '@/data/content';

export default function AvailablePage() {
  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8">
        <h1 className="text-3xl font-medium mb-12">
          Available Works <span className="text-red-600">•</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {availableWorks.map((work) => (
            <AvailableWorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
'use client';

import React, { useState } from 'react';
import WorkCard from '@/components/WorkCard';
import Modal from '@/components/Modal';
import Footer from '@/components/Footer';
import { Work, works } from '@/data/content';

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const safeWorks = Array.isArray(works) ? works.filter((item) => item && item.id) : [];

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-16 px-4 md:px-8">
        <h1 className="text-3xl font-medium mb-12">Works</h1>
        {safeWorks.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeWorks.map((work) => (
              <WorkCard key={work.id} work={work} onClick={() => setSelectedWork(work)} />
            ))}
          </div>
        ) : (
          <p className="text-sm font-mono text-secondary">No works available.</p>
        )}
      </div>

      {selectedWork && <Modal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      <Footer />
    </>
  );
}

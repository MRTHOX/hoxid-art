'use client';

import React, { useState } from 'react';
import WorkCard from '@/components/WorkCard';
import WorkGrid from '@/components/WorkGrid';
import Modal from '@/components/Modal';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import { Work, works } from '@/data/content';
import { typography } from '@/utils/typography';

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const safeWorks = Array.isArray(works) ? works.filter((item) => item && item.id) : [];

  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-12`}>Selected Works</h1>
        {safeWorks.length ? (
          <WorkGrid>
            {safeWorks.map((work) => (
              <WorkCard key={work.id} work={work} onClick={() => setSelectedWork(work)} />
            ))}
          </WorkGrid>
        ) : (
          <p className={typography.meta}>No works available.</p>
        )}
      </PageShell>

      {selectedWork && <Modal work={selectedWork} onClose={() => setSelectedWork(null)} />}
      <Footer />
    </>
  );
}

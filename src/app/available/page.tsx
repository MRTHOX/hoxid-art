import React from 'react';
import WorkCard from '@/components/WorkCard';
import WorkGrid from '@/components/WorkGrid';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import { availableWorks } from '@/data/content';
import { typography } from '@/utils/typography';

export default function AvailablePage() {
  const safeWorks = Array.isArray(availableWorks)
    ? availableWorks.filter((work) => work && work.id)
    : [];

  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-12`}>
          Available Works <span className="text-red-600">•</span>
        </h1>
        {safeWorks.length ? (
          <WorkGrid>
            {safeWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                cta={
                  <a
                    href={work.viewCollectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/70 hover:text-white transition-colors duration-200"
                  >
                    VIEW / COLLECT →
                  </a>
                }
              />
            ))}
          </WorkGrid>
        ) : (
          <p className={typography.meta}>No available works right now.</p>
        )}
      </PageShell>
      <Footer />
    </>
  );
}

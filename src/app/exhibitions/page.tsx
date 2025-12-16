import React from 'react';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import { exhibitions } from '@/data/content';
import { typography } from '@/utils/typography';

export default function ExhibitionsPage() {
  const validExhibitions = Array.isArray(exhibitions)
    ? exhibitions.filter((exhibition) => exhibition && exhibition.id)
    : [];

  const exhibitionsByYear = validExhibitions.reduce((acc, ex) => {
    const year = ex.startDate?.substring(0, 4) ?? 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(ex);
    return acc;
  }, {} as Record<string, typeof validExhibitions>);

  const years = Object.keys(exhibitionsByYear).sort((a, b) => {
    const numA = Number(a);
    const numB = Number(b);
    if (Number.isNaN(numA) && Number.isNaN(numB)) return 0;
    if (Number.isNaN(numA)) return 1;
    if (Number.isNaN(numB)) return -1;
    return numB - numA;
  });

  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-12`}>Exhibitions</h1>
        <div className="space-y-7 group/exhibitions">
          {years.map((year) => (
            <section key={year} className="space-y-2.5">
              <h2 className="font-mono text-[0.7rem] tracking-[0.45em] text-white/45 uppercase transition-opacity duration-150 ease-out motion-reduce:transition-none group-hover/exhibitions:opacity-60">
                {year}
              </h2>
              <div className="space-y-1.5 group/list">
                {exhibitionsByYear[year].map((ex) => (
                  <div
                    key={ex.id}
                    className="text-white transition-opacity duration-150 ease-out motion-reduce:transition-none group-hover/exhibitions:opacity-60 hover:opacity-100"
                  >
                    <div className="hidden md:flex items-center justify-between gap-4">
                      <span className="font-sans text-base font-medium tracking-tight">{ex.name}</span>
                      <span className="font-mono text-xs text-white/60 tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
                        {ex.location}
                      </span>
                    </div>
                    <div className="md:hidden font-sans text-base font-medium tracking-tight text-white/90 leading-tight">
                      {ex.name}{' '}
                      <span className="font-mono text-xs tracking-[0.3em] text-white/60">— {ex.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

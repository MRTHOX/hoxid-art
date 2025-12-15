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

  const years = Object.keys(exhibitionsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-12`}>Exhibitions</h1>
        <div className="space-y-8">
          {years.map((year) => (
            <div key={year}>
              <h2 className={`${typography.h2} mb-4 border-b border-[var(--text-secondary)] pb-2`}>{year}</h2>
              {exhibitionsByYear[year].map((ex) => (
                <div key={ex.id} className="mb-6 pl-4">
                  <h3 className="font-sans text-xl font-medium tracking-tight">{ex.name}</h3>
                  <p className={`${typography.meta} text-secondary mt-2`}>
                    {ex.location} • {ex.startDate}
                    {ex.endDate && ` - ${ex.endDate}`}
                    {ex.role && ` • ${ex.role}`}
                  </p>
                  {ex.link && (
                    <a
                      href={ex.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${typography.meta} mt-2 inline-block hover:text-red-600 transition-colors duration-200`}
                    >
                      → View Exhibition
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

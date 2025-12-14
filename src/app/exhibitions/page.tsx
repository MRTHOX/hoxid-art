import React from 'react';
import Footer from '@/components/Footer';
import { exhibitions } from '@/data/content';

export default function ExhibitionsPage() {
  const exhibitionsByYear = exhibitions.reduce((acc, ex) => {
    const year = ex.startDate.substring(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(ex);
    return acc;
  }, {} as Record<string, typeof exhibitions>);

  const years = Object.keys(exhibitionsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-16 px-4 md:px-8 max-w-4xl">
        <h1 className="text-3xl font-medium mb-12">Exhibitions</h1>
        <div className="space-y-8">
          {years.map((year) => (
            <div key={year}>
              <h2 className="text-xl font-mono mb-4 border-b border-black pb-2">{year}</h2>
              {exhibitionsByYear[year].map((ex) => (
                <div key={ex.id} className="mb-6 pl-4">
                  <h3 className="text-lg font-medium">{ex.name}</h3>
                  <p className="text-sm font-mono text-gray-600 mt-1">
                    {ex.location} • {ex.startDate}
                    {ex.endDate && ` – ${ex.endDate}`}
                    {ex.role && ` • ${ex.role}`}
                  </p>
                  {ex.link && (
                    
                      href={ex.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-2 inline-block hover:text-red-600 transition-colors duration-200"
                    >
                      → View Exhibition
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
import React from 'react';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import { typography } from '@/utils/typography';

export default function PracticePage() {
  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-12 tracking-tight text-white/90`}>Practice</h1>
        <div className="space-y-6">
          <p className="font-sans text-lg md:text-xl font-medium leading-snug max-w-xl text-foreground">
            HOXID is an artist working between visual systems and sound structures.
          </p>
          <p className="mt-6 font-sans text-base leading-relaxed max-w-prose text-white/85">
            His practice focuses on the tension between human perception and machine logic, producing audiovisual works that exist as environments rather than compositions. Working primarily in monochrome, HOXID develops pieces where sound and image are treated as a single system — synchronized, fractured, and deliberately restrained. His work explores control, signal, and interruption within digital space.
          </p>
          <p className="mt-6 font-mono text-[0.7rem] tracking-[0.35em] max-w-md text-white/60">
            His works have been released on multiple blockchains and presented internationally across Europe, Japan, Australia, and the United States.
          </p>
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

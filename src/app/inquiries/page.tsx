import React from 'react';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import SocialLinks from '@/components/SocialLinks';
import { contactEmail } from '@/data/content';
import { typography } from '@/utils/typography';

export default function InquiriesPage() {
  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-8 tracking-tight text-white/90`}>Inquiries</h1>
        <div className="measure space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/60">
            Inquiries and collaborations
          </p>
          <p className="font-sans text-lg font-medium text-white">{contactEmail}</p>
          <SocialLinks />
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

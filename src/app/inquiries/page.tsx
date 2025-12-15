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
        <h1 className={`${typography.h1} mb-8`}>Inquiries</h1>
        <div className="space-y-4 max-w-xl">
          <p className="font-sans text-sm uppercase tracking-[0.35em] text-white/60">
            Inquiries and collaborations:
          </p>
          <p className="font-mono text-base text-white/80">{contactEmail}</p>
          <SocialLinks />
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

import React from 'react';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import { typography } from '@/utils/typography';

export default function PracticePage() {
  return (
    <>
      <PageShell>
        <h1 className={`${typography.h1} mb-10 tracking-tight text-white/90`}>Practice</h1>
        <div className="measure space-y-5">
          <p className="font-sans text-lg md:text-xl font-medium leading-snug text-white">
            HOXID is a visual artist and musician of Turkish origin, based in Germany. His practice operates at the
            intersection of visual systems and sound structures, focusing on the relationships between human beings,
            society, technology, and machines. Working primarily with 3D audiovisual forms and motion-based loops, he
            constructs works as environments rather than linear compositions.
          </p>
          <p className="font-sans text-base leading-relaxed text-white/90">
            Central to this practice is the treatment of sound and image as parallel systems. These elements do not
            function to tell a story or deliver a direct message; instead, they coexist as synchronized, fractured, and
            deliberately restrained structures. The works unfold through repetition, continuity, and atmosphere, inviting
            the viewer into a sustained perceptual space rather than a beginning–end narrative.
          </p>
          <p className="font-sans text-base leading-relaxed text-white/90">
            Working within a strictly monochrome, black-and-white visual language, the practice examines how digital
            systems operate, repeat, and interrupt themselves. It foregrounds systemic behavior, rhythm, and structural
            tension within digital environments, privileging process and organization over representation.
          </p>
          <p className="font-sans text-base leading-relaxed text-white/75">
            HOXID’s work has been presented internationally at institutions including Valencia’s City of Arts and Sciences,
            Museum Angewandte Kunst Frankfurt, and the British Art Fair at Saatchi Gallery, as well as galleries and
            festivals worldwide.
          </p>
        </div>
      </PageShell>
      <Footer />
    </>
  );
}

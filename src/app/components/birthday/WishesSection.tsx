import React from 'react';
import { Eyebrow, Heading, Ornament, Reveal, Section } from './primitives';

const WISHES = [
  'Yuzingdan gullardek nafis tabassuming hech qachon arimasin.',
  'Yuragingdagi eng ezgu va shirin orzularing hammasi ushalsin.',
  'Sog‘liging mustahkam, qalbing hamisha bahor kabi sokin va obod bo‘lsin.',
  'Men yoningda bo‘lmasam ham, sevgim doim seni o‘rab tursin.',
  'Ushbu yil sening eng porloq, eng baxtli va eng unutilmas yiling bo‘lsin, mening Sevgilim.',
];

export const WishesSection: React.FC = () => (
  <Section image="/rasmlar/6.jpg" label="Tilaklarim" className="gap-5">
    <Reveal className="flex flex-col items-center gap-3">
      <Eyebrow>
        <span className="text-gold-light">V</span>
        <span aria-hidden className="mx-2 text-gold/50">—</span>
        Tilaklarim
      </Eyebrow>
      <Heading>Bugun faqat sen uchun, farishtam</Heading>
    </Reveal>

    <Reveal delay={0.1} className="flex w-full justify-center">
      <Ornament />
    </Reveal>

    <ol className="w-full max-w-[360px] text-left">
      {WISHES.map((wish, i) => (
        <li key={wish}>
          <Reveal delay={0.2 + i * 0.1} className="flex gap-4 border-b border-gold/15 py-3.5 last:border-b-0">
            <span className="w-6 shrink-0 pt-0.5 font-display text-[17px] leading-none text-gold italic">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-display text-[clamp(16px,4.3vw,18px)] leading-[1.45] text-cream/85">{wish}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  </Section>
);

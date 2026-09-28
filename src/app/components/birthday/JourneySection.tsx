import React, { useRef, useState } from 'react';
import { Eyebrow, Heading, Reveal, Section } from './primitives';

interface Milestone {
  title: string;
  description: string;
  image: string;
}

const MILESTONES: Milestone[] = [
  {
    title: 'Ilk ko‘rishish',
    description: 'Ikki daryo uchrashgan kun. Yo‘llarimiz bir-biriga bog‘lanib, yangi bir dunyo yaratilgan lahza.',
    image: '/rasmlar/9.jpg',
  },
  {
    title: 'Tun bo‘yi dildan suhbat',
    description: 'So‘zlaringdan sarmast bo‘lib, tongning qanday o‘tganini ham, yulduzlar qachon so‘nganini ham sezmay qoldik.',
    image: '/rasmlar/10.jpg',
  },
  {
    title: 'Muhabbatim izhori',
    description: 'Qalbim uzoq vaqt sir tutgan shirin so‘zlar nihoyat baralla yangradi. Yuragim portlashga tayyor edi.',
    image: '/rasmlar/11.jpg',
  },
  {
    title: 'Masofalar ham qo‘rqadi bizdan',
    description: 'O‘rtamizdagi yillar va chaqirimlar sevgimiz olovini yanada kuchaytirdi. Uzoqlik bizni ayira olmaydi.',
    image: '/rasmlar/12.jpg',
  },
  {
    title: 'Bugungi baxtimiz',
    description: 'Yana bir yoshga ulg‘aygan go‘zalim. Har kunimiz avvalgisidan ham shirinroq sevgiga to‘lib bormoqda.',
    image: '/rasmlar/13.jpg',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

const Arrow: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const JourneySection: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const center = strip.scrollLeft + strip.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (distance < best) {
        best = distance;
        closest = i;
      }
    });
    setActive(closest);
  };

  const goTo = (index: number) => {
    const strip = stripRef.current;
    const card = cardRefs.current[index];
    if (!strip || !card) return;
    strip.scrollTo({ left: card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
  };

  return (
    <Section image="/rasmlar/5.jpg" label="Bizning yo‘limiz" className="gap-6 !px-0">
      <Reveal className="flex flex-col items-center gap-3 px-7">
        <Eyebrow>
          <span className="text-gold-light">IV</span>
          <span aria-hidden className="mx-2 text-gold/50">—</span>
          Bizning yo‘limiz
        </Eyebrow>
        <Heading>Qadam-baqadam sening tomon</Heading>
      </Reveal>

      <Reveal delay={0.15} className="w-full">
        <div
          ref={stripRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain"
          role="region"
          aria-roledescription="karusel"
          aria-label="Bizning yo‘limiz xotiralari"
        >
          <div aria-hidden className="w-[14%] shrink-0" />
          {MILESTONES.map((m, i) => (
            <article
              key={m.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-label={`${i + 1} / ${MILESTONES.length}: ${m.title}`}
              className={`w-[72%] shrink-0 snap-center text-left transition-opacity duration-500 ${
                active === i ? 'opacity-100' : 'opacity-45'
              }`}
            >
              <div className="overflow-hidden rounded-[3px] border border-gold/30 p-1.5">
                <img
                  src={m.image}
                  alt={m.title}
                  loading="lazy"
                  decoding="async"
                  className="h-[clamp(170px,32dvh,320px)] w-full rounded-[2px] object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-[22px] leading-none text-gold italic">{pad(i + 1)}</span>
                <h3 className="font-display text-[21px] leading-tight font-medium text-cream">{m.title}</h3>
              </div>
              <p className="mt-2 font-sans text-[13px] leading-[1.65] text-cream/65">{m.description}</p>
            </article>
          ))}
          <div aria-hidden className="w-[14%] shrink-0" />
        </div>
      </Reveal>

      <Reveal delay={0.3} className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label="Oldingi xotira"
          className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition hover:border-gold/70 disabled:opacity-25"
        >
          <Arrow direction="left" />
        </button>

        <div className="flex items-center gap-2" aria-hidden>
          {MILESTONES.map((m, i) => (
            <span
              key={m.title}
              className={`h-px transition-all duration-500 ${active === i ? 'w-6 bg-gold' : 'w-3 bg-gold/30'}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(Math.min(MILESTONES.length - 1, active + 1))}
          disabled={active === MILESTONES.length - 1}
          aria-label="Keyingi xotira"
          className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition hover:border-gold/70 disabled:opacity-25"
        >
          <Arrow direction="right" />
        </button>
      </Reveal>
    </Section>
  );
};

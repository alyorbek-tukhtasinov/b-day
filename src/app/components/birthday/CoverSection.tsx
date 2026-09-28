import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE, Eyebrow, FramedPhoto, Ornament, Reveal, Section, Signature, scrollToSection } from './primitives';

const COVER_IMG = '/rasmlar/1.jpg';

// Deterministic "random" so particles don't jump between renders.
const DUST = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 97.13 + n * 13.7) + 1) / 2);
  return {
    left: r(1) * 100,
    top: 20 + r(2) * 75,
    size: 1.5 + r(3) * 2.5,
    duration: 9 + r(4) * 8,
    delay: r(5) * 6,
  };
});

const GoldDust: React.FC = () => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      {DUST.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-light shadow-[0_0_8px_2px_rgba(234,215,174,0.45)]"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -120], opacity: [0, 0.9, 0] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export const CoverSection: React.FC = () => (
  <Section
    image={COVER_IMG}
    label="Muqova"
    className="gap-4 pb-16"
    overlay={
      <>
        <GoldDust />
        <motion.button
          type="button"
          onClick={() => scrollToSection(1)}
          className="absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/70 transition-colors hover:text-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: EASE }}
          aria-label="Keyingi sahifaga o‘tish"
        >
          <span className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase">Pastga suring</span>
          <span className="relative block h-8 w-px overflow-hidden bg-gold/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-gold"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.button>
      </>
    }
  >
    <Reveal className="flex items-center gap-3">
      <span aria-hidden className="h-px w-8 bg-gold/50" />
      <Eyebrow>29 · Fevral</Eyebrow>
      <span aria-hidden className="h-px w-8 bg-gold/50" />
    </Reveal>

    <Reveal delay={0.1} className="relative">
      <FramedPhoto
        src={COVER_IMG}
        alt="Sevgiling va Sevgilimning birgalikdagi surati"
        shape="arch"
        eager
        className="h-[clamp(190px,34dvh,360px)] aspect-[2/3]"
      />
    </Reveal>

    <Reveal delay={0.25} className="flex flex-col items-center gap-2">
      <h1 className="font-display text-[clamp(54px,16vw,76px)] leading-none font-light text-cream italic [text-shadow:0_4px_30px_rgba(10,4,6,0.9)]">
        Sevgilim
      </h1>
      <Eyebrow className="text-gold-light/90">18 bahorni qarshi olgan farishtam</Eyebrow>
    </Reveal>

    <Reveal delay={0.4} className="flex w-full flex-col items-center gap-4">
      <Ornament />
      <p className="max-w-[320px] font-display text-[clamp(17px,4.6vw,20px)] leading-[1.55] text-cream/85 italic">
        Dunyoga kelgan kuning muborak bo‘lsin, ko‘zimning nuri, qalbimning quyoshi.
      </p>
    </Reveal>

    <Reveal delay={0.55}>
      <Signature>Har soniya seni o‘ylaguvchi Sevgilingdan</Signature>
    </Reveal>
  </Section>
);

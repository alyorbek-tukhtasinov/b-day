import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { EASE, Eyebrow, Heading, Ornament, Reveal, Section, Signature, scrollToSection } from './primitives';

// --- iPhone jamg'armasi sozlamalari ---
// TODO(Sevgiling): pul qo'shganingizda shu ikkita qiymatni yangilab turing.
const GOAL_USD = 500;
const CONTRIBUTED_UZS = 500_000;
// Taxminiy kurs (~12 000 so'm/$) — vaqti-vaqti bilan yangilang.
const USD_TO_UZS_RATE = 12000;

const contributedUSD = CONTRIBUTED_UZS / USD_TO_UZS_RATE;
const progressPercent = Math.min(100, Math.round((contributedUSD / GOAL_USD) * 1000) / 10);

const formatUZS = (n: number) => new Intl.NumberFormat('uz-UZ').format(n).replace(/,/g, ' ');

const Bow: React.FC = () => (
  <svg width="72" height="34" viewBox="0 0 72 34" fill="none" aria-hidden>
    <defs>
      <linearGradient id="bow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EAD7AE" />
        <stop offset="1" stopColor="#A9824A" />
      </linearGradient>
    </defs>
    <path d="M36 26C28 8 8 2 6 14c-1.6 9.6 16 13 30 12Z" fill="url(#bow)" />
    <path d="M36 26C44 8 64 2 66 14c1.6 9.6-16 13-30 12Z" fill="url(#bow)" />
    <path d="M36 26C31 16 18 11 15 16" stroke="#7E5E2E" strokeOpacity=".5" strokeWidth="1" />
    <path d="M36 26C41 16 54 11 57 16" stroke="#7E5E2E" strokeOpacity=".5" strokeWidth="1" />
    <rect x="31" y="20" width="10" height="12" rx="3" fill="#C9A96E" />
  </svg>
);

const GiftBox: React.FC<{ opening: boolean; onOpen: () => void; onOpened: () => void }> = ({
  opening,
  onOpen,
  onOpened,
}) => (
  <motion.button
    type="button"
    onClick={onOpen}
    disabled={opening}
    aria-label="Sovg‘a qutisini ochish"
    whileHover={opening ? undefined : { y: -4 }}
    whileTap={opening ? undefined : { scale: 0.97 }}
    className="group relative h-44 w-48 [perspective:800px]"
  >
    {/* soft floor shadow */}
    <span aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-black/60 blur-md" />

    {/* box body */}
    <span className="absolute inset-x-3 bottom-0 h-28 overflow-hidden rounded-b-md bg-gradient-to-b from-[#f3e7d2] to-[#d9c5a2] shadow-[inset_0_-12px_24px_rgba(120,90,50,0.25)]">
      <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-b from-gold-light to-gold-deep" />
    </span>

    {/* lid */}
    <motion.span
      className="absolute inset-x-0 top-8 block h-10 origin-bottom-left"
      animate={opening ? { y: -70, x: 30, rotate: 24, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => opening && onOpened()}
    >
      <span className="absolute inset-0 rounded-md bg-gradient-to-b from-[#f8eedd] to-[#e2cfad] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)]">
        <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-b from-gold-light to-gold" />
      </span>
      <span className="absolute -top-7 left-1/2 -translate-x-1/2">
        <Bow />
      </span>
    </motion.span>
  </motion.button>
);

const FundCard: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="w-full max-w-[330px] rounded-lg border border-gold/25 bg-ink-soft/70 p-6 text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-md"
    >
      <Eyebrow className="text-[10px]">iPhone jamg‘armasi</Eyebrow>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-[44px] leading-none font-light text-cream lining-nums">${contributedUSD.toFixed(1)}</span>
        <span className="font-sans text-sm text-cream/45">/ ${GOAL_USD}</span>
      </div>
      <p className="mt-1 font-sans text-xs text-cream/45">{formatUZS(CONTRIBUTED_UZS)} so‘m yig‘ildi</p>

      <div
        className="mt-5 h-1 w-full overflow-hidden rounded-full bg-cream/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label="Jamg‘arma holati"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(progressPercent, 2)}%` }}
          transition={{ duration: reduceMotion ? 0 : 1.4, delay: 0.5, ease: EASE }}
        />
      </div>
      <div className="mt-2 flex justify-between font-sans text-[11px] text-cream/50">
        <span>{progressPercent}%</span>
        <span>Maqsad: ${GOAL_USD}</span>
      </div>

      <p className="mt-5 border-t border-gold/15 pt-5 font-display text-[17px] leading-[1.55] text-cream/80 italic">
        Bu — men boshlagan jamg‘arma. Sen hech narsa qilishing shart emas, qolganini o‘zim yig‘aman.
      </p>
    </motion.div>
  );
};

export const GiftSection: React.FC = () => {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const openGift = () => {
    if (opening) return;
    setOpening(true);
    const colors = ['#C9A96E', '#EAD7AE', '#F5ECDD', '#E0ADB2'];
    const shared = { particleCount: 70, spread: 60, startVelocity: 45, colors, disableForReducedMotion: true };
    setTimeout(() => {
      confetti({ ...shared, angle: 60, origin: { x: 0, y: 0.7 } });
      confetti({ ...shared, angle: 120, origin: { x: 1, y: 0.7 } });
    }, 350);
  };

  return (
    <Section image="/rasmlar/7.jpg" label="Sovg‘a" className="gap-6">
      <Reveal className="flex flex-col items-center gap-3">
        <Eyebrow>
          <span className="text-gold-light">VI</span>
          <span aria-hidden className="mx-2 text-gold/50">—</span>
          Sovg‘a
        </Eyebrow>
        <Heading>{opened ? 'Tug‘ilgan kuning muborak' : 'Sovg‘ang tayyor'}</Heading>
      </Reveal>

      <div className="flex min-h-[300px] w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="box"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center gap-8"
            >
              <Reveal delay={0.15}>
                <GiftBox opening={opening} onOpen={openGift} onOpened={() => setOpened(true)} />
              </Reveal>
              <Reveal delay={0.3}>
                <p className="font-sans text-[11px] font-medium tracking-[0.3em] text-cream/55 uppercase">
                  Ochish uchun bosing
                </p>
              </Reveal>
            </motion.div>
          ) : (
            <FundCard key="card" />
          )}
        </AnimatePresence>
      </div>

      <Reveal delay={0.2} className="flex flex-col items-center gap-4">
        <Ornament />
        <Signature>Seni sevaman — Sevgiling</Signature>
      </Reveal>

      {opened && (
        <motion.button
          type="button"
          onClick={() => scrollToSection(0)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="font-sans text-[10px] font-medium tracking-[0.3em] text-gold/60 uppercase transition-colors hover:text-gold"
        >
          ↑ Boshiga qaytish
        </motion.button>
      )}
    </Section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { EASE, Eyebrow, Ornament } from './primitives';

/**
 * Opening "envelope" screen. The tap it asks for is also the user gesture
 * browsers require before audio may play.
 */
export const IntroGate: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <motion.div
    className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ink px-8 text-center"
    exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
    transition={{ duration: 1, ease: EASE }}
  >
    <img
      src="/rasmlar/1.jpg"
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-3xl saturate-75"
    />
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,4,6,0.35)_0%,rgba(10,4,6,0.95)_75%)]" />

    <motion.div
      className="relative flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
    >
      <div aria-hidden className="grid size-16 place-items-center rounded-full border border-gold/40">
        <span className="font-script text-[34px] leading-none text-gold-light">S</span>
      </div>

      <Eyebrow>Sevgi kundaligi</Eyebrow>

      <h1 className="font-display text-[clamp(38px,11vw,52px)] leading-[1.05] font-light text-cream italic">
        Faqat sen uchun
      </h1>

      <Ornament />

      <p className="max-w-[280px] font-display text-[17px] leading-relaxed text-cream/70 italic">
        Ovozni yoqib, bu sahifalarni shoshmasdan varaqla.
      </p>

      <button
        type="button"
        onClick={onOpen}
        autoFocus
        className="mt-4 rounded-full border border-gold/50 bg-gold/10 px-9 py-3.5 font-sans text-[11px] font-semibold tracking-[0.3em] text-gold-light uppercase shadow-[0_0_40px_-10px_rgba(201,169,110,0.6)] transition hover:border-gold hover:bg-gold/20 active:scale-[0.98]"
      >
        Kundalikni ochish
      </button>
    </motion.div>
  </motion.div>
);

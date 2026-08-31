import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FUNNY_MEMORY_IMG = '/rasmlar/3.jpg';

const PulsingHeart: React.FC = () => (
  <motion.span
    animate={{ scale: [1, 1.3, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ display: 'inline-block', color: '#E8B4B8', fontSize: '16px' }}
  >
    ♡
  </motion.span>
);

export const FunnyMemorySection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      ref={ref}
      style={{
        height: '100dvh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={FUNNY_MEMORY_IMG}
        alt="Sevgiling va Sevgilimning kulgili xotirasi"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'saturate(0.6) brightness(0.3)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,1,3,0.5) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 32px', gap: '18px', maxWidth: '400px' }}>
        <motion.span {...fadeUp(0)} style={{ fontSize: '22px' }}>✨</motion.span>

        <motion.h2 {...fadeUp(0.15)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(28px,8vw,38px)',
          fontWeight: 400, fontStyle: 'italic',
          color: '#F8F0E3', margin: 0, lineHeight: 1.2,
          textShadow: '0 0 40px rgba(201,169,110,0.2)',
        }}>
          Baxtdan sarmast lahzarimiz
        </motion.h2>

        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
          <span style={{ color: 'rgba(201,169,110,0.6)', fontSize: '12px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
        </motion.div>

        <motion.p {...fadeUp(0.45)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(16px,4.5vw,19px)',
          fontStyle: 'italic',
          color: 'rgba(245,240,227,0.85)',
          margin: 0, lineHeight: 1.75,
        }}>
          {`Kulganingda burningni o‘sha birgina jiyirilishi... men uchun dunyodagi eng go‘zal manzara. Atrofdagilarning ajablangan nigohlariga qaramay, baxtdan beg‘ubor kulgan o‘sha onimiz abadiyatga muhrlangan.`}
        </motion.p>

        <motion.div {...fadeUp(0.6)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
          <span style={{ color: 'rgba(201,169,110,0.6)', fontSize: '12px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
        </motion.div>

        <motion.p {...fadeUp(0.75)} style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '20px',
          color: '#C9A96E',
          margin: 0,
          textShadow: '0 0 16px rgba(201,169,110,0.3)',
        }}>
          Sen bilan har lahza — bayram
        </motion.p>

        <motion.div {...fadeUp(0.9)} style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
          <PulsingHeart />
          <PulsingHeart />
          <PulsingHeart />
        </motion.div>
      </div>
    </section>
  );
};

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const WISHES_IMG = '/rasmlar/6.jpg';

const WISHES = [
  'Yuzingdan gullardek nafis tabassuming hech qachon arimasin',
  'Yuragingdagi eng ezgu va shirin orzularing hammasi ushalsin',
  "Sog‘liging mustahkam, qalbing hamisha bahor kabi sokin va obod bo‘lsin",
  "Men yoningda bo'lmasam ham, sevgim doim seni o'rab tursin",
  'Ushbu yil sening eng porloq, eng baxtli va eng unutilmas yiling bo‘lsin, mening Sevgilim',
];

const PulsingHeart: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.span
    animate={{ scale: [1, 1.35, 1] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{ display: 'inline-block', color: '#E8B4B8', fontSize: '15px', marginRight: '10px', flexShrink: 0 }}
  >
    ♡
  </motion.span>
);

export const WishesSection: React.FC = () => {
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
        src={WISHES_IMG}
        alt="Sevgiling va Sevgilimning baxtli surati"
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

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '380px', padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <motion.h2 {...fadeUp(0)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(26px,7.5vw,36px)',
          fontWeight: 400, fontStyle: 'italic',
          color: '#F8F0E3', margin: 0, lineHeight: 1.2,
          textAlign: 'center',
          textShadow: '0 0 40px rgba(201,169,110,0.2)',
        }}>
          Bugun faqat sen uchun, farishtam...
        </motion.h2>

        <motion.div {...fadeUp(0.15)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '260px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
          <span style={{ color: 'rgba(201,169,110,0.6)', fontSize: '12px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {WISHES.map((wish, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.3 + i * 0.15)}
              style={{ display: 'flex', alignItems: 'flex-start' }}
            >
              <PulsingHeart delay={i * 0.25} />
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(15px,4.2vw,17px)',
                fontStyle: 'italic',
                color: 'rgba(245,240,227,0.88)',
                margin: 0, lineHeight: 1.55,
              }}>
                {wish}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

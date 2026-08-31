import React, { useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';

const COVER_IMG = '/rasmlar/1.jpg';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
}

const PETAL_COLORS = [
  'rgba(220,160,170,0.7)',
  'rgba(232,180,184,0.6)',
  'rgba(201,169,110,0.5)',
  'rgba(245,210,215,0.6)',
  'rgba(255,200,210,0.5)',
];

export const CoverSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 6,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    })), []);

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
      {/* Background photo */}
      <img
        src={COVER_IMG}
        alt="Sevgiling va Sevgilimning birgalikdagi surati"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'saturate(0.75) brightness(0.55)',
        }}
      />
      {/* Standard overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,1,3,0.5) 100%)',
      }} />

      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(30px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '5%',
        width: '160px', height: '160px',
        background: 'radial-gradient(circle, rgba(220,160,170,0.1) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(25px)',
      }} />

      {/* Falling petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size * 1.4,
            borderRadius: '50% 0 50% 0',
            background: p.color,
            zIndex: 3,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [p.rotation, p.rotation + 360],
            x: [0, Math.sin(p.id) * 40],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 28px', paddingTop: '140px', gap: '14px' }}>
        <motion.p {...fadeUp(0)} style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', fontWeight: 300,
          color: '#C9A96E', letterSpacing: '0.25em',
          textTransform: 'uppercase', margin: 0,
        }}>
          ♡ 29 FEVRAL ♡
        </motion.p>

        <motion.h1 {...fadeUp(0.15)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(52px,16vw,72px)',
          fontWeight: 300, fontStyle: 'italic',
          color: '#F8F0E3', margin: 0, lineHeight: 1.1,
          textShadow: '0 0 60px rgba(201,169,110,0.3), 0 0 120px rgba(201,169,110,0.15)',
        }}>
          Sevgilim
        </motion.h1>

        <motion.div {...fadeUp(0.3)} style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '6px 18px', borderRadius: '999px',
          border: '1px solid rgba(201,169,110,0.4)',
          background: 'rgba(201,169,110,0.1)',
          boxShadow: '0 0 20px rgba(201,169,110,0.15)',
        }}>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#C9A96E',
          }}>18 BAHORNI QARSHI OLGAN FARISHTAM</span>
        </motion.div>

        {/* Divider */}
        <motion.div {...fadeUp(0.45)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '260px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.6))' }} />
          <span style={{ color: '#C9A96E', fontSize: '14px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.6))' }} />
        </motion.div>

        <motion.p {...fadeUp(0.6)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(16px,5vw,20px)',
          fontStyle: 'italic',
          color: 'rgba(245,240,227,0.85)',
          margin: 0, lineHeight: 1.6, maxWidth: '320px',
        }}>
          {`Dunyoga kelgan kuning muborak bo‘lsin, ko‘zimning nuri, qalbimning quyoshi.`}
        </motion.p>

        <motion.p {...fadeUp(0.75)} style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '22px',
          color: '#C9A96E',
          margin: '8px 0 0',
          textShadow: '0 0 20px rgba(201,169,110,0.4)',
        }}>
          Har bir soniya seni o‘ylaguvchi — Sevgilingdan
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: 'absolute', bottom: '32px', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(201,169,110,0.6)', textTransform: 'uppercase' }}>Pastga suring</span>
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
          <path d="M1 1L7 7L13 1" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
};

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const FUNNY_MEMORY_IMG = '/rasmlar/3.jpg';
const INK = '#3A2418'; // warm ink brown — used wherever text sits on the cream polaroid paper

const GIGGLE_EMOJIS = ['😂', '🤣', '😆', '😂', '🤭', '😹'];

export const FunnyMemorySection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [burstId, setBurstId] = useState(0);
  const [bursting, setBursting] = useState(false);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const triggerGiggle = () => {
    setBurstId((n) => n + 1);
    setBursting(true);
    setTimeout(() => setBursting(false), 1200);
  };

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
      {/* Blurred, dim backdrop — sets a "tabletop" mood so the polaroid in front reads as the sharp, vivid memory */}
      <img
        src={FUNNY_MEMORY_IMG}
        alt="Alyorbek va Madinaxonning kulgili xotirasi"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'saturate(0.5) brightness(0.22) blur(6px)',
          transform: 'scale(1.1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,1,3,0.6) 0%, rgba(8,2,5,0.45) 35%, rgba(12,3,7,0.7) 70%, rgba(5,1,3,0.94) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 28px', gap: '14px', maxWidth: '400px' }}>

        <motion.p {...fadeUp(0)} style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', fontWeight: 300,
          color: '#C9A96E', letterSpacing: '0.18em',
          textTransform: 'uppercase', margin: 0,
        }}>
          ✨ Eng kulgili lahzamiz
        </motion.p>

        {/* Polaroid — tap it */}
        <motion.div
          {...fadeUp(0.15)}
          onClick={triggerGiggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerGiggle(); }}
          whileTap={{ scale: 0.96 }}
          animate={bursting ? { rotate: [-4, 3, -3, 2, -4] } : { rotate: -4 }}
          transition={bursting ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0.9, delay: 0.15 }}
          style={{
            position: 'relative',
            width: '230px',
            background: '#F8F0E3',
            borderRadius: '4px',
            padding: '12px 12px 40px',
            boxShadow: '0 22px 45px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* washi tape */}
          <div style={{
            position: 'absolute', top: '-10px', left: '50%',
            transform: 'translateX(-50%) rotate(-6deg)',
            width: '56px', height: '20px',
            background: 'rgba(232,180,184,0.55)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
          }} />

          <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '2px' }}>
            <img
              src={FUNNY_MEMORY_IMG}
              alt="Alyorbek va Madinaxonning kulgili xotirasi"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.05) contrast(1.05)' }}
            />
          </div>

          <p style={{
            fontFamily: 'Dancing Script, cursive',
            fontSize: '17px',
            color: INK,
            textAlign: 'center',
            margin: '10px 0 0',
            lineHeight: 1.3,
          }}>
            {`burningni jiyirib kulganing... 😂`}
          </p>

          {/* Giggle burst */}
          {bursting && (
            <div style={{ position: 'absolute', left: '50%', bottom: '46px', width: 0, height: 0, pointerEvents: 'none' }}>
              {GIGGLE_EMOJIS.map((e, i) => (
                <motion.span
                  key={`${burstId}-${i}`}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                  animate={{
                    opacity: 0,
                    x: (i - 2.5) * 22,
                    y: -90 - (i % 3) * 20,
                    scale: 1,
                    rotate: (i - 2.5) * 18,
                  }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                  style={{ position: 'absolute', fontSize: '18px' }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>

        <motion.p {...fadeUp(0.35)} style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', fontWeight: 300,
          color: 'rgba(245,240,227,0.45)', letterSpacing: '0.05em',
          margin: 0,
        }}>
          (bosib ko'r 😉)
        </motion.p>

        <motion.p {...fadeUp(0.5)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(14px,4vw,16px)',
          fontStyle: 'italic',
          color: 'rgba(245,240,227,0.8)',
          margin: '4px 0 0', lineHeight: 1.65,
        }}>
          {`Men buni ham juda yaxshi ko'raman. O'sha kuni ikkalamiz shunchalik kulganmizki, atrofdagilar bizga g'alati qarashgan — lekin bizga baribir edi.`}
        </motion.p>

        <motion.p {...fadeUp(0.65)} style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '20px',
          color: '#C9A96E',
          margin: '6px 0 0',
          textShadow: '0 0 16px rgba(201,169,110,0.3)',
        }}>
          Sen bilan har lahza — bayram
        </motion.p>
      </div>
    </section>
  );
};

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const INK = '#3A2418';
const JOURNEY_IMG = '/rasmlar/5.jpg';

interface MilestoneStop {
  index: string;
  title: string;
  description: string;
  image: string; // individual photo path
  fallbackIcon: string; // shown only if image fails to load
  rotate: number; // static scatter tilt
}

const MILESTONES: MilestoneStop[] = [
  { index: '01', title: 'Ilk ko‘rishish', description: "Ikki daryo uchrashgan kun. Yo‘llarimiz bir-biriga bog‘lanib, yangi bir dunyo yaratilgan lahza", image: '/rasmlar/9.jpg', fallbackIcon: '📍', rotate: -5 },
  { index: '02', title: 'Tun bo‘yi dildan suhbat', description: "So‘zlaringdan sarmast bo‘lib, tongning qanday o‘tganini ham, yulduzlar qachon so‘nganini ham sezmay qoldik", image: '/rasmlar/10.jpg', fallbackIcon: '💬', rotate: 4 },
  { index: '03', title: 'Muhabbatim izhori', description: 'Qalbim uzoq vaqt sir tutgan shirin so‘zlar nihoyat baralla yangradi. Yuragim portlashga tayyor edi', image: '/rasmlar/11.jpg', fallbackIcon: '💛', rotate: -3 },
  { index: '04', title: 'Masofalar ham qo‘rqadi bizdan', description: "O‘rtamizdagi yillar va chaqirimlar sevgimiz olovini yanada kuchaytirdi. Uzoqlik bizni ayira olmaydi", image: '/rasmlar/12.jpg', fallbackIcon: '✈️', rotate: 5 },
  { index: '05', title: 'Bugungi baxtimiz', description: 'Yana bir yoshga ulg‘aygan go‘zalim. Har kunimiz avvalgisidan ham shirinroq sevgiga to‘lib bormoqda', image: '/rasmlar/13.jpg', fallbackIcon: '🎂', rotate: -4 },
];

export const JourneySection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const dropIn = (delay: number, rotate: number) => ({
    initial: { opacity: 0, y: -22, rotate: 0 },
    animate: isInView ? { opacity: 1, y: 0, rotate } : { opacity: 0, y: -22, rotate: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
      <style>{`
        #journey-strip::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Backdrop with background image and error handling */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${JOURNEY_IMG})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      
      {/* Overlay gradients for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,1,3,0.65) 0%, rgba(8,2,5,0.45) 35%, rgba(12,3,7,0.7) 70%, rgba(5,1,3,0.9) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 25%, #1a0e08 0%, #0a0403 55%, #050102 100%)',
        opacity: 0.65,
      }} />

      <div style={{ position: 'relative', zIndex: 5, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>

        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', padding: '0 24px' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px,8vw,38px)',
            fontWeight: 400, fontStyle: 'italic',
            color: '#F8F0E3', margin: '0 0 6px',
            textShadow: '0 0 40px rgba(201,169,110,0.2)',
          }}>
            {`Qadam-baqadam sening tomon...`}
          </h2>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px', fontWeight: 300,
            color: '#C9A96E', letterSpacing: '0.18em',
            textTransform: 'uppercase', margin: 0,
          }}>
            Har bir qadam — bitta xotira
          </p>
        </motion.div>

        {/* Horizontal garland — swipe through the milestones like photos strung on a line */}
        <div
          id="journey-strip"
          style={{
            width: '100%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            gap: '18px',
            width: 'max-content',
            padding: '18px 32px 8px',
          }}>
            {/* the wire the photos hang from */}
            <div style={{
              position: 'absolute', top: '18px', left: '32px', right: '32px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #C9A96E 6%, #C9A96E 94%, transparent)',
            }} />

            {MILESTONES.map((stop, i) => (
              <motion.div
                key={stop.index}
                {...dropIn(0.15 + i * 0.13, stop.rotate)}
                style={{
                  position: 'relative',
                  width: '138px',
                  flexShrink: 0,
                  scrollSnapAlign: 'center',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: '#C9A96E', boxShadow: '0 0 10px rgba(201,169,110,0.6)',
                  zIndex: 2,
                }} />

                <div style={{
                  background: '#F8F0E3',
                  borderRadius: '4px',
                  padding: '8px 8px 10px',
                  boxShadow: '0 14px 28px rgba(0,0,0,0.5)',
                }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundImage: `url(${stop.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'saturate(0.8) brightness(0.85)',
                    }}
                  />

                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, color: 'rgba(58,36,24,0.55)', letterSpacing: '0.1em', margin: '6px 0 1px' }}>
                    {stop.index}
                  </p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', fontWeight: 600, color: INK, margin: '0 0 2px', lineHeight: 1.2 }}>
                    {stop.title}
                  </p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 400, color: 'rgba(58,36,24,0.7)', margin: 0, lineHeight: 1.35 }}>
                    {stop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p {...fadeUp(0.9)} style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', fontWeight: 300,
          color: 'rgba(245,240,227,0.4)', letterSpacing: '0.15em',
          textTransform: 'uppercase', margin: 0,
        }}>
          Suring →
        </motion.p>
      </div>
    </section>
  );
};

import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';

const GIFT_IMG = '/rasmlar/7.jpg';
const INK = '#3A2418';
const GOLD = '#C9A96E';
const CREAM = '#F8F0E3';

// --- iPhone jamg'armasi sozlamalari ---
// TODO(Alyorbek): pul qo'shganingizda shu ikkita qiymatni yangilab turing.
const GOAL_USD = 500;
const CONTRIBUTED_UZS = 500_000;
// Taxminiy kurs (2026-yil iyul holatiga ko'ra ~12 000 so'm/$) — vaqti-vaqti bilan yangilang.
const USD_TO_UZS_RATE = 12000;

const contributedUSD = CONTRIBUTED_UZS / USD_TO_UZS_RATE;
const progressPercent = Math.min(100, Math.round((contributedUSD / GOAL_USD) * 1000) / 10);
const displayUSD = contributedUSD.toFixed(1);

const COINS = [
  { x: -22, delay: 0.05, size: 12 },
  { x: 12, delay: 0.16, size: 10 },
  { x: -6, delay: 0.3, size: 13 },
  { x: 24, delay: 0.44, size: 9 },
  { x: -15, delay: 0.58, size: 11 },
  { x: 5, delay: 0.72, size: 12 },
];

const sectionStyle: React.CSSProperties = {
  height: '100dvh',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const bgImgStyle: React.CSSProperties = {
  position: 'absolute', inset: 0,
  width: '100%', height: '100%',
  objectFit: 'cover',
  filter: 'saturate(0.5) brightness(0.2) blur(4px)',
  transform: 'scale(1.08)',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute', inset: 0,
  background: 'linear-gradient(180deg, rgba(5,1,3,0.6) 0%, rgba(8,2,5,0.45) 35%, rgba(12,3,7,0.7) 70%, rgba(5,1,3,0.94) 100%)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: 'clamp(24px,7vw,32px)',
  fontWeight: 400, fontStyle: 'italic',
  color: '#F8F0E3', margin: 0,
  textShadow: '0 0 40px rgba(201,169,110,0.2)',
  textAlign: 'center',
};

const boxBaseStyle: React.CSSProperties = {
  position: 'absolute', left: 0, right: 0, bottom: 0,
  height: '110px',
  borderRadius: '6px 6px 12px 12px',
  background: CREAM,
  boxShadow: '0 22px 45px rgba(0,0,0,0.55)',
  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
  paddingBottom: '16px',
  zIndex: 1,
};

const ribbonStyle: React.CSSProperties = {
  position: 'absolute', top: 0, bottom: 0, left: '50%',
  transform: 'translateX(-50%)',
  width: '10px',
  background: 'rgba(201,169,110,0.55)',
  zIndex: 2,
};

const lidStyle: React.CSSProperties = {
  position: 'absolute', left: 0, right: 0, top: 0,
  height: '52px',
  borderRadius: '10px 10px 4px 4px',
  background: 'linear-gradient(160deg, #E3C793, #B98F52)',
  boxShadow: '0 10px 20px rgba(0,0,0,0.35)',
  transformOrigin: 'bottom center',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 3,
};

const jarWrapStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
};

const jarLidStyle: React.CSSProperties = {
  width: '54px', height: '10px', borderRadius: '4px',
  background: 'linear-gradient(160deg, #E3C793, #B98F52)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
};

const jarNeckStyle: React.CSSProperties = {
  width: '42px', height: '12px',
  borderLeft: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`,
  background: 'rgba(255,255,255,0.05)',
  marginTop: '-2px',
};

const jarBodyStyle: React.CSSProperties = {
  width: '96px', height: '108px',
  border: `2px solid ${GOLD}`,
  borderRadius: '8px 8px 34px 34px',
  background: 'rgba(255,255,255,0.05)',
  position: 'relative',
  overflow: 'hidden',
  marginTop: '-2px',
};

const coinFillStyle: React.CSSProperties = {
  position: 'absolute', left: 0, right: 0, bottom: 0,
  background: 'linear-gradient(180deg, #F0DDB0, #C9A96E 55%, #96702F)',
  borderTop: '1px solid rgba(255,255,255,0.5)',
};

const coinBaseStyle: React.CSSProperties = {
  position: 'absolute', top: '-14px',
  borderRadius: '50%',
  background: 'radial-gradient(circle at 35% 30%, #F8E7B8, #C9A96E 60%, #8C6A34)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
};

const progressTrackStyle: React.CSSProperties = {
  width: '100%', height: '8px', borderRadius: '8px',
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(201,169,110,0.3)',
  overflow: 'hidden',
};

const progressFillStyle: React.CSSProperties = {
  height: '100%', borderRadius: '8px',
  background: 'linear-gradient(90deg, #C9A96E, #F0DDB0)',
};

const progressLabelStyle: React.CSSProperties = {
  marginTop: '6px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em',
  color: 'rgba(245,240,227,0.75)',
  textAlign: 'center',
};

const fundTextStyle: React.CSSProperties = {
  fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
  fontSize: '18px', color: CREAM, margin: 0, textAlign: 'center',
};

const fundSubTextStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '12px', fontWeight: 300,
  color: 'rgba(245,240,227,0.65)',
  margin: 0, lineHeight: 1.6, textAlign: 'center',
  maxWidth: '260px',
};

const signatureStyle: React.CSSProperties = {
  fontFamily: 'Dancing Script, cursive',
  fontSize: '22px',
  color: GOLD,
  margin: '4px 0 0',
  textShadow: '0 0 20px rgba(201,169,110,0.4)',
};

export const GiftSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  const openGift = () => {
    if (revealed) return; // box only opens once — a second tap shouldn't refire the confetti
    setRevealed(true);
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.55 },
      colors: [GOLD, CREAM, '#E8B4B8'],
    });
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const lidDuration = reduceMotion ? 0.3 : 0.8;
  const coinDuration = reduceMotion ? 0.2 : 0.6;

  return (
    <section
      ref={ref}
      style={sectionStyle}
    >
      <img
        src={GIFT_IMG}
        alt="Alyorbekdan Madinaxonga sovg'a"
        style={bgImgStyle}
      />
      <div style={overlayStyle} />

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '340px', padding: '0 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

        <motion.h2 {...fadeUp(0)} style={titleStyle}>
          {`Sovg‘ang tayyor 🎁`}
        </motion.h2>

        {/* 3D gift box */}
        <motion.div {...fadeUp(0.15)} style={{ width: '190px' }}>
          <div style={{ position: 'relative', width: '100%', height: '150px', perspective: '1000px' }}>
            <motion.div
              onClick={openGift}
              role="button"
              tabIndex={0}
              aria-label="Sovg'a qutisini ochish"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openGift(); }}
              whileTap={!revealed ? { scale: 0.97 } : undefined}
              style={{ position: 'relative', width: '100%', height: '100%', cursor: revealed ? 'default' : 'pointer' }}
            >
              {/* Base */}
              <div style={boxBaseStyle}>
                <div style={ribbonStyle} />
                {!revealed && (
                  <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: '16px', color: INK, margin: 0, textAlign: 'center', position: 'relative', zIndex: 3 }}>
                    Ochish uchun bos
                  </p>
                )}
              </div>

              {/* Lid */}
              <motion.div
                style={lidStyle}
                animate={{ rotateX: revealed ? -125 : 0 }}
                transition={{ duration: lidDuration, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{ fontSize: '20px' }}>🎀</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}
          >
            {/* Jar with falling coins */}
            <div style={jarWrapStyle}>
              <div style={jarLidStyle} />
              <div style={jarNeckStyle} />
              <div style={jarBodyStyle}>
                <motion.div
                  style={coinFillStyle}
                  initial={{ height: 0 }}
                  animate={{ height: `${progressPercent}%` }}
                  transition={{ duration: coinDuration * 1.4, delay: 0.5, ease: 'easeOut' }}
                />
                {!reduceMotion && COINS.map((c, i) => (
                  <motion.div
                    key={i}
                    style={{ ...coinBaseStyle, width: c.size, height: c.size, left: `calc(50% + ${c.x}px)` }}
                    initial={{ y: -70, opacity: 0, rotate: 0 }}
                    animate={{ y: 60, opacity: [0, 1, 1, 0], rotate: 180 }}
                    transition={{ duration: coinDuration, delay: 0.6 + c.delay, ease: 'easeIn' }}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', maxWidth: '220px' }}>
              <div style={progressTrackStyle}>
                <motion.div
                  style={progressFillStyle}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                />
              </div>
              <div style={progressLabelStyle}>
                ${displayUSD} / ${GOAL_USD} · {progressPercent}%
              </div>
            </div>

            <p style={fundTextStyle}>
              {`iPhone jamg‘armasi boshlandi 📱`}
            </p>
            <p style={fundSubTextStyle}>
              {`Bu — men boshlagan jamg‘arma. Sen hech narsa qilishing shart emas, qolganini o‘zim yig‘aman 💛`}
            </p>

            <p style={signatureStyle}>
              Seni sevaman. — Alyorbek
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
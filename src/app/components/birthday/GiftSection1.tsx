import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import confetti from 'canvas-confetti';

const GIFT_IMG = '/rasmlar/7.jpg';

// TODO(Sevgiling): create a personal payment link in the Payme app and paste it here before publishing.
const PAYMENT_LINK_PAYME = '';
// TODO(Sevgiling): optional — paste a Click payment link here. Leave empty to hide this button entirely.
const PAYMENT_LINK_CLICK = '';

export const GiftSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [revealed, setRevealed] = useState(false);

  const openGift = () => {
    setRevealed(true);
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C9A96E', '#F8F0E3', '#E8B4B8'],
    });
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const linkButtonStyle: React.CSSProperties = {
    display: 'block', width: '100%',
    padding: '14px 20px',
    borderRadius: '16px',
    background: 'rgba(201,169,110,0.1)',
    border: '1px solid rgba(201,169,110,0.3)',
    color: '#C9A96E',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '13px', fontWeight: 500,
    letterSpacing: '0.08em',
    textAlign: 'center' as const,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
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
      <img
        src={GIFT_IMG}
        alt="Sevgilingdan Sevgilimga sovg'a"
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

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '360px', padding: '0 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', textAlign: 'center' }}>
        {!revealed ? (
          <>
            <motion.h2 {...fadeUp(0)} style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(28px,8vw,38px)',
              fontWeight: 400, fontStyle: 'italic',
              color: '#F8F0E3', margin: 0, lineHeight: 1.2,
              textShadow: '0 0 40px rgba(201,169,110,0.2)',
            }}>
              {`Sovg'ang tayyor 🎁`}
            </motion.h2>

            <motion.div {...fadeUp(0.15)} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
              <span style={{ color: 'rgba(201,169,110,0.6)', fontSize: '12px' }}>✦</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
            </motion.div>

            <motion.p {...fadeUp(0.3)} style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(16px,4.5vw,19px)',
              fontStyle: 'italic',
              color: 'rgba(245,240,227,0.85)',
              margin: 0, lineHeight: 1.7,
            }}>
              Uzoqda bo'lsam ham, senga kichik bir sovg'a tayyorladim.
            </motion.p>

            <motion.button
              {...fadeUp(0.45)}
              onClick={openGift}
              style={{
                ...linkButtonStyle,
                fontSize: '14px',
                padding: '16px 24px',
                marginTop: '4px',
              }}
              whileTap={{ scale: 0.97 }}
            >
              {`Ochish 🎁`}
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}
          >
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(22px,6vw,28px)',
              fontWeight: 400, fontStyle: 'italic',
              color: '#F8F0E3', margin: 0, lineHeight: 1.3,
            }}>
              {`Tug'ilgan kuning bilan yana bir bor tabriklayman, sevgilim! 🎂`}
            </h2>

            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(15px,4vw,17px)',
              fontStyle: 'italic',
              color: 'rgba(245,240,227,0.8)',
              margin: 0, lineHeight: 1.6,
            }}>
              Quyidagi tugma orqali sovg'angni olishing mumkin.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '4px' }}>
              {PAYMENT_LINK_PAYME && (
                <a
                  href={PAYMENT_LINK_PAYME}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkButtonStyle}
                >
                  Payme orqali olish
                </a>
              )}
              {PAYMENT_LINK_CLICK && (
                <a
                  href={PAYMENT_LINK_CLICK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkButtonStyle}
                >
                  Click orqali olish
                </a>
              )}
            </div>

            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px', fontWeight: 300,
              color: 'rgba(245,240,227,0.55)',
              margin: '4px 0 0', lineHeight: 1.6,
            }}>
              {`Havola ochilmasa, menga yozib qo'y — qo'lda yuboraman 💛`}
            </p>

            <p style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '22px',
              color: '#C9A96E',
              margin: '8px 0 0',
              textShadow: '0 0 20px rgba(201,169,110,0.4)',
            }}>
              Seni sevaman. — Sevgiling
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

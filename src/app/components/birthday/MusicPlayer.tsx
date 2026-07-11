import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MUSIC_URL = '/music.mp3';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const timer = setTimeout(() => {
      audio.play().catch(() => {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 4000);
      });
      if (!audio.paused) setIsPlaying(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'fixed',
              bottom: '80px', right: '16px',
              background: 'rgba(20,8,12,0.92)',
              border: '1px solid rgba(201,169,110,0.25)',
              borderRadius: '12px',
              padding: '10px 14px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px', fontWeight: 400,
              color: '#C9A96E',
              letterSpacing: '0.03em',
              zIndex: 200,
              backdropFilter: 'blur(12px)',
              maxWidth: '200px',
              textAlign: 'center',
            }}
          >
            ♪ Musiqani yoqish uchun bosing
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        style={{
          position: 'fixed',
          bottom: '20px', right: '16px',
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: 'rgba(20,8,12,0.85)',
          border: '1px solid rgba(201,169,110,0.35)',
          cursor: 'pointer',
          zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(201,169,110,0.2)',
        }}
        aria-label="Musiqa"
      >
        {isPlaying ? (
          <div style={{ display: 'flex', gap: '2.5px', alignItems: 'flex-end', height: '18px' }}>
            {[1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
              <motion.div
                key={i}
                style={{
                  width: '3px',
                  background: '#C9A96E',
                  borderRadius: '2px',
                }}
                animate={{ height: [`${h * 18}px`, `${(1 - h + 0.3) * 18}px`, `${h * 18}px`] }}
                transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 3L13 8L4 13V3Z" fill="#C9A96E" />
          </svg>
        )}
      </motion.button>
    </>
  );
};

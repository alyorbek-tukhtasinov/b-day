import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const TARGET_VOLUME = 0.55;

/** Lazily created looping track with a gentle fade-in; pauses while the tab is hidden. */
export const useBackgroundMusic = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantsPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.addEventListener('play', () => setPlaying(true));
      audio.addEventListener('pause', () => setPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [src]);

  const play = useCallback(() => {
    const audio = ensureAudio();
    wantsPlayRef.current = true;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 2000);
          audio.volume = TARGET_VOLUME * t;
          if (t < 1 && !audio.paused) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      })
      .catch(() => {});
  }, [ensureAudio]);

  const toggle = useCallback(() => {
    const audio = ensureAudio();
    if (audio.paused) {
      play();
    } else {
      wantsPlayRef.current = false;
      audio.pause();
    }
  }, [ensureAudio, play]);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (wantsPlayRef.current) audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      audioRef.current?.pause();
    };
  }, []);

  return { playing, play, toggle };
};

export const MusicButton: React.FC<{ playing: boolean; onToggle: () => void }> = ({ playing, onToggle }) => (
  <motion.button
    type="button"
    onClick={onToggle}
    whileTap={{ scale: 0.92 }}
    aria-label={playing ? 'Musiqani to‘xtatish' : 'Musiqani yoqish'}
    aria-pressed={playing}
    className="pointer-events-auto grid size-11 place-items-center rounded-full border border-gold/30 bg-ink/60 text-gold backdrop-blur-md transition-colors hover:border-gold/60"
  >
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0.55, 1, 0.7, 0.4].map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-current"
          animate={playing ? { height: ['30%', `${h * 100}%`, '30%'] } : { height: '20%' }}
          transition={
            playing ? { duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 } : { duration: 0.3 }
          }
        />
      ))}
    </span>
  </motion.button>
);

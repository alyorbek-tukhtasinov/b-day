import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { CoverSection } from './app/components/birthday/CoverSection';
import { FirstMemorySection } from './app/components/birthday/FirstMemorySection';
import { FunnyMemorySection } from './app/components/birthday/FunnyMemorySection';
import { GratitudeSection } from './app/components/birthday/GratitudeSection';
import { JourneySection } from './app/components/birthday/JourneySection';
import { WishesSection } from './app/components/birthday/WishesSection';
import { GiftSection } from './app/components/birthday/GiftSection';
import { IntroGate } from './app/components/birthday/IntroGate';
import { MusicButton, useBackgroundMusic } from './app/components/birthday/MusicPlayer';
import { SCROLL_CONTAINER_ID, scrollToSection } from './app/components/birthday/primitives';

const SECTION_LABELS = ['Muqova', 'Birinchi lahza', 'Baxtli onlar', 'Minnatdorlik', 'Bizning yo‘limiz', 'Tilaklarim', 'Sovg‘a'];

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useBackgroundMusic('/music.mp3');

  const open = () => {
    music.play();
    setOpened(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-dvh justify-center bg-ink">
        {/* Desktop surround: the page sits like a single card on a dark table. */}
        <div aria-hidden className="fixed inset-0 hidden overflow-hidden md:block">
          <img src="/rasmlar/1.jpg" alt="" className="h-full w-full scale-110 object-cover opacity-25 blur-3xl saturate-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(42,20,25,0.4)_0%,#0a0406_70%)]" />
        </div>

        <main className="relative h-dvh w-full max-w-[440px] overflow-hidden md:shadow-[0_0_120px_rgba(0,0,0,0.9)] md:ring-1 md:ring-gold/10">
          <div
            id={SCROLL_CONTAINER_ID}
            className={`no-scrollbar h-full snap-y snap-mandatory scroll-smooth ${opened ? 'overflow-y-auto' : 'overflow-hidden'}`}
          >
            <CoverSection />
            <FirstMemorySection />
            <FunnyMemorySection />
            <GratitudeSection />
            <JourneySection />
            <WishesSection />
            <GiftSection />
          </div>

          <div aria-hidden className="grain pointer-events-none absolute inset-0 z-40 opacity-[0.06] mix-blend-overlay" />

          {opened && (
            <>
              <SectionProgress labels={SECTION_LABELS} />
              <div className="pointer-events-none absolute right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-40">
                <MusicButton playing={music.playing} onToggle={music.toggle} />
              </div>
            </>
          )}

          <AnimatePresence>{!opened && <IntroGate key="intro" onOpen={open} />}</AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}

const SectionProgress: React.FC<{ labels: string[] }> = ({ labels }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.getElementById(SCROLL_CONTAINER_ID);
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActive(Math.min(Math.max(idx, 0), labels.length - 1));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [labels.length]);

  return (
    <nav aria-label="Sahifalar" className="absolute top-1/2 left-2 z-40 flex -translate-y-1/2 flex-col gap-1">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => scrollToSection(i)}
          aria-label={label}
          aria-current={active === i ? 'page' : undefined}
          className="group grid h-5 w-4 place-items-center"
        >
          <span
            className={`block w-px rounded-full transition-all duration-500 ${
              active === i ? 'h-5 bg-gold' : 'h-2 bg-gold/30 group-hover:bg-gold/60'
            }`}
          />
        </button>
      ))}
    </nav>
  );
};

import React, { useEffect } from 'react';
import { MusicPlayer } from './app/components/birthday/MusicPlayer';
import { CoverSection } from './app/components/birthday/CoverSection';
import { FirstMemorySection } from './app/components/birthday/FirstMemorySection';
import { FunnyMemorySection } from './app/components/birthday/FunnyMemorySection';
import { GratitudeSection } from './app/components/birthday/GratitudeSection';
import { JourneySection } from './app/components/birthday/JourneySection';
import { WishesSection } from './app/components/birthday/WishesSection';
import { GiftSection } from './app/components/birthday/GiftSection';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#050102',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at center, #0d0408 0%, #030001 100%)',
          zIndex: -1,
        }}
      />

      <div
        id="birthday-scroll"
        style={{
          width: '100%',
          maxWidth: '430px',
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          position: 'relative',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        <style>{`
          #birthday-scroll::-webkit-scrollbar { display: none; }
          * { box-sizing: border-box; }
        `}</style>

        <CoverSection />
        <FirstMemorySection />
        <FunnyMemorySection />
        <GratitudeSection />
        <JourneySection />
        <WishesSection />
        <GiftSection />
      </div>

      <MusicPlayer />
      <SectionProgress totalSections={7} />
    </div>
  );
}

const SectionProgress: React.FC<{ totalSections: number }> = ({ totalSections }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    const container = document.getElementById('birthday-scroll');
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActiveIndex(Math.min(idx, totalSections - 1));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [totalSections]);

  return (
    <div style={{ position: 'fixed', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 150, display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            const container = document.getElementById('birthday-scroll');
            container?.scrollTo({ top: i * container.clientHeight, behavior: 'smooth' });
          }}
          style={{
            width: activeIndex === i ? '6px' : '4px',
            height: activeIndex === i ? '20px' : '4px',
            borderRadius: '3px',
            background: activeIndex === i ? '#C9A96E' : 'rgba(201,169,110,0.3)',
            border: 'none', padding: 0, cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: activeIndex === i ? '0 0 8px rgba(201,169,110,0.5)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

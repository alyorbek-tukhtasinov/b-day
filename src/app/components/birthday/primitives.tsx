import React, { createContext, useContext, useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SCROLL_CONTAINER_ID = 'birthday-scroll';

export const scrollToSection = (index: number) => {
  const container = document.getElementById(SCROLL_CONTAINER_ID);
  container?.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
};

const InViewContext = createContext(false);

interface SectionProps {
  image: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Rendered edge-to-edge over the backdrop, outside the centered content column. */
  overlay?: React.ReactNode;
}

/** Full-screen snap page with a softly blurred photo backdrop. */
export const Section: React.FC<SectionProps> = ({ image, label, children, className = '', overlay }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <InViewContext.Provider value={inView}>
      <section
        ref={ref}
        aria-label={label}
        className="relative flex h-dvh snap-start snap-always flex-col items-center justify-center overflow-hidden"
      >
        <Backdrop image={image} />
        {overlay}
        <div className={`relative z-10 flex w-full flex-col items-center px-9 text-center ${className}`}>
          {children}
        </div>
      </section>
    </InViewContext.Provider>
  );
};

export const Backdrop: React.FC<{ image: string }> = ({ image }) => (
  <div aria-hidden className="absolute inset-0">
    <img
      src={image}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl brightness-40 saturate-75"
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(10,4,6,0.25)_0%,rgba(10,4,6,0.75)_60%,rgba(10,4,6,0.95)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
  </div>
);

interface RevealProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/** Fades content up once its parent Section scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, className, children }) => {
  const inView = useContext(InViewContext);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 1, delay: inView ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export const useSectionInView = () => useContext(InViewContext);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`font-sans text-[11px] font-medium tracking-[0.32em] text-gold uppercase ${className}`}>{children}</p>
);

export const Heading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2
    className={`font-display text-[clamp(26px,7.2vw,36px)] leading-[1.12] font-light text-balance text-cream italic ${className}`}
  >
    {children}
  </h2>
);

export const Body: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`font-display text-[clamp(15.5px,4.3vw,19px)] leading-[1.6] text-pretty text-cream/80 ${className}`}>
    {children}
  </p>
);

export const Signature: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <p className={`font-script text-[clamp(24px,6.6vw,30px)] leading-tight text-gold-light ${className}`}>{children}</p>;

/** Hairline rule with a small diamond — the page's single ornament. */
export const Ornament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`flex w-full max-w-[200px] items-center gap-3 ${className}`}>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
    <span className="size-1.5 rotate-45 border border-gold/80" />
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
  </div>
);

interface FramedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  shape?: 'rect' | 'arch';
  eager?: boolean;
}

/** Photo in a thin gold passe-partout; keeps low-res originals small and crisp. */
export const FramedPhoto: React.FC<FramedPhotoProps> = ({ src, alt, className = '', shape = 'rect', eager }) => {
  const radius = shape === 'arch' ? 'rounded-t-full rounded-b-md' : 'rounded-[3px]';
  return (
    <div
      className={`relative border border-gold/35 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ${radius} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${radius}`}
      />
      <div aria-hidden className={`pointer-events-none absolute inset-1.5 ring-1 ring-black/20 ring-inset ${radius}`} />
    </div>
  );
};

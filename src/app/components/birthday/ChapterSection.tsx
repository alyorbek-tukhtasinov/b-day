import React from 'react';
import { Body, Eyebrow, FramedPhoto, Heading, Ornament, Reveal, Section, Signature } from './primitives';

interface ChapterSectionProps {
  chapter: string;
  kicker: string;
  title: string;
  body: string;
  signature: React.ReactNode;
  image: string;
  alt: string;
}

/** Shared layout for the diary "chapters": framed photo, title, story, signature. */
export const ChapterSection: React.FC<ChapterSectionProps> = ({ chapter, kicker, title, body, signature, image, alt }) => (
  <Section image={image} label={title} className="gap-4 [@media(max-height:700px)]:gap-3">
    <Reveal>
      <Eyebrow>
        <span className="text-gold-light">{chapter}</span>
        <span aria-hidden className="mx-2 text-gold/50">—</span>
        {kicker}
      </Eyebrow>
    </Reveal>

    <Reveal delay={0.1}>
      <FramedPhoto src={image} alt={alt} className="h-[clamp(120px,24dvh,280px)] aspect-[4/5]" />
    </Reveal>

    <Reveal delay={0.2} className="max-w-[360px]">
      <Heading>{title}</Heading>
    </Reveal>

    <Reveal delay={0.3} className="flex w-full justify-center">
      <Ornament />
    </Reveal>

    <Reveal delay={0.4} className="max-w-[350px]">
      <Body>{body}</Body>
    </Reveal>

    <Reveal delay={0.5}>
      <Signature>{signature}</Signature>
    </Reveal>
  </Section>
);

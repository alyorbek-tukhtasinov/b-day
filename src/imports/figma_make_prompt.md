# FULL BUILD SPECIFICATION — Transform this Wedding Invitation codebase into "Sevgilim's 22nd Birthday" website

## 0. Context (read before touching any code)

The attached codebase is a working React 18 + TypeScript + Vite 6 + Tailwind v4 + Motion (`motion/react`) single-page app called "Interactive Wedding Invitation Design." It is a full-screen, scroll-snapped, mobile-first (max-width 430px) experience made of six sections: Hero, Invitation, Details, Countdown, Map, Gift — plus two fixed overlays (LanguageSelector, MusicPlayer) and a left-edge section-progress dot indicator.

Your job is NOT to build a new app from scratch. Your job is to **repurpose this exact codebase** into a romantic birthday website with a completely different structure and content, while preserving the parts of the design system that already work well.

**Who this is for:** A man named **Sevgiling** is building this website for his girlfriend, **Sevgilim**, for her birthday. Her birthday is **12-July**, she was born in **2004**, so she is turning **22 years old**. They are currently in a long-distance relationship (physically far apart), which is why this is a website instead of a physical gift, and why the final section ends with a digital monetary gift instead of a physical one.

**Concept name: "Sevgi kundaligi" (Love Diary).** The site reads like flipping through a personal diary/scrapbook of the couple's relationship, each page/section is one diary entry, anchored by a real photo of the two of them together.

**Language rule (critical, applies to the entire codebase):**
- Every single piece of user-facing text — headlines, body copy, button labels, image `alt` attributes, toast/hint text, aria-labels — must be written in **Uzbek (Latin script)**, hardcoded directly as plain strings.
- Code itself (variable names, comments, function names) stays in **English**, as is normal engineering convention.
- There must be **zero** multi-language switching anywhere in the final result. Not a toggle, not a hidden second language object, nothing.

---

## 1. What to KEEP exactly as-is (do not modify these files/mechanisms)

- `vite.config.ts` — including the `figma-asset-resolver` plugin. Do not touch it.
- `package.json` — every dependency you need is already installed. In particular, **`canvas-confetti` (1.9.4) is already a dependency** — you will use it in section 7, do not add a new package for this.
- `src/styles/fonts.css`, `src/styles/theme.css`, `src/styles/tailwind.css`, `src/styles/index.css` — unchanged.
- Everything under `src/app/components/ui/*` (shadcn/Radix primitives) and `src/app/components/figma/ImageWithFallback.tsx` — unchanged, untouched, still available if ever needed, but you will mostly continue the existing pattern of hand-styled `div`/`motion.div` elements with inline `style={{}}` objects rather than pulling in the `ui/*` components, exactly like the current wedding sections do. Consistency with the existing hand-styled approach matters more than switching to a component library.
- `src/main.tsx` — unchanged.
- The overall **mobile-frame mechanism**: a full-height flex container centered on the page, containing an inner scrollable column capped at `max-width: 430px`, with `scrollSnapType: 'y mandatory'`, hidden scrollbars, and each section being `height: 100dvh; scrollSnapAlign: start; scrollSnapStop: always;`. Do not change this mechanic — only the content inside changes.
- The **left-edge section-progress dot indicator** (the `SectionProgress` component defined inline in `App.tsx`). Keep its logic identical; you will only update the `totalSections` number it receives.
- The **existing visual/design language**: the same three fonts, the same gold accent color, the same dark cinematic backgrounds, the same glassmorphism card style, the same ornamental divider motif (thin gradient line — glyph — thin gradient line), the same entrance-animation choreography (`motion.div` fade + translateY, triggered by `useInView`, staggered by ~0.15s per element). Reuse these exact patterns; do not invent a new visual language. The only structural change the user asked for is: **every section's background becomes a real photo of the couple** instead of a flat gradient or a stock photo, and the page content/structure changes from wedding-themed to birthday-themed.

### Design tokens to reuse everywhere (do not deviate from these)

| Token | Value |
|---|---|
| Display serif font (headlines, italic where noted) | `'Cormorant Garamond, serif'` |
| Label / small-caps font | `'Montserrat, sans-serif'` |
| Signature / cursive accents | `'Dancing Script, cursive'` |
| Gold accent | `#C9A96E` |
| Cream / off-white text | `#F8F0E3` |
| Base dark background (visible at container edges before photos load) | `#050102` |
| Standard photo-overlay gradient (copy this exact combination onto every section's background, layered directly on top of the `<img>`) | See snippet below |
| Card glass style (reuse for Journey timeline nodes) | `background: rgba(255,255,255,0.06); backdropFilter: blur(20px); border: 1px solid rgba(201,169,110,0.2); borderRadius: 20px;` |
| Rose/blush secondary glow (petals, confetti) | `rgba(220,160,170,0.7)` family, plus `#E8B4B8` |

Standard overlay (copy verbatim, place as two absolutely-positioned divs directly after the `<img>` in every section, exactly like `HeroSection.tsx` already does):

```tsx
<div style={{
  position: 'absolute', inset: 0,
  background: 'linear-gradient(180deg, rgba(5,1,3,0.55) 0%, rgba(8,2,5,0.4) 35%, rgba(12,3,7,0.65) 70%, rgba(5,1,3,0.92) 100%)',
}} />
<div style={{
  position: 'absolute', inset: 0,
  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,1,3,0.5) 100%)',
}} />
```

This already gives ~55% opacity near the top and ~92% near the bottom, which is exactly the legibility range needed — do not lighten it below this. If a specific photo is unusually bright, you may raise the bottom stop up to `0.95`, never lower it.

---

## 2. What to DELETE completely

Delete the entire `src/app/components/wedding/` folder and everything in it:

- `HeroSection.tsx`
- `InvitationSection.tsx`
- `DetailsSection.tsx`
- `CountdownSection.tsx`
- `MapSection.tsx`
- `GiftSection.tsx`
- `LanguageContext.tsx`
- `LanguageSelector.tsx`
- `MusicPlayer.tsx` (recreated fresh in the new folder below, with minor edits)

**Do not preserve the Countdown or Map concept in any form**, even disguised. No live timers, no embedded maps, no venue/address cards, no "days until X" mechanic anywhere in the new site. The user was explicit that these don't logically fit a long-distance birthday website and must be replaced by something more creative (see Section 4.5 below, "JourneySection.tsx — Bizning yo'limiz").

Create a new folder `src/app/components/birthday/` containing exactly these 8 files (full spec for each is in Section 4):

1. `CoverSection.tsx`
2. `FirstMemorySection.tsx`
3. `FunnyMemorySection.tsx`
4. `GratitudeSection.tsx`
5. `JourneySection.tsx`
6. `WishesSection.tsx`
7. `GiftSection.tsx`
8. `MusicPlayer.tsx`

---

## 3. Global changes

### 3.1 `index.html`
- Change `<html lang="en">` to `<html lang="uz">`.
- Change `<title>Interactive Wedding Invitation Design</title>` to `<title>Sevgilimga — Sevgi Kundaligi 🎂</title>`.

### 3.2 `src/app/App.tsx` — replace entirely with:

```tsx
import React, { useEffect } from 'react';
import { MusicPlayer } from './components/birthday/MusicPlayer';
import { CoverSection } from './components/birthday/CoverSection';
import { FirstMemorySection } from './components/birthday/FirstMemorySection';
import { FunnyMemorySection } from './components/birthday/FunnyMemorySection';
import { GratitudeSection } from './components/birthday/GratitudeSection';
import { JourneySection } from './components/birthday/JourneySection';
import { WishesSection } from './components/birthday/WishesSection';
import { GiftSection } from './components/birthday/GiftSection';

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
        }}
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
```

Notice: `LanguageProvider` is gone completely, the scroll container id changed from `wedding-scroll` to `birthday-scroll` **consistently in both places it appears**, and `totalSections` is now `7`.

### 3.3 Remove the language system everywhere
Grep the whole project for `useLanguage`, `LanguageContext`, `LanguageProvider`, and `t.` translation-lookup patterns (e.g. `t.heroTitle`) — none of these should exist anywhere in the final code. Every component hardcodes its Uzbek text directly as a plain string or JSX text node.

---

## 4. Section-by-section specification (the 7 pages, in scroll order)

General rule for every section below: same outer `<section>` wrapper as the current sections (`height: 100dvh; scrollSnapAlign: start; scrollSnapStop: always; position: relative; overflow: hidden; display:flex; flexDirection:column; alignItems:center; justifyContent:center;`), a full-bleed `<img>` background + the standard overlay from Section 1, then a `position:relative; zIndex:5;` content column, `useInView` + staggered `motion` entrance exactly like the current codebase already does it.

### Quick reference table

| # | File | Photo needed | Uzbek headline |
|---|---|---|---|
| 1 | CoverSection.tsx | Best couple photo | Sevgilim |
| 2 | FirstMemorySection.tsx | Early-relationship photo | Bizning boshlanishimiz |
| 3 | FunnyMemorySection.tsx | A candid/funny photo | Eng kulgili lahzamiz |
| 4 | GratitudeSection.tsx | A tender/close photo | Rahmat, doim yonimda bo'lganing uchun |
| 5 | JourneySection.tsx | A journey/travel-together photo | Bizning yo'limiz |
| 6 | WishesSection.tsx | A joyful/laughing-together photo | Bugun senga tilayman... |
| 7 | GiftSection.tsx | Your favorite/most special photo | Sovg'ang tayyor 🎁 |

All seven photos must be **different photographs of the couple together** — this is the single most important content change the user asked for (previously only the Hero section had a real personal photo; every section must have one now, and no two sections should reuse the same image).

---

### 4.1 `CoverSection.tsx` (Section 1)

- Keep the existing **falling-petals animation** from the old `HeroSection.tsx` unchanged (the `Petal` interface, the `useMemo` petal generator, the looping `motion.div` petals with the same rose/blush color palette) — it already fits a romantic birthday mood, no need to touch it.
- Keep the two soft radial "glowing orb" background accents from the old Hero, unchanged.
- Background image constant: `const COVER_IMG = '/photos/01-cover.jpg';` (see Section 6 for the image-sourcing rule).
- Content, top to bottom:
  1. Small kicker line, exact style of the old `heroDate` label (Montserrat, 10px, 300 weight, `#C9A96E`, uppercase, letter-spacing 0.25em): **`♡ 29 FEVRAL ♡`**
  2. Main name, exact style of the old bride/groom `h1` (Cormorant Garamond, `clamp(52px,16vw,72px)`, weight 300, italic, `#F8F0E3`, text-shadow glow): **`Sevgilim`**
  3. A new small pill-shaped age badge directly under the name (this is new, not in the old code — build it in this exact style):
     ```
     display:inline-flex; align-items:center; padding:6px 18px; borderRadius:999px;
     border:1px solid rgba(201,169,110,0.4); background:rgba(201,169,110,0.1);
     boxShadow:0 0 20px rgba(201,169,110,0.15);
     text: Montserrat 11px, weight 500, letter-spacing 0.15em, uppercase, color #C9A96E
     ```
     Text inside the badge: **`22 YOSH`**
  4. Divider (reuse the old thin gradient-line divider, unchanged).
  5. Subtitle, exact style of the old `heroSubtitle` (Cormorant Garamond italic, `clamp(16px,5vw,20px)`, `rgba(245,240,227,0.85)`): **`Tug'ilgan kuning muborak bo'lsin, sevgilim`**
  6. Small signature line near the very bottom, Dancing Script cursive, gold, same glow treatment the old ampersand `&` had: **`Sevgilingdan — sevgi bilan`**
- Scroll-hint at the bottom, same bouncing chevron + label as before: **`Pastga suring`**
- Image `alt` text: `"Sevgiling va Sevgilimning birgalikdagi surati"`

---

### 4.2 `FirstMemorySection.tsx` (Section 2)

- Structure: copy `InvitationSection.tsx`'s layout exactly (top ornament → italic serif title → serif body paragraph → closing divider → Dancing Script signature line → three pulsing heart glyphs), but replace the Unsplash floral image with a real photo and replace every string.
- Background constant: `const FIRST_MEMORY_IMG = '/photos/02-first-memory.jpg';`
- Top ornament glyphs: `✦` (unchanged style).
- Title: **`Bizning boshlanishimiz`**
- Body paragraph (editable placeholder — Sevgiling should personalize this later with the real story of how they met, but ship it with this warm default so the page is not empty):
  **`Hali ham o'sha kunni eslayman. Sen kulganingda, vaqt bir zumga to'xtab qolgandek bo'lgan edi. O'shanda bilmagandim — bu oddiy tanishuv butun hayotimni boshqa tomonga burib yuborishini.`**
- Closing signature (Dancing Script): **`Va o'shandan beri...`**
- Image `alt`: `"Sevgiling va Sevgilimning birinchi kunlaridan xotira"`

---

### 4.3 `FunnyMemorySection.tsx` (Section 3)

- Same structural template as 4.2, lighter/playful tone.
- Background constant: `const FUNNY_MEMORY_IMG = '/photos/03-funny-memory.jpg';`
- Top ornament glyph: `✨`
- Title: **`Eng kulgili lahzamiz`**
- Body paragraph (editable placeholder):
  **`Kulganingda burningni jiyirganingni bilasanmi? Men buni ham juda yaxshi ko'raman. O'sha kuni ikkalamiz shunchalik kulganmizki, atrofdagilar bizga g'alati qarashgan — lekin bizga baribir edi.`**
- Closing signature: **`Sen bilan har lahza — bayram`**
- Image `alt`: `"Sevgiling va Sevgilimning kulgili xotirasi"`

---

### 4.4 `GratitudeSection.tsx` (Section 4)

- Same structural template, warmer/deeper tone. This is the page that acknowledges the long-distance reality.
- Background constant: `const GRATITUDE_IMG = '/photos/04-gratitude.jpg';`
- Top ornament glyph: `🤍`
- Title: **`Rahmat, doim yonimda bo'lganing uchun`**
- Body paragraph (editable placeholder):
  **`Masofa bizni ajratsa ham, sen har doim yuragimning eng yaqin nuqtasidasan. Qiyin kunlarimda ovozing kuch bergan, uzoqdan turib ham meni tinchlantira olgan yagona insonsan.`**
- Closing signature: **`Doim yoningdaman — uzoqda bo'lsam ham`**
- Image `alt`: `"Sevgiling va Sevgilimning quchoqlashgan surati"`

---

### 4.5 `JourneySection.tsx` (Section 5) — replaces Countdown + Map

This is the creative replacement for the removed timer/venue-map pages. It is a **vertical relationship-milestone timeline**, not a live counter and not an embedded map.

- Background constant: `const JOURNEY_IMG = '/photos/05-journey.jpg';`
- Title block, same header style as old `DetailsSection`/`CountdownSection` titles: **`Bizning yo'limiz`**, subtitle underneath in the small Montserrat label style: **`Har bir qadam — bitta xotira`**
- Below the title, render a vertical timeline of 5 stops. Build it like this:
  - A single continuous vertical line, 2px wide, `background: linear-gradient(to bottom, transparent, #C9A96E 10%, #C9A96E 90%, transparent)`, running down the left side of the stack.
  - Each stop is a row: a small 14px circular node centered on the line (`background:#C9A96E; boxShadow:0 0 12px rgba(201,169,110,0.5); borderRadius:50%`), next to a glass card reusing the exact glass style from `DetailCard` in the old `DetailsSection.tsx` (`background: rgba(255,255,255,0.06); backdropFilter: blur(20px); border: 1px solid rgba(201,169,110,0.2); borderRadius: 20px; padding: 16px 18px;`).
  - Each card contains: a 2-digit index label (Montserrat, 10px, uppercase, gold, letter-spacing 0.1em, e.g. `01`), a title line (Cormorant Garamond, 18px, weight 500, `#F8F0E3`), and a one-line description (Montserrat, 12px, weight 300, `rgba(245,240,227,0.6)`).
  - Animate each row in with the same `motion` fade+slide pattern as `DetailCard`, staggered by index × 0.15s delay.
- The 5 stops (editable placeholders — real dates/details can replace these later):
  1. `01` — **Tanishuv** — *Yo'llarimiz birinchi marta kesishgan kun*
  2. `02` — **Birinchi suhbat** — *Tunbo'yi gaplashib, tongni bilmay qolganmiz*
  3. `03` — **Birinchi "Seni sevaman"** — *Yuragim birinchi marta baralla gapirgan kun*
  4. `04` — **Masofaga qarshi** — *Uzoqlik bizni emas, sevgimizni sinovdan o'tkazdi*
  5. `05` — **Bugun** — *22 yosh, va sevgimiz hali ham kuchayib bormoqda*
- Image `alt`: `"Sevgiling va Sevgilimning sayohatdan surati"`
- **Do not** add a live clock, a "days until" counter, or any embedded map/iframe anywhere in this section.

---

### 4.6 `WishesSection.tsx` (Section 6)

- Background constant: `const WISHES_IMG = '/photos/06-wishes.jpg';`
- Title, same header style as before: **`Bugun senga tilayman...`**
- Below the title, a vertical list of 5 wish lines, each prefixed with a small pulsing `♡` glyph (reuse the pulsing-heart animation already used at the bottom of `InvitationSection.tsx`), staggered entrance:
  1. Yuzingdan tabassum hech qachon arimasin
  2. Orzularing hammasi ushalsin
  3. Sog'liging mustahkam, ko'ngling doim tinch bo'lsin
  4. Men yoningda bo'lmasam ham, sevgim doim seni o'rab tursin
  5. Bu yil senga eng baxtli yil bo'lsin, Sevgilim
- Image `alt`: `"Sevgiling va Sevgilimning baxtli surati"`

---

### 4.7 `GiftSection.tsx` (Section 7) — rebuilt gift-reveal + Payme/Click link-out

**Do not reuse the old bank-card-with-copy-button UI.** That old design was for wedding guests to send money *to* the couple. Here the direction is reversed — Sevgiling is sending a gift *to* Sevgilim — and no real payment can be processed inside the website itself (that requires a licensed payment processor, which this static site does not have). Instead, build a two-state reveal experience: a closed state with an "open" button, and a revealed state with outbound link button(s) to Sevgiling's own Payme/Click payment link. Use the confetti burst as the celebratory moment instead of displaying any card number or amount — **never hardcode or display a specific money amount anywhere in this section.**

```tsx
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import confetti from 'canvas-confetti';

const GIFT_IMG = '/photos/07-gift.jpg';

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

  // ...section wrapper + GIFT_IMG background + standard overlay, exactly like every other section...

  // Pre-reveal state:
  //   Title: "Sovg'ang tayyor 🎁"
  //   Body: "Uzoqda bo'lsam ham, senga kichik bir sovg'a tayyorladim."
  //   Button (reuses the old GiftSection copy-button visual style — gold border/background,
  //   Montserrat 13px letter-spaced): "Ochish 🎁" → calls openGift on click

  // Post-reveal state (fades/slides in after openGift runs):
  //   Message: "Tug'ilgan kuning bilan yana bir bor tabriklayman, sevgilim! 🎂
  //             Quyidagi tugma orqali sovg'angni olishing mumkin."
  //   {PAYMENT_LINK_PAYME && (
  //     <a href={PAYMENT_LINK_PAYME} target="_blank" rel="noopener noreferrer">Payme orqali olish</a>
  //   )}
  //   {PAYMENT_LINK_CLICK && (
  //     <a href={PAYMENT_LINK_CLICK} target="_blank" rel="noopener noreferrer">Click orqali olish</a>
  //   )}
  //   Fallback microcopy (always shown, small, ~60% opacity):
  //     "Havola ochilmasa, menga yozib qo'y — qo'lda yuboraman 💛"
  //   Final signature line (Dancing Script, gold):
  //     "Seni sevaman. — Sevgiling"
};
```

Implementation requirements for this section specifically:
- Both `<a>` buttons must open in a new tab (`target="_blank" rel="noopener noreferrer"`) — this website never processes the transfer itself, it only opens Sevgiling's real Payme/Click link.
- The Click button must only render when `PAYMENT_LINK_CLICK` is a non-empty string — do not force both buttons to always show.
- Style both link-buttons identically to the old `GiftSection`'s copy-button (rounded 16px, `rgba(201,169,110,0.1)` background, `1px solid rgba(201,169,110,0.3)` border, gold text, Montserrat 13px, letter-spacing 0.08em) rather than inventing a new button style.
- The confetti call must fire exactly once per tap of "Ochish" (not repeatedly, not on scroll-into-view).
- Image `alt`: `"Sevgilingdan Sevgilimga sovg'a"`.

---

## 5. `MusicPlayer.tsx` (carried over, lightly edited)

Keep the entire mechanic identical to the old `MusicPlayer.tsx` (autoplay attempt after 800ms, fallback hint toast if the browser blocks autoplay, floating circular toggle button bottom-right, animated equalizer bars while playing). The only changes:
- Remove the `useLanguage` import and the `t.musicTap` lookup; hardcode the hint text directly: **`♪ Musiqani yoqish uchun bosing`**.
- Leave `MUSIC_URL = '/music.mp3'` as-is — Sevgiling will replace the actual mp3 file with a song meaningful to the two of them.

---

## 6. Photo-sourcing rule (apply to all 7 `*_IMG` constants above)

- **If real photos of Sevgiling and Sevgilim are attached directly in this Figma Make session**, import and use them via the existing `figma:asset/` mechanism (already wired up in `vite.config.ts`) in the order listed in the table in Section 4, one distinct photo per section, instead of the placeholder path constants shown above.
- **If no real photos are attached yet**, use tasteful, safe-for-work, non-branded romantic placeholder photography (in the same style already used by the old `InvitationSection.tsx`/`DetailsSection.tsx` — i.e., Unsplash source URLs), applying a similar desaturate/darken filter (`saturate(0.6) brightness(0.3)` or similar) so it still reads as intentional and polished. Keep each of the 7 `const *_IMG = '...'` constants at the very top of its file, clearly isolated, so swapping in real photos later is a one-line change per file.
- Every `<img>` needs `width:100%; height:100%; objectFit:cover;` and a real, specific Uzbek `alt` description (never leave `alt=""`).

---

## 7. Explicit "do not" list

- Do not keep any language switcher/toggle, in the corner or anywhere else.
- Do not keep the Countdown or Map concept in any form (no timers, no embedded maps/iframes, no venue address cards).
- Do not display a specific gift amount or currency figure anywhere.
- Do not attempt to process a real payment/transfer inside the website — only a styled outbound link to Sevgiling's own Payme/Click payment link.
- Do not change the fonts, the gold accent color, or the mobile-frame/scroll-snap mechanism.
- Do not modify `vite.config.ts`, `package.json`, `src/styles/*`, `src/main.tsx`, or anything under `components/ui/` or `components/figma/`.
- Do not leave any leftover `t.xxx`, `useLanguage`, or `LanguageContext` references anywhere in the project.
- Do not reuse the same photo in two different sections.

---

## 8. Self-check before you finish

Before considering this done, verify:
1. The project builds with no TypeScript/console errors.
2. There are exactly 7 sections in `App.tsx`, in the exact order given, and `totalSections={7}` matches.
3. No file anywhere imports `LanguageContext`, `LanguageSelector`, `CountdownSection`, or `MapSection` — they no longer exist.
4. Every section has its own distinct background photo with the standard overlay and legible text.
5. Both `PAYMENT_LINK_PAYME`/`PAYMENT_LINK_CLICK` conditionals work — with either left empty, its button simply does not render, and nothing looks broken.
6. Confetti fires once, exactly on tapping "Ochish," not on scroll or re-render.
7. At 375–430px viewport width there is no horizontal scroll or overflow anywhere.
8. Every `<img>` has a real Uzbek `alt` string.
9. All copy on the site is Uzbek; all code comments/identifiers are English.

Build a Next.js single-page website for "Pizza Planet" — tagline "I'm Lovin' It".

The brand logo is a circular black badge with rainbow light-burst streaks radiating
outward, bold white handwritten/script typography, and a cute cartoon pizza slice
replacing the "o" in "Planet". The entire vibe is: cosmic, fun, slightly retro,
and energetic — like a 90s arcade meets a premium pizza joint in space.

══════════════════════════════════════
DESIGN LANGUAGE — READ THIS CAREFULLY
══════════════════════════════════════

NO generic cards. NO pill buttons. NO soft gradients. NO boring grid layouts.
NO plain text headings. EVERY heading is a designed moment.
This site should feel like it was designed by a creative director obsessed
with pizza and space, not assembled from a template.

COLOR PALETTE (extracted from logo):

- Base: #000000 (pure black)
- Primary text: #FFFFFF
- Accent 1: #FF3C3C (red, from the heart)
- Accent 2: #FFB830 (warm orange, from the pizza slice)
- Accent 3: Rainbow light streaks — use sparingly as glowing line elements,
  not fills. Simulate with CSS: linear-gradient across red → yellow → green →
  blue → violet on thin <2px lines or borders only.
- Texture: Add a subtle film grain CSS overlay on every section
  (SVG feTurbulence or pseudo-element with noise)

TYPOGRAPHY:

- Headlines: "Pacifico" or "Righteous" from Google Fonts — script/display,
  matches the logo handwritten energy
- Body: "DM Sans" — clean, modern contrast
- Accent labels: "Space Mono" — for receipt, tags, small technical labels
- No system fonts. Ever.

══════════════════════════════════════
HEADING DESIGN SYSTEM — CRITICAL RULE
══════════════════════════════════════

NEVER render a heading as plain styled text.
Every section heading must be a DESIGNED TYPOGRAPHIC MOMENT built from
a combination of: decorative pizza/space elements, inline SVG icons,
split word treatments, ghost letters, outline vs filled contrast,
emoji-as-punctuation, orbiting dots, slice illustrations, or motion.

Here is EXACTLY how each heading is designed:

HERO HEADING:

- Word "PIZZA" — massive (clamp 80px–140px), white filled display font,
  with a tiny cartoon pizza slice SVG sitting ON TOP of the letter "I",
  like the slice is balancing on it, slightly tilted +15deg
- Word "PLANET." — same size but rendered with:
  · "PLANET" in rainbow conic-gradient text-fill (animated, slowly rotating hue)
  · The period replaced by a spinning planet SVG (Saturn with ring)
  that slowly rotates on its own axis
- Below both words: the tagline "I'm Lovin' It" written in a curved arc
  (SVG textPath along a curve), in red #FF3C3C, script font,
  as if written around an invisible pizza

MENU SECTION HEADING:

- The word "THE" — tiny, all caps, Space Mono, white, floating top-left
  of the heading block, like a superscript label
- The word "MENU" — enormous display font, but the letter "M" is replaced
  by / starts with two crossed pizza slice SVGs forming an "M" shape in orange
- After "MENU": a dashed orbit ring (CSS border-radius circle,
  border-dashed, slowly spinning) with a tiny fork+knife icon orbiting it
- The whole heading block has a very faint ghost version of the word "MENU"
  behind it in outline only, 3x larger, opacity 0.03

ABOUT / OUR STORY HEADING:

- "OUR" — small, outline text only (text-stroke: 1px white),
  positioned above and slightly left
- "STORY" — massive, filled white, display font
- The letter "O" in "STORY" replaced by an actual pizza illustration SVG
  (top-down view: crust circle, sauce, pepperoni dots) — same size as the letter
- A red hand-drawn underline ONLY under "STORY" that animates in
  from left to right on scroll (SVG stroke-dashoffset animation)
- Small star glyphs ✦ scattered around the heading at random positions,
  different sizes, slowly pulsing opacity

ORDER SECTION HEADING:

- "BUILD" — white, massive, display font, normal
- "YOUR" — same size but in OUTLINE only (no fill, just stroke),
  so the black background shows through the letterforms
- "SLICE" — filled with the orange #FFB830, and each letter has a tiny
  drop of "cheese" drip SVG hanging off the bottom edge of the letters
  (S, L, I, C, E each have a small organic drip shape below)
- The entire 3-word heading is stacked vertically, not in a line
- A thin dashed circle (like a pizza cutter path) orbits the entire
  heading block slowly

TESTIMONIALS HEADING:

- A giant opening quotation mark " rendered in outline, 100% width,
  barely visible (opacity 0.04) as the section background
- On top: "WHAT THE" in small Space Mono caps
- Below: "GALAXY" in massive display font with:
  · The letter "A" replaced by a rocket ship SVG pointing upward
  · The letter "Y" at the end has a pizza slice SVG hanging off
  its descender like an ornament
- Below that: "IS SAYING" in outline text, large, offset to the right
- The whole heading arrangement is intentionally misaligned —
  each line at a slightly different x-position,
  giving it a deconstructed editorial feel

FOOTER BRAND HEADING:

- The Pizza Planet logo recreated in pure CSS:
  · A circle with border: 2px solid white
  · Inside: multiple thin lines radiating from center
  using box-shadow or SVG lines, each a different color
  from the rainbow spectrum
  · Center text: "Pizza Planet" in display font, large, white
  · Above it: "I'm Lovin' It" in red script, smaller, curved via SVG textPath
- Below the logo: "SERVING THE GALAXY SINCE 2024" in Space Mono,
  letter-spaced wide, with a thin rainbow gradient line above it

══════════════════════════
SECTIONS
══════════════════════════

━━━ 1. NAVBAR ━━━

- Pure black bar
- Logo left: CSS circle recreation of the brand badge (burst lines as
  multi-color box-shadows or SVG, "Pizza Planet" text inside)
- Nav links: HOME · MENU · OUR STORY · ORDER — all caps, Space Mono,
  wide letter-spacing, each with a tiny pizza slice ▲ that appears
  below the active/hovered link
- Right: Pizza box SVG icon for cart with item count in a red dot
- On scroll: single 1px rainbow animated gradient line appears
  at the bottom of the navbar

━━━ 2. HERO ━━━

- Full viewport, pure black
- LEFT: The typographic heading described above +
  · Tagline curved via SVG textPath
  · Two CTAs:
  "Explore Menu" — plain text with a comet-trail animated underline
  (SVG line that draws itself from left to right, looping)
  "Order Now" — black rectangle, rainbow conic-gradient border
  (CSS rotating border trick), white Space Mono text inside
- RIGHT: Large CSS circle matching logo energy — dark circle,
  rainbow burst SVG lines radiating, large pizza SVG in center
  slowly rotating 360° (20s infinite)
- Bottom: Red marquee ticker strip:
  "🍕 MARGHERITA · 🌶️ SPICY INFERNO · 🧀 CHEESE BURST ·
  🚀 COSMIC SPECIAL · ⭐ BESTSELLER · [repeat infinitely]"

━━━ 3. ABOUT / OUR STORY ━━━

- Ghost background: "01" in outline, 200px, opacity 0.03
- Section heading as designed above
- Left: thin red vertical line + story paragraphs in DM Sans
- Right: Pull quote in a hand-drawn SVG border rectangle,
  rotated +2deg:
  "Every slice is a journey across the cosmos."
- Stats: three large numbers separated by thin rainbow lines:
  "12+" / Locations · "50K+" / Happy Customers · "100%" / Made Fresh
  Numbers in display font orange, labels in Space Mono white small

━━━ 4. MENU ━━━

- Section heading as designed above
- Filter: plain text tabs, sliding underline indicator animates
  between tabs like a camera shutter
  Categories: All / Classic / Signature / Vegan / Sides / Drinks
- Layout: NOT cards. Each item is a full-width ROW:
  · Far left: ghost item number (01, 02...) in outline, large, opacity 0.08
  · Center-left: Name in display font (large),
  description in DM Sans small, dietary tags in Space Mono tiny outlined boxes
  · Right: Price in orange #FFB830, and a bare stroke circle "+" button
  (no fill, just border) — on hover: fills orange, scale(1.1)
  · Row separator: thin dashed line #1a1a1a
  · Row hover: a faint rainbow shimmer sweeps across the background
  left to right (CSS keyframe animation, opacity 0.06)

━━━ 5. TODAY'S SPECIAL ━━━

- Inline heading treatment:
  "TODAY'S" small Space Mono above, "SPECIAL ✦" massive display font,
  the ✦ slowly pulsing
- Auto-scrolling horizontal strip (infinite CSS animation):
  Each item: large display font name + orange price +
  red "LIMITED" stamp rotated -8deg (like a rubber stamp)

━━━ 6. ORDER SECTION ━━━

- Section heading as designed above (BUILD YOUR SLICE with cheese drips)
- Form styled as a DINER RECEIPT / ORDER TICKET:
  · Off-white paper #F5ECD7 centered on black
  · Dashed border (tear-off effect), slight box-shadow for paper lift
  · All text inside in Space Mono (receipt feel)
  · Top of receipt: "PIZZA PLANET ORDER #\_\_\_\_" with a pizza slice stamp SVG
  · Fields:
  · Name: underline-only input
  · Size: 4 circles increasing in size — S, M, L, XL — select fills orange
  · Crust: inline text toggle with sliding background
  · Toppings: stamp-style checkbox grid
  · Delivery/Pickup: physical CSS toggle switch
  · Address: appears with slide-down animation if Delivery selected
  · Submit: large red button "SEND TO KITCHEN →"
  with SVG paper-tear clip on bottom edge
- Desktop: sticky right sidebar shaped like a hanging price tag
  (teardrop SVG shape, rotated, showing live order + total)

━━━ 7. TESTIMONIALS ━━━

- Section heading as designed above (WHAT THE GALAXY IS SAYING)
- Giant ghost quotation mark " as background texture
- Each review: stacked type only —
  · Customer name: large display font
  · Review text: DM Sans, alternating left/right alignment
  · Stars: ★★★★★ in orange, actual Unicode glyphs
  · Each review offset horizontally, alternating -20px / +40px
  · Scroll-triggered fade, one at a time

━━━ 8. FOOTER ━━━

- Full black
- CSS logo recreation as heading (described above)
- Single row nav links, Space Mono, wide tracking
- "SERVING THE GALAXY SINCE 2024" — Space Mono, letter-spaced
- Top border: 1px rainbow animated gradient line
- Bottom: social icon row — minimal stroke icons only

══════════════════════════
TECHNICAL REQUIREMENTS
══════════════════════════

- Next.js 14 App Router
- Tailwind CSS with custom config for this palette
- Framer Motion for all scroll-triggered reveals,
  stagger animations, and hover states
- All heading SVG elements inline (not img tags) for animatability
- Zero shadcn/ui — 100% custom components
- Mock data: 12+ menu items (name, description, price, category, tags)
- Cart state: Zustand or React Context
- Fully responsive:
  · Mobile: hero stacks vertically, headings scale down with clamp(),
  SVG ornaments hidden on xs if they break layout,
  menu rows go single column, receipt form full width
  · Tablet: two-column menu
  · Desktop: full asymmetric layouts

The final result must feel like a creative agency spent 3 weeks on it.
Every heading is a piece of art. Every interaction has intention.
Zero template energy. This is Pizza Planet — cosmic, bold, and unforgettable.

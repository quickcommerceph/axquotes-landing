---
name: Axquotes
description: A clear market desk that turns global trading complexity into forward motion.
colors:
  ink: "#101119"
  ink-soft: "#22242e"
  paper: "#ffffff"
  mist: "#f3f4f6"
  mist-blue: "#e7f6fc"
  line: "#dedfe4"
  muted: "#626671"
  coral: "#ff455f"
  coral-action: "#d62d47"
  coral-dark: "#b9233a"
  blue: "#138fc4"
  blue-dark: "#0b5a89"
  indigo: "#28284e"
  green: "#11966b"
typography:
  display:
    fontFamily: "Sora Variable, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 5.6vw, 5.8rem)"
    fontWeight: 750
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Sora Variable, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.7rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Sora Variable, Arial, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  xs: "0.35rem"
  sm: "0.5rem"
  md: "0.8rem"
  lg: "1rem"
  device: "1.9rem"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  section: "clamp(5.5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.coral-action}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.55rem"
    height: "3.35rem"
  button-primary-hover:
    backgroundColor: "{colors.coral-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.55rem"
    height: "3.35rem"
  card-product:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "clamp(2rem, 4vw, 3.5rem)"
  card-editorial:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "2rem"
---

# Design System: Axquotes

## Overview

**Creative North Star: "The Clear Market Desk"**

Axquotes is precise, editorial, approachable, and product-led. It treats the page like a well-organized market desk: generous paper-white fields create room to understand the offer, while concentrated ink-black stages let the platform prove itself with real interface demonstrations. Electric blue makes data and focus legible; coral creates decisive moments of forward motion.

The system avoids interchangeable broker-card marketing. Breadth, tools, benefits, and education are presented as a paced story—understand the offer, see the platform, verify the evidence, then create an account—with interface imagery carrying more authority than decorative chrome.

**Key Characteristics:**

- Clean editorial fields interrupted by immersive product stages.
- Decisive Sora headlines paired with highly readable Manrope utility text.
- Electric blue for market information and focus; coral for conversion and momentum.
- Rounded, dimensional terminal compositions set against structurally flat content.
- Compact navigation, visible risk context, and repeated but controlled account actions.

## Colors

The palette moves between crisp paper, near-black product environments, electric market data, and warm coral action without losing professional restraint.

### Primary

- **Action Coral:** The conversion color for account creation, highlighted headline phrases, active market tabs, and sell-side cues. Its deeper action value is the accessible default; the brightest coral is used as expressive emphasis.
- **Electric Market Blue:** The information color for charts, selected data, platform controls, icons, and the global focus outline. Its darker shade carries blue text on pale-blue fields.

### Secondary

- **Desk Indigo:** A slightly chromatic dark surface available for product stages that need separation from the neutral ink terminals. The final account-creation panel sits on the same ink stage as the rest of the product-proof sections, with a coral-tinted ambient glow marking it as the page's decisive conversion moment.
- **Confirmed Green:** Positive movement, market-open state, confirmation, and assurance—not a competing brand accent.

### Neutral

- **Ink Black:** Primary text, navigation, trust strips, platform stages, and the strongest spatial anchors.
- **Soft Ink:** Secondary dark surfaces inside product demonstrations.
- **Paper White:** The default page field, reversed text, and high-contrast controls.
- **Editorial Mist:** Quiet section and card fill that separates content without adding chrome.
- **Blue Mist:** Calm educational and control surfaces that support blue data semantics.
- **Hairline Grey:** Dividers, quiet outlines, and content boundaries.
- **Market Grey:** Supporting copy and metadata on light fields.

### Named Rules

**The Coral Means Move Rule.** Reserve coral for conversion, active choice, and deliberate emphasis; it must never become a generic card-decoration color.

**The Blue Means Information Rule.** Use blue for data, platform state, links to market understanding, and focus—not as a second CTA color.

**The Stage-and-Field Rule.** Paper and mist carry explanation; ink and indigo carry demonstrations, proof, and commitment.

## Typography

**Display Font:** Sora Variable (with Arial and sans-serif fallbacks)  
**Body Font:** Manrope Variable (with Arial and sans-serif fallbacks)  
**Label Font:** Manrope Variable (with Arial and sans-serif fallbacks)

**Character:** Sora gives headlines the compressed confidence of a product studio without becoming financial-institutional. Manrope keeps navigation, explanation, data labels, and disclosure approachable at both editorial and utility sizes.

### Hierarchy

- **Display** (750, fluid hero scale, 0.96 line-height): Decisive first-view and final-conversion statements, usually capped near 10–11 characters per line.
- **Headline** (700, fluid section scale, 1 line-height): Section arguments and major product propositions with tightly balanced wrapping.
- **Title** (700, 1.7rem, 1.1 line-height): Benefit, education, and feature-card titles.
- **Body** (400, 1rem, 1.75 line-height): Editorial explanation; working measures stay near 29–38rem rather than stretching across the shell.
- **Label** (800, 0.78rem, 0.08em when uppercase): Tabs, links, categories, actions, and compact evidence labels.

### Named Rules

**The Two-Voice Rule.** Sora makes the argument; Manrope explains, labels, and enables the next action.

**The Tight Headline Rule.** Large Sora type uses negative tracking and near-solid leading; do not loosen it into generic marketing typography.

## Layout

The page uses a centered **1240px shell**. Desktop gutters are 1.5rem per side and contract to 1rem at the compact breakpoint. Section spacing is fluid from 5.5rem to 8.5rem, with compact screens settling at 5rem.

Primary compositions use a deliberate mix of focus and asymmetry: the hero is an immersive, centered video stage, while the market explorer remains a 0.9/1.1 narrative-to-instruments split and the platform section remains a 0.8/1.2 copy-to-product split. The system earns breadth through composed demonstrations, not uniform feature-card grids. One-rem gaps connect repeated cards; 3–6rem gaps separate arguments from product imagery.

Responsive behavior is defined at three breakpoints:

- **1120px:** Product demonstrations compress; secondary terminal detail is removed before the composition itself is abandoned.
- **920px:** Navigation becomes a full-screen mobile panel, major split layouts stack, trust and benefits move to two columns, and sticky copy becomes static.
- **680px:** Shell gutters tighten, actions become full-width, major layouts become single-column, terminal scenes crop intentionally, tabs scroll horizontally, footer groups become disclosures, and the sticky account CTA becomes available after the hero.

**The Demonstration Survives Rule.** At smaller widths, crop, simplify, and reframe the terminal before replacing it with generic illustration or hiding the product story.

## Elevation & Depth

The system is flat for reading and dimensional for product proof. Editorial sections separate through color fields, borders, and spacing. Shadows appear on layered terminals, phones, floating quotes, confirmations, sticky actions, and elevated primary CTAs; their role is structural and scene-building rather than decorative.

### Shadow Vocabulary

- **Action Lift** (`0 0.8rem 2rem rgba(185,35,58,0.22)`): Default coral CTA elevation.
- **Action Hover** (`0 1rem 2.5rem rgba(221,47,73,0.3)`): Stronger CTA response paired with a 2px rise.
- **Floating Proof** (`0.5rem 1.2rem 2.8rem rgba(16,17,25,0.14)`): Quote cards hovering around the hero terminal.
- **Product Stage** (`1rem 2.4rem 5.5rem rgba(15,17,24,0.24)`): Main terminal depth on light editorial fields.
- **Dark Product Stage** (`1rem 2.4rem 5rem rgba(0,0,0,0.34)`): Platform window depth inside the ink section.
- **Sticky Action** (`0.5rem 1rem 2.5rem rgba(16,17,25,0.28)`): Mobile CTA separation from page content.

**The Product Earns Depth Rule.** Keep prose and ordinary cards flat; reserve substantial shadows for controls that move and product layers that demonstrate.

## Shapes

The form language is softly technical. Major stages and editorial cards use a confident 1rem radius; nested rows and floating proof use 0.8rem; compact controls range from 0.35rem to 0.5rem. Buttons are fully pill-shaped, market symbols are circular, and the phone preview alone uses a pronounced device radius. Borders are quiet one-pixel dividers that organize dense product information.

**The Radius Hierarchy Rule.** Large scenes use 1rem, nested content uses 0.8rem, compact terminal controls use 0.35–0.5rem, and only actions or true circular indicators use the pill/circle extreme.

## Components

### Buttons

Actions are compact, tactile, and confident.

- **Shape:** Full pill with a 3.35rem minimum height and balanced 0.85rem/1.55rem padding.
- **Primary:** Deep coral with white, extra-bold Manrope, and an ambient coral shadow.
- **Hover / Focus:** Rise 2px over 220ms; deepen to coral-dark; move trailing arrows 3px. All keyboard focus uses a 3px blue outline offset by 4px.
- **Outline:** Paper-white with a quiet grey border that resolves to ink on hover.
- **White:** Paper-white on dark product stages, retaining ink text and the same movement grammar.

### Market Tabs

Tabs feel like product controls, not pills. They sit on an ink stage with muted labels, a two-pixel coral underline for selection, and horizontal scrolling at compact widths. Arrow keys, Home, and End move selection.

### Cards / Containers

- **Corner Style:** 1rem for major panels; 0.8rem for nested instrument and quote cards.
- **Background:** Paper/mist for editorial cards; ink, soft ink, and charcoal layering for product demonstrations.
- **Shadow Strategy:** Flat editorial cards; elevated terminal, device, quote, and confirmation layers.
- **Border:** One-pixel neutral dividers or low-contrast dark-stage separators.
- **Internal Padding:** Typically 2rem for editorial cards; responsive 2–4.5rem for composed product panels.

### Navigation

The warning strip and header form one persistent ink navigation system. Desktop labels are small, extra-bold Manrope with a coral underline that draws in over 220ms and remains visible for the active section. At 920px the links move into an ink full-screen editorial panel below the chrome, with large touch targets, anchored account actions, focus containment, Escape handling, and locked page scrolling. A pill-shaped language toggle (globe icon + code) sits ahead of Log in/Create account in both the desktop header and the mobile panel; it is visual only in this build, with no live translation behind it.

### Market Ticker

The ticker is a white, hairline-bounded strip of fixed-width market cells. It moves linearly over 36 seconds, pauses on hover or keyboard focus, and stops under reduced-motion preference.

### Product Demonstration

Terminal and platform previews are the signature component family. They combine dark nested surfaces, one-pixel grid lines, compact labels, blue chart strokes, coral/blue trade semantics, and restrained perspective. Floating quote, phone, and order-confirmation layers turn the interface into evidence without pretending to show live prices.

The platform section's chart lives inside a phone device frame (device radius, ink bezel, pill notch) rather than a browser window, carrying the same chart/order-filled evidence in a mobile-first frame. The final CTA section reuses that same phone frame on an ink stage with a coral ambient glow, pairing the account-summary demonstration (still a light "member area" screen inside the device, matching the platform section's screen treatment) directly against the account-creation copy — proof-by-demonstration on the same dark product stage as the rest of the terminal family.

### Hero Stage

The first viewport is a centered, full-bleed market video stage beneath the compact dark navigation. A deep ink scrim keeps the Sora headline, supporting copy, and actions legible across every frame; coral remains limited to the decisive headline phrase and primary action. The looping video is atmospheric rather than informational and starts paused for reduced-motion visitors.

### Sticky Mobile CTA

Below 680px, a compact ink tray enters after the hero has left the viewport and exits before the final join panel. It pairs a short assurance with a coral pill action and respects the device safe-area inset.

### Motion

State transitions use the expressive ease-out curve over 220ms; navigation and sticky entrances use 320ms. Movement is short and directional: buttons rise, arrows advance, list rows shift right, menus slide, and disclosures rotate. Under `prefers-reduced-motion: reduce`, animation and transition durations collapse to 0.01ms and the ticker no longer translates.

## Do's and Don'ts

### Do:

- **Do** build pages as a paced editorial story: offer, product proof, breadth and benefits, then account action.
- **Do** preserve the 1240px shell, asymmetric demonstration layouts, and generous section rhythm.
- **Do** keep a visible coral account action in decisive conversion moments, especially the first viewport.
- **Do** use real interface structure—charts, lists, tabs, order states—to explain the platform.
- **Do** maintain visible 3px blue focus outlines, keyboard-operable controls, risk disclosure, and reduced-motion behavior.
- **Do** simplify product scenes responsively while preserving their narrative role.

### Don't:

- **Don't** turn the page into a grid of interchangeable broker feature cards.
- **Don't** use coral and blue as interchangeable decoration; coral moves, blue informs.
- **Don't** spread heavy shadows across ordinary editorial content.
- **Don't** replace product demonstrations with abstract fintech gradients, stock traders, coins, or ornamental market imagery.
- **Don't** loosen Sora headlines, over-round nested controls, or promote every surface to a floating card.
- **Don't** present illustrative prices or interface values as live market data or performance claims.

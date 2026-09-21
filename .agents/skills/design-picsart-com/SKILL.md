---
name: design-picsart-com
description: Design system extracted from Picsart (https://picsart.com/ai-image-enhancer/?utm_source=microsoft_ads&utm_medium=cpc&utm_campaign=MSADS-PERF-WEB-US-ai-photo-editing-v2&utm_content=&utm_optimization=purchase&utm_user_type=new&utm_keyword=enhance%20photo&msclkid=eead250225991d3a54cc4fb322811d16). Use when building UI that should match this brand's visual identity.
triggers:
  - "Picsart"
  - "picsart-com"
  - "design like Picsart"
  - "Picsart風"
source: https://picsart.com/ai-image-enhancer/?utm_source=microsoft_ads&utm_medium=cpc&utm_campaign=MSADS-PERF-WEB-US-ai-photo-editing-v2&utm_content=&utm_optimization=purchase&utm_user_type=new&utm_keyword=enhance%20photo&msclkid=eead250225991d3a54cc4fb322811d16
extractedAt: 2026-09-21T10:29:55.609Z
tags: ["dark", "rounded", "accented", "sans-serif"]
---
# Design System Inspired by Picsart

> Auto-extracted from `https://picsart.com/ai-image-enhancer/?utm_source=microsoft_ads&utm_medium=cpc&utm_campaign=MSADS-PERF-WEB-US-ai-photo-editing-v2&utm_content=&utm_optimization=purchase&utm_user_type=new&utm_keyword=enhance%20photo&msclkid=eead250225991d3a54cc4fb322811d16` on 2026-09-21

## 1. Visual Theme & Atmosphere

High-contrast dark mode with vivid accents — feels modern, technical, and focused.

The hero section leads with "Free Photo Enhancer" followed by "Make photos clearer and sharper in just a click with AI-powered technology. The Picsart Photo Enhanc".

**Key Characteristics:**
- Mulish as the heading font
- Mulish as the body font for all running text
- Heading weight 600
- Dark background (#121212) as the primary canvas
- Primary accent `#ff47ff` used for CTAs and brand highlights
- 3 shadow level(s) detected — tinted shadows
- Rounded corners (12px+) creating a friendly, approachable feel
- Tags: dark, rounded, accented, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#ff47ff`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#ffc13c`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#121212`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#000000`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#ffffff`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#999999`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#d9d9d9`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#121212` | `--palette-1` | block | large | text-light |
| 2 | `#000000` | `--palette-2` | badge | large | text-light |
| 3 | `#bd99f8` | `--palette-3` | section | large | text-dark |
| 4 | `#ffffff` | `--palette-4` | badge | large | text-dark |
| 5 | `#d9d9d9` | `--palette-5` | block | large | text-dark |
| 6 | `#ff47ff` | `--palette-6` | button | large | text-dark |
| 7 | `#1c1c1c` | `--palette-7` | section | large | text-light |
| 8 | `#9e9eff` | `--palette-8` | text-accent | medium | text-dark |
| 9 | `#2a2a2a` | `--palette-9` | button | small | text-light |
| 10 | `#64ed68` | `--palette-10` | badge | small | text-dark |
| 11 | `#ffc13c` | `--palette-11` | badge | small | text-dark |
| 12 | `#5e3636` | `--palette-12` | text-accent | small | text-light |
| 13 | `#3c1b3c` | `--palette-13` | badge | small | text-light |

## 3. Typography Rules

- **Heading Font:** `Mulish`, sans-serif
- **Body Font:** `Mulish`, sans-serif

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | Mulish | 42px | 600 | 50px | normal |
| H2 | Acorn-Regular | 42px | 400 | 50px | normal |
| H3 | Mulish | 20px | 600 | 28px | normal |
| Body | Mulish | 20px | 500 | 28px | normal |
| Small | Mulish | 16px | 600 | 24px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `60px` | headings |
| H1 | `48px` | headings |
| H2 | `42px` | headings |
| H3 | `36px` | headings |
| H4 | `30px` | headings |
| Body L | `24px` | body / supporting text |
| Body | `20px` | body / supporting text |
| Small | `18px` | body / supporting text |
| XS | `16px` | body / supporting text |
| Caption | `14px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: #ff47ff;
  color: #000000;
  border-radius: 20px;
  padding: 10px 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #ff47ff;
  color: #ffffff;
  border-radius: 0px;
  padding: 8px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #ffffff;
  border-radius: 0px;
  padding: 0px 0px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Filled Button 2

```css
.btn-filled-2 {
  background: #000000;
  color: #ffffff;
  border-radius: 16px;
  padding: 6px 6px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
```

### Ghost Button 2

```css
.btn-ghost-2 {
  background: transparent;
  color: #ffffff;
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 13.3333px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Filled Button 3

```css
.btn-filled-3 {
  background: #121212;
  color: #ffffff;
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Card

```css
.card {
  background: #bd99f8;
  border-radius: 16px;
  padding: 2px;
}
```

## 5. Layout Principles

- **Base spacing unit:** `10px` — use multiples (20px, 30px, 40px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `10px` | element |
| spacing-2 | `6px` | element |
| spacing-3 | `24px` | card |
| spacing-4 | `4px` | element |
| spacing-5 | `12px` | element |
| spacing-6 | `40px` | card |
| spacing-7 | `64px` | section |
| spacing-8 | `2px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-button | `12px` | button |
| radius-button | `8px` | button |
| radius-card | `16px` | card |
| radius-card | `24px` | card |
| radius-card | `20px` | card |
| radius-subtle | `4px` | subtle |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0...` | Cards, subtle elevation |
| High | `rgba(0, 0, 0, 0.24) 0px 0px 16px 0px` | Modals, floating elements |


## 7. Do's and Don'ts

### Do
- Use `#121212` as the primary background color
- Use `Mulish` for all headings and `Mulish` for body text
- Use `#ff47ff` as the single dominant accent/CTA color
- Maintain `10px` as the base spacing unit — all gaps should be multiples
- Keep the overall feel dark — use dark surfaces throughout
- Use rounded corners (`12px`+) consistently for all interactive elements
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 600 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute Mulish/Mulish with generic alternatives
- Don't use irregular spacing — stick to 10px grid
- Don't introduce bright white surfaces — they break the dark palette
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#ffffff` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 10px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #121212
Text:        #ffffff
Accent:      #ff47ff
Secondary:   #ffc13c
Border:      #d9d9d9
```

### Example Prompts

1. "Build a hero section with a `#121212` background, `Mulish` heading in `#ffffff`, and a `#ff47ff` CTA button with 20px radius."
2. "Create a pricing card using background `#000000`, border `#d9d9d9`, `Mulish` for text, and 30px padding."
3. "Design a navigation bar — `#121212` background, `#ffffff` links, `#ff47ff` for active state."
4. "Build a feature grid with 3 columns, 30px gap, each card using the card component style."
5. "Create a footer with `#000000` background, `#ffffff` text, and 20px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct

## 10. CSS Custom Properties

> 115 custom properties extracted from `:root` / `html` stylesheets.

### Color Variables

| Variable | Value |
|---|---|
| `--shadow-custom` | `0 4px 12px #00000029` |
| `--background` | `#fff` |
| `--white-background-dark` | `#fff` |
| `--background-white-for-black` | `#000` |
| `--homepage-background` | `#000` |
| `--foreground` | `#000` |
| `--text-foreground` | `#fffcf8` |
| `--text-muted` | `#000` |
| `--text-muted-dark` | `#000` |
| `--text-dark-text` | `#fff` |
| `--price-button-pro` | `#000` |
| `--price-button` | `#000c` |
| `--text-paragraph` | `#d3c9bb` |
| `--other-white` | `#f7f2ea` |
| `--text-white-for-black` | `#000` |
| `--other-black` | `#141414` |
| `--accent-pink` | `#f40bf4` |
| `--hover-accent-pink` | `#920792` |
| `--white-border` | `#fff` |
| `--muave` | `#a78b8b` |
| `--dropdown-menu` | `#fff` |
| `--dropdown-menu-dark` | `#121212` |
| `--item-dropdown-menu` | `#525252` |
| `--item-dropdown-menu-dark` | `#ccc` |
| `--hover-item-dropdown-menu` | `#f2f2f2` |
| `--hover-item-dropdown-menu-dark` | `#212121` |
| `--footer-hover-primary` | `#c209c1` |
| `--hover-primary` | `#740574` |
| `--bg-footer-icon` | `#f2f2f2` |
| `--bg-footer-icon-dark` | `#2f2f2f` |
| ... | *(65 more)* |

### Spacing Variables

| Variable | Value |
|---|---|
| `--radius` | `8px` |
| `--radius-button` | `24px` |

### Typography Variables

| Variable | Value |
|---|---|
| `--fonts-gilroy` | `Gilroy-Fonts, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, Helvetica, Arial, sans-serif` |
| `--font-size` | `16px` |
| `--font-family` | `"Mulish", "Picsart-Fonts", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--font-acorn` | `"Acorn-Regular", "Picsart-Fonts", sans-serif` |
| `--fonts-acorn` | `var(--font-acorn)` |
| `--font-weight-medium` | `500` |
| `--font-weight-normal` | `400` |
| `--font-weight-semibold` | `600` |
| `--text-h1` | `60px` |
| `--text-h2` | `36px` |
| `--text-h3` | `24px` |
| `--text-h4` | `20px` |
| `--text-base` | `16px` |
| `--text-sm` | `14px` |
| `--text-xs` | `12px` |
| `--text-2xs` | `10px` |
| `--text-3xs` | `8px` |

### Other Variables

| Variable | Value |
|---|---|
| `--lightningcss-dark` | `initial` |

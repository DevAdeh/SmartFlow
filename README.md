# SmartFlow — Section Handoff (Person 1: Header, Hero, Trust bar)

This folder contains the Header, Hero, and Trust bar sections of the SmartFlow landing page, built by DevAdeh. Add your section's HTML below the marked comment in `index.html`, and your CSS below the marked comment in `styles.css` — then forward the whole folder to the next person.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | Header + Hero + Trust bar markup. Your section goes below the `<!-- Teammates: add your sections below this line -->` comment. |
| `styles.css` | Shared design tokens (`:root`) + all styling for the sections above. Add your section's CSS below the marked comment at the bottom. |
| `script.js` | Shared JS file. Currently has the mobile menu toggle. Add your section's JS (FAQ accordion, modals, etc.) below the marked comment. |
| `assets/favicon.ico` / `assets/apple-touch-icon.png` | Browser tab icon and iOS home-screen icon, generated from the SmartFlow logo. Already linked in `index.html` — no action needed. |
| `assets/smartflow-icon.png` | The logo icon used in the header, next to the hamburger menu. |
| `assets/heroimage.png` | Photo used in the Hero visual panel. |

All images live in the `assets/` folder — if you add your own images for your section, put them in `assets/` too and reference them as `assets/yourfile.png`, so everything stays organized in one place.

## Design tokens — reuse these, don't add new colors/fonts

The team lead finalized the brand palette. Pull colors and fonts from the CSS variables at the top of `styles.css` — don't hardcode new hex values or bring in other fonts:

```css
--ink: #0F2A2A;      /* Deep Lagoon */
--teal: #00BFA6;      /* Teal Wave */
--mint: #D9FAF4;      /* Aqua Silk */
--font-display: 'Bricolage Grotesque', sans-serif;
--font-body: 'Inter', sans-serif;
```
Only these two fonts are approved — no other typefaces (including monospace).

## Content decisions to stay consistent with

- **Currency:** Naira (₦), not dollars
- **Tagline:** "Your money, one centre." (already set as the Hero `<h1>`)
- **Nav pattern:** hamburger button sits to the *left* of the logo (mobile view), not the right

## How to add your section

1. Open `index.html`, find the `<!-- Teammates: add your sections below this line -->` comment, and add your section's markup right after it (before `<script src="script.js">`).
2. Open `styles.css`, scroll to the matching comment at the bottom, and add your section's CSS there.
3. If your section needs JS (like an accordion or a modal), add it to `script.js` below its own marked comment — keep everything in this one shared file rather than creating a second script file.
4. Test the whole page in a browser before forwarding — check that nothing you added conflicts with what's already there (reuse class name patterns like `.featurecard`, `.faqitem` etc. if it helps keep things consistent).
5. Zip the whole folder (all files, including the images) and forward it to the next person, or back to DevAdeh for final deployment.

## Still to decide as a team

- Bootstrap and Vercel deployment — not yet integrated, to be discussed
- Git/GitHub workflow for actual collaboration (branches, PRs) 

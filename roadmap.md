# 🛠️ Action Plan: PRD v1.1 Implementation
## Target: Align "Revelaciones del Diablo" with Satirical, Bilingual (EN + LatAm ES) Vision

**Date:** August 28, 2026  
**Goal:** Refactor existing MVP to match the new PRD v1.1 without breaking core functionality.

---

## Phase 0: Content & Copy Overhaul (Critical Path)
*Priority: HIGH | Effort: Medium*

- [ ] **0.1 Define Satirical Voice Guidelines**
  - Create a `CONTENT_GUIDELINES.md` file.
  - Explicitly ban horror/demonic references in copy. Replace with witty/sarcastic language.
  - Define "The Devil" persona: Sarcastic, intellectual, distant (uses formal "usted" in ES).
- [ ] **0.2 Curate Bilingual Copy (EN + ES-LatAm)**
  - Translate all UI labels using neutral LatAm Spanish. 
  - **Key terms:** 
    - `Open Today's Edition` -> `Unveil today's truth` / `Revela la verdad de hoy`
    - `Save` -> `This one stung` / `Esta me llegó`
    - `Favorites` -> `My Cynicism` / `Mi Cinismo`
    - `Stats` -> `Mirror` / `Espejo`
    - `Share` -> `Publish this truth` / `Publica esta verdad`
  - Create 15 unique responses for "The Devil's Advocate" feature in both languages.

---

## Phase 1: UX & Interaction Fixes (Landing & Preview)
*Priority: HIGH | Effort: Medium*

- [ ] **1.1 Implement "Blur Preview" on Landing**
  - Modify the Home/Today component.
  - Render the daily truth text with `filter: blur(8px)` initially.
  - Add a clickable overlay/CTA button (e.g., "Unveil today's truth").
  - On click, animate the blur removal (`blur(0px)`) over 0.5s.
- [ ] **1.2 Update Primary CTA Copy**
  - Replace "OPEN TODAY'S EDITION →" with the new emotional CTA based on active language.
  - Ensure the date and edition number (Edición #47 · 28 de agosto 2026) are prominently displayed above the preview.

---

## Phase 2: Architectural Renaming & Navigation
*Priority: HIGH | Effort: Low (Refactoring)*

- [ ] **2.1 Rename Routes & Components**
  - `/favorites` -> `/my-cynicism`
  - `/stats` -> `/mirror`
  - `/library` -> `/archive`
  - `/share` -> `/publish`
  - Update all internal imports and router paths accordingly.
- [ ] **2.2 Implement Language Selector**
  - Add an `EN | ES` toggle in the top-right corner.
  - Save preference to `localStorage`.
  - Implement browser language detection (`navigator.language`).
  - Load all UI strings from a centralized JSON/i18n file.

---

## Phase 3: New Features Implementation
*Priority: MEDIUM (for v1.1) | Effort: High*

- [ ] **3.1 Build "Surprise Me" Feature**
  - Add a small "🎲 Surprise Me" button next to the daily navigation.
  - Create an algorithm to fetch a random revelation `revelations[Math.floor(Math.random() * 365)]`.
  - Ensure it is not the same as the current daily revelation.
  - Reuse the same detail component for rendering.
- [ ] **3.2 Build "The Devil's Advocate" Modal**
  - Trigger: After user clicks "This one stung / Esta me llegó".
  - Render a small popup with a text input and a "Submit" button.
  - On submit, randomly select one of the 15 pre-written sarcastic responses.
  - Display the response with a typing animation (optional).
  - Allow closing the modal.

---

## Phase 4: Design System Overhaul (Editorial Brutalist)
*Priority: MEDIUM | Effort: High (UI Polish)*

- [ ] **4.1 Remove Generic UI Elements**
  - Scan the app for Glassmorphism, generic Cards, and Sidebar+Topbar patterns. Remove them.
  - Replace standard cards with typographic compositions (large numbers, heavy rules, stark layouts).
- [ ] **4.2 Implement "Sting Red" Accent**
  - Define `--color-sting: #E11D48`.
  - Use this exclusively for interactive elements (Save button, active states, decorative lines).
- [ ] **4.3 Redesign Key Screens**
  - **Today:** Center typography, asymmetric placement of the GIF (smaller, cropped, acting as a footnote).
  - **Archive:** Move away from a card grid. Implement a minimalist, dense list view (like a dictionary index).
  - **My Cynicism:** Focus on the collected "stamps" or a clean text-based list of saved truths.

---

## Phase 5: Localization & QA (LatAm Focus)
*Priority: HIGH | Effort: Medium*

- [ ] **5.1 Linguistic QA**
  - Have a native LatAm Spanish speaker (preferably from Mexico, Colombia, or Argentina) review all ES translations.
  - Specifically check for Spain-specific slang and replace them (e.g., ensure "vosotros" is never used).
- [ ] **5.2 Tone Consistency Check**
  - Verify that the "Devil" persona remains sarcastic and intellectual in the Spanish version, not accidentally becoming dramatic or horror-like.

---

## Phase 6: Testing & Deployment
*Priority: HIGH | Effort: Low*

- [ ] **6.1 Edge Cases**
  - Test the "Blur Preview" on mobile viewports.
  - Ensure "The Devil's Advocate" modal works offline (local storage).
  - Test language switching mid-session.
- [ ] **6.2 Deploy to Vercel**
  - Run `npm run build` and ensure no breaking changes.
  - Deploy the updated PRD v1.1 to production.

---

## 📅 Suggested Sprint Timeline
- **Day 1-2:** Phase 0 & Phase 1 (Copy + Preview).
- **Day 3-4:** Phase 2 & Phase 3 (Architecture + Devil's Advocate).
- **Day 5-6:** Phase 4 (Design polish).
- **Day 7:** Phase 5 & 6 (QA + Deploy).

---

**Ready for implementation.** Hand over to Claude (or development team) to execute tasks sequentially starting from Phase 0.
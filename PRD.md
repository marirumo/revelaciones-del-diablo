# 📋 Product Requirements Document (PRD) - v1.1
## Revelaciones del Diablo (Devil's Revelations)
### A Daily Satirical App inspired by Ambrose Bierce

**Version:** 1.1 (Revised)  
**Date:** August 28, 2026  
**Status:** MVP Scope Redefined

---

## 📌 Table of Contents
1. [Vision & Product Philosophy](#vision--product-philosophy)
2. [Tone & Voice](#tone--voice)
3. [Language Strategy](#language-strategy)
4. [Objectives](#objectives)
5. [Target Audience](#target-audience)
6. [Core Architecture: The 7 Pillars](#core-architecture-the-7-pillars)
7. [Detailed Functional Requirements](#detailed-functional-requirements)
8. [Design Strategy (Editorial Brutalist)](#design-strategy-editorial-brutalist)
9. [Tech Stack](#tech-stack)
10. [Success Metrics](#success-metrics)

---

## 🎯 Vision & Product Philosophy
**Revelaciones del Diablo** is not a horror experience. It is a daily intellectual ritual. 

The product acts as a cynical, satirical companion that delivers one uncomfortable truth per day. Instead of relying on demonic tropes, it leverages wit, irony, and cultural critique—channeling the spirit of Ambrose Bierce. 

The experience is organized around three core behaviors:
1. **Ritual** (returning daily for a new truth).
2. **Exploration** (discovering the full archive of cynicism).
3. **Collection** (building a personal library of stinging truths).

---

## 🎭 Tone & Voice (The Satirical Devil)
**Defining Rule:** The "Devil" here is an intellectual, sarcastic academic, not a terrifying entity. 

- **Vibe:** Witty, cultured, cynical, and superior in a humorous way.
- **Personality:** Think of a disillusioned professor who enjoys pointing out society's absurdities with a smirk.
- **What it is NOT:** No horror sounds, no gore, no aggressive demonic imagery. It is sophisticated and literary.

---

## 🌍 Language Strategy
- **Primary Language:** English (Neutral, US Standard).
- **Secondary Language:** Spanish (Neutral **LatAm** - specifically avoiding Spain-specific terms like "vosotros", "vale", "ordenador", "coger" for "take"). Use "usted" or impersonal constructions to keep a formal/sarcastic distance.
- **Implementation:** Toggle EN/ES in the top right corner. Default detection based on browser `navigator.language` (if `es-*`, default to ES-LatAm; else EN).

---

## 🎯 Objectives
- Deliver a **daily ritual** with a clear preview to reduce bounce rate.
- Achieve **>80% weekly retention** by turning reading into a "streak" habit.
- Build a fully bilingual (EN + ES-LatAm) experience from Day 1.
- Maintain an **Editorial, premium feel** (not a generic SaaS dashboard).

---

## 👥 Target Audience
- **Primary:** "The Intelligent Cynics" (18-45, educated, active on social media, enjoy satire).
- **Secondary:** Literary enthusiasts and fans of classic satire.

---

## 🧭 Core Architecture: The 7 Pillars
The product is re-conceptualized around these 7 core experiences:

| Pillar | Old Concept | New Concept | Emotional Goal |
| :--- | :--- | :--- | :--- |
| **1. Today** | Home Screen | **Daily Ritual** | "I came here today." |
| **2. Surprise Me** | (None) | **Serendipity** | "Show me something random." |
| **3. Archive** | Library | **The Index of Defeats** | "The full corpus of cynicism." |
| **4. Subjects** | Categories | **Subjects** | "What are we cynical about?" |
| **5. My Cynicism** | Favorites | **Personal Collection** | "This is my collection of uncomfortable truths." |
| **6. Mirror** | Stats | **Mirror** | "What does my collection say about me?" |
| **7. Publish this truth** | Share | **Social Artifact** | "I am sharing a piece of cynicism." |

**New Feature (Not in v1.0 but added to spec):**
- **8. The Devil's Advocate:** A light modal that appears after saving a truth, allowing users to "argue" with the Devil. The Devil responds with a pre-written, sarcastic retort to their opinion.

---

## 📝 Detailed Functional Requirements

### 1. Today (Daily Ritual)
- **Preview:** The landing page shows the beginning of the daily truth with a **subtle blur effect**. User must click "Unveil today's truth" (or similar) to read the full text. This reduces bounce rate and creates anticipation.
- **Visuals:** Large typography for the "Word", italicized definition, and a satirical commentary.
- **GIF:** A satirical or ironic GIF (e.g., a rolling eye, a sarcastic character from a classic film) acting as a visual counterpoint. No gore.
- **Ritual Elements:** Show "Edition #47 · August 28, 2026". Display a subtle reading streak (e.g., "3-day streak").
- **Navigation:** Simple arrows to go to Yesterday / Tomorrow (preview lock for future).

### 2. Surprise Me
- A secondary button on the Today screen.
- Fetches a random truth from the 365 corpus.
- Must avoid repeating the immediately previous random truth.
- Allows saving and sharing directly from the result.

### 3. Archive (The Index of Defeats)
- Renamed from "Library" to reflect the satirical tone.
- Features: Instant search (debounce 300ms), filtering by Subjects, sorting (Alphabetical, Newest).
- Displays `N/365` progress.
- *Future concept:* "The Devil's Index" – a visual, editorial representation of the 365 entries (e.g., a numbered list or a typographic poster).

### 4. Subjects (Categories)
- 8 subjects: Success, Love, Money, Power, Relationships, Philosophy, Politics, Society.
- Each subject page shows its entries with a count.

### 5. My Cynicism (Personal Collection)
- Renamed from "Favorites".
- When a user saves a truth, the feedback is a "red ink stamp" animation (like a library seal) rather than a fire animation.
- **Copy Change:** "Save" -> "This one stung" (EN) / "Esta me llegó" (ES-LatAm).
- Features: Sort by date saved, subject, or alphabetically. Offline-first + Cloud sync.

### 6. Mirror (Stats)
- Renamed from "Stats".
- Translates raw data into interpretable, slightly sarcastic observations.
- *Example:* "You seem particularly skeptical about **Money**. 38% of your saved truths target capitalism."
- Shows: Total saved, dominant subject, streak, last saved truth.

### 7. Publish this truth (Sharing)
- Renamed from "Share".
- Generate a visually distinct social card (containing the word, definition, and a snippet of commentary) optimized for WhatsApp, Instagram, and X.
- Includes a direct link back to the specific revelation.

### 8. The Devil's Advocate (New Interaction)
- **Trigger:** Appears after a user saves a truth.
- **UX:** "Do you want to argue with the Devil?" (EN) / "¿Quieres discutir con el Diablo?" (ES-LatAm).
- **Interaction:** A small text input where the user types their opinion.
- **Response:** The Devil replies with one of 10-15 pre-generated sarcastic, witty responses (curated for both EN and ES-LatAm).
- **Goal:** Increases session time, creates a unique "wow" factor, and encourages deeper engagement.

---

## 🎨 Design Strategy (Editorial Brutalist)
To avoid looking like a generic web app, we must adhere to these rules:

### The "Gate" Rule
- **Do NOT** build a standard Dashboard (Sidebar + Topbar + Card Grid).
- **Do NOT** use Glassmorphism or generic gradients as primary design elements.
- **Do NOT** sacrifice typography for decorative fluff.

### The Direction
- **Typographic-Heavy:** Dominant, expressive typography.
- **Asymmetric Composition:** Play with grid layouts, large numbers, and stark rules.
- **High Contrast:** Black, White, and a single "Sting" Red (#E11D48).
- **Editorial Feel:** It should feel like a contemporary literary magazine or a high-end print publication, not a software interface.

### Design Order (Phases)
1. **Today** (The core ritual).
2. **Revelation Detail** (The full view).
3. **Publish Artifact** (The social card).
4. **Archive & The Devil's Index**.
5. **My Cynicism & Mirror**.

---

## ⚙️ Tech Stack
- **Frontend:** React 19 + Vite 8, Tailwind CSS 4.
- **Backend:** Firebase Auth (Google + Email), Firestore.
- **Storage:** IndexedDB (offline-first) + Firebase Sync.
- **PWA:** Fully installable with Service Worker.
- **API:** Giphy API (Satirical GIFs only).

---

## ✅ Success Metrics (Updated)
- Bounce Rate on Landing < 40% (via blur preview).
- >20% of users interact with "The Devil's Advocate".
- 90% of users correctly identify the tone as "satirical" (via post-launch survey).
- Zero horror/demonic aesthetic complaints.

---

## 🌍 Localization Notes (Critical)
- **Translators must be LatAm natives.** 
- **Forbidden ES-ES words:** *vale, tío, guay, ordenador, coger (in "take" context), vosotros.*
- **Allowed:** *usted, computadora, tomar, ustedes.*
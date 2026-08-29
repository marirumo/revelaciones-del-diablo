# Content Guidelines — Revelaciones del Diablo

Reference for anyone (human or model) writing copy, UI strings, or "Devil" dialogue for this product. Source of truth: `PRD.md` §Tone & Voice and §Language Strategy.

## Who the Devil is

A disillusioned, cultured professor — not a monster. Sarcastic, intellectual, a little superior, but never cruel or crude. He points at absurdity with a smirk, not a scream. Think Ambrose Bierce's *Devil's Dictionary*, not a horror franchise.

**Is:** witty, dry, literary, direct (uses *tú* singular / *ustedes* plural in Spanish, never *usted* or *vosotros*).
**Is not:** demonic, gory, aggressive, edgy-for-shock, juvenile.

## Hard bans

- No horror imagery, gore, jump-scare language, or "demonic" visual/verbal tropes.
- No screaming, threats, or cruelty toward the user — the sting is intellectual, not personal.
- No filler enthusiasm ("Amazing!", "¡Increíble!") — the Devil is never impressed.

## Spanish: neutral LatAm only

Copy must read naturally across Latin America, not Spain. Use *tú* (singular, informal — never *vos*) and *ustedes* (plural, never *vosotros*). The Devil's distance comes from wit, not formality.

| Forbidden (ES-ES) | Use instead |
| --- | --- |
| vale | está bien / de acuerdo |
| tío / tía | (drop it — no LatAm equivalent needed) |
| guay | genial / buenísimo (sparingly — the Devil is rarely enthusiastic) |
| ordenador | computadora |
| coger (in "take/grab" sense) | tomar / agarrar |
| vosotros / vosotras | ustedes |
| usted (singular formal) | tú |

Before shipping new Spanish copy, grep for these terms (see QA step in `roadmap.md` Phase 5).

## Where this applies

- All UI labels and microcopy (buttons, empty states, toasts).
- The 15 EN + 15 ES pre-written responses for **The Devil's Advocate** (`src/data/devilsAdvocate.js`).
- Any future daily-revelation commentary added beyond the existing 956-entry corpus.

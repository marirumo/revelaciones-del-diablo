// Analytics (PRD §30) — minimal, vendor-agnostic event bus. Never blocks
// the UI and never throws. Wire a real provider (GA4, Plausible, PostHog…)
// by listening for the 'revelaciones:track' event on window, or by
// swapping the sink below — call sites never need to change.
const KNOWN_EVENTS = [
  'revelation_viewed',
  'revelation_saved',
  'revelation_unsaved',
  'revelation_shared',
  'surprise_me_used',
  'subject_opened',
  'archive_searched',
  'mirror_opened',
  'devils_advocate_opened',
  'devils_advocate_submitted',
  'social_card_generated',
  'language_changed',
  'install_prompt_shown',
  'pwa_installed',
];

export const track = (event, params = {}) => {
  if (import.meta.env?.DEV) {
    if (!KNOWN_EVENTS.includes(event)) {
      console.warn(`[analytics] unknown event "${event}" — add it to KNOWN_EVENTS in analytics.js`);
    }
    console.debug(`[analytics] ${event}`, params);
  }

  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('revelaciones:track', { detail: { event, params, ts: Date.now() } }));
};

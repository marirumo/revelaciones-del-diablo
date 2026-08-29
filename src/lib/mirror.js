// Mirror (PRD §13) — regla dura: nunca mostrar solamente una métrica. Cada
// dato relevante se traduce en una observación editorial ("The Devil's
// Conclusion"), no en un dashboard.
import { categoryName } from '../data/revelations';

export const buildConclusion = (categoryCounts = {}, lang = 'en') => {
  const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return '';

  const dominant = categoryName(entries[0][0], lang).toLowerCase();

  if (entries.length === 1) {
    return lang === 'es'
      ? `Todo lo que ha guardado hasta ahora tiene que ver con ${dominant}. Curioso.`
      : `Everything you've saved so far is about ${dominant}. Curious.`;
  }

  const gentlest = categoryName(entries[entries.length - 1][0], lang).toLowerCase();

  return lang === 'es'
    ? `Desconfía de ${dominant}, pero se mantiene extrañamente en paz con ${gentlest}. Curioso.`
    : `You distrust ${dominant}, but remain strangely at peace with ${gentlest}. Curious.`;
};

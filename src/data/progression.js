// Progression (PRD §19) — cuántas revelaciones ha guardado el usuario se
// traduce en un título editorial, no en una insignia. Determinístico.
export const ranks = {
  en: [
    { min: 0, label: 'Newcomer' },
    { min: 10, label: 'Curious' },
    { min: 25, label: 'Suspicious' },
    { min: 50, label: 'Cynic' },
    { min: 100, label: 'Professional' },
    { min: 250, label: 'Beyond Saving' },
    { min: 365, label: "Devil's Associate" },
  ],
  es: [
    { min: 0, label: 'Recién Llegado' },
    { min: 10, label: 'Curioso' },
    { min: 25, label: 'Suspicaz' },
    { min: 50, label: 'Cínico' },
    { min: 100, label: 'Profesional' },
    { min: 250, label: 'Sin Remedio' },
    { min: 365, label: 'Socio del Diablo' },
  ],
};

export const getRank = (count, lang = 'en') => {
  const list = ranks[lang] || ranks.en;
  let current = list[0];
  for (const tier of list) {
    if (count >= tier.min) current = tier;
  }
  return current.label;
};

export const getNextRank = (count, lang = 'en') => {
  const list = ranks[lang] || ranks.en;
  return list.find(tier => tier.min > count) || null;
};

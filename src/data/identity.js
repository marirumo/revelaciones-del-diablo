// Identity layer (PRD §14) — un arquetipo editorial derivado del subject
// dominante en la colección guardada del usuario. Determinístico, sin IA.
const ARCHETYPES = {
  éxito: {
    en: { name: 'The Ambitious Pessimist', diagnosis: 'You climbed the ladder in theory, distrusted it in practice, and kept saving proof you were right to.' },
    es: { name: 'El Pesimista Ambicioso', diagnosis: 'Subiste la escalera en teoría, desconfiaste de ella en la práctica, y seguiste guardando pruebas de que tenías razón.' },
  },
  amor: {
    en: { name: 'The Skeptical Romantic', diagnosis: 'You distrust love, marriage, and most promises — and keep reading about them anyway.' },
    es: { name: 'El Romántico Escéptico', diagnosis: 'Desconfías del amor, del matrimonio y de casi toda promesa — y aun así sigues leyendo sobre ellos.' },
  },
  dinero: {
    en: { name: 'The Capitalist Survivor', diagnosis: 'You know exactly what money does to people. You collected the evidence anyway.' },
    es: { name: 'El Sobreviviente Capitalista', diagnosis: 'Sabes exactamente lo que el dinero le hace a la gente. Aun así, coleccionaste la evidencia.' },
  },
  poder: {
    en: { name: 'The Professional Cynic', diagnosis: 'Authority has never impressed you. You just enjoy watching it explain itself.' },
    es: { name: 'El Cínico Profesional', diagnosis: 'La autoridad nunca te ha impresionado. Solo disfrutas viéndola explicarse.' },
  },
  relaciones: {
    en: { name: 'The Humanist, Unfortunately', diagnosis: 'You keep forgiving people you have every reason not to. Diagnosis: contradictory. Therefore human.' },
    es: { name: 'El Humanista, Lamentablemente', diagnosis: 'Sigues perdonando a gente que tiene todas las razones para no perdonar. Diagnóstico: contradictorio. Por lo tanto, humano.' },
  },
  filosofía: {
    en: { name: 'The Reluctant Philosopher', diagnosis: 'You went looking for meaning and settled for good sentences instead.' },
    es: { name: 'El Filósofo a tu Pesar', diagnosis: 'Saliste a buscar sentido y te conformaste con buenas frases.' },
  },
  política: {
    en: { name: 'The Disillusioned Citizen', diagnosis: 'You stopped expecting better from power. You did not stop paying attention.' },
    es: { name: 'El Ciudadano Desengañado', diagnosis: 'Dejaste de esperar algo mejor del poder. No dejaste de prestar atención.' },
  },
  sociedad: {
    en: { name: 'The Weary Observer', diagnosis: 'You find humanity exhausting, collectively and in most of its individual members.' },
    es: { name: 'El Observador Fatigado', diagnosis: 'Encuentras agotadora a la humanidad, en conjunto y en la mayoría de sus miembros individuales.' },
  },
};

const FALLBACK = {
  en: { name: 'The Undiagnosed', diagnosis: 'Your collection is too evenly cynical to pin down. That may be the most honest result of all.' },
  es: { name: 'El No Diagnosticado', diagnosis: 'Tu colección es demasiado uniformemente cínica como para clasificarla. Puede que ese sea el resultado más honesto de todos.' },
};

// Umbral mínimo de revelaciones guardadas antes de arriesgar un diagnóstico.
export const IDENTITY_MIN_SAVED = 5;

export const getIdentity = (categoryCounts = {}, totalSaved = 0, lang = 'en') => {
  if (totalSaved < IDENTITY_MIN_SAVED) return null;

  const entries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;

  const [topCategory, topCount] = entries[0];
  const runnerUp = entries[1];

  // Empate en el primer lugar: la colección no se decide por un solo vicio.
  if (runnerUp && runnerUp[1] === topCount) {
    return FALLBACK[lang] || FALLBACK.en;
  }

  const archetype = ARCHETYPES[topCategory];
  return archetype?.[lang] || archetype?.en || FALLBACK[lang] || FALLBACK.en;
};

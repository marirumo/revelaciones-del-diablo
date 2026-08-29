// Revelaciones del Diablo - Banco de 956 definiciones satíricas
//
// Contenido real del Diccionario del Diablo de Ambrose Bierce (dominio
// público), ES/EN, con categoría y "revelación" moderna generadas por
// scripts/generate-revelations.mjs. Para regenerar: node scripts/generate-revelations.mjs

import generated from './revelations.generated.json';

export const allRevelations = generated;

// Organizar por categoría
export const revelationsByCategory = {
  éxito: allRevelations.filter(r => r.category === "éxito"),
  amor: allRevelations.filter(r => r.category === "amor"),
  dinero: allRevelations.filter(r => r.category === "dinero"),
  poder: allRevelations.filter(r => r.category === "poder"),
  relaciones: allRevelations.filter(r => r.category === "relaciones"),
  filosofía: allRevelations.filter(r => r.category === "filosofía"),
  política: allRevelations.filter(r => r.category === "política"),
  sociedad: allRevelations.filter(r => r.category === "sociedad"),
};

// Subjects (PRD §11) — cada uno lleva una descripción editorial breve,
// no una definición de diccionario. Nunca traducción literal entre ES/EN.
export const categories = [
  { id: "éxito", emoji: "⚡", name: "Éxito", nameEN: "Success", count: revelationsByCategory.éxito.length,
    descriptionES: "Ambición, logros y el descubrimiento de que la escalera nunca valió la pena.",
    descriptionEN: "Ambition, achievement, and the discovery that the ladder was never worth climbing." },
  { id: "amor", emoji: "💔", name: "Amor", nameEN: "Love", count: revelationsByCategory.amor.length,
    descriptionES: "Promesas, deseo, matrimonio, soledad y otros errores recurrentes.",
    descriptionEN: "Promises, desire, marriage, loneliness and other recurring mistakes." },
  { id: "dinero", emoji: "💰", name: "Dinero", nameEN: "Money", count: revelationsByCategory.dinero.length,
    descriptionES: "Codicia, deudas, generosidad y la gimnasia moral necesaria para justificar las tres.",
    descriptionEN: "Greed, debt, generosity and the moral gymnastics required to justify all three." },
  { id: "poder", emoji: "👑", name: "Poder", nameEN: "Power", count: revelationsByCategory.poder.length,
    descriptionES: "Autoridad, control y la ilusión halagadora de haberlos merecido.",
    descriptionEN: "Authority, control, and the flattering delusion that it was earned." },
  { id: "relaciones", emoji: "🤝", name: "Relaciones", nameEN: "Relationships", count: revelationsByCategory.relaciones.length,
    descriptionES: "Amistad, familia, traición y todos a quienes sigue perdonando.",
    descriptionEN: "Friendship, family, betrayal and everyone you keep forgiving." },
  { id: "filosofía", emoji: "🧠", name: "Filosofía", nameEN: "Philosophy", count: revelationsByCategory.filosofía.length,
    descriptionES: "Verdad, sentido y el consuelo de fingir haber encontrado alguno de los dos.",
    descriptionEN: "Truth, meaning, and the comfort of pretending to have found either." },
  { id: "política", emoji: "🗳️", name: "Política", nameEN: "Politics", count: revelationsByCategory.política.length,
    descriptionES: "El poder disfrazado de servicio, y los ciudadanos que siguen aplaudiendo.",
    descriptionEN: "Power dressed up as service, and the citizens who keep applauding." },
  { id: "sociedad", emoji: "🌍", name: "Sociedad", nameEN: "Society", count: revelationsByCategory.sociedad.length,
    descriptionES: "Todos los demás, observados desde una distancia segura y superior.",
    descriptionEN: "Everyone else, observed from a safe and superior distance." },
];

export const categoryDescription = (categoryId, lang = 'en') => {
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return '';
  return lang === 'es' ? cat.descriptionES : cat.descriptionEN;
};

export const categoryName = (categoryId, lang = 'en', includeEmoji = false) => {
  const cat = categories.find(c => c.id === categoryId);
  if (!cat) return categoryId;
  const name = lang === 'es' ? cat.name : cat.nameEN;
  return includeEmoji ? `${cat.emoji} ${name}` : name;
};

// Orden de desbloqueo diario (no alfabético): revelationsByUnlockDay[0] es la
// primera que ve cualquier usuario nuevo, [1] la del segundo día, etc.
export const revelationsByUnlockDay = [...allRevelations].sort((a, b) => a.unlockDay - b.unlockDay);

// dayIndex = días transcurridos desde la primera vez que el usuario abrió la
// app (ver storage.js: getFirstVisitDayIndex). Se repite el ciclo cada 956 días.
export const getRevelationForDay = (dayIndex) => {
  const i = ((dayIndex % revelationsByUnlockDay.length) + revelationsByUnlockDay.length) % revelationsByUnlockDay.length;
  return revelationsByUnlockDay[i];
};

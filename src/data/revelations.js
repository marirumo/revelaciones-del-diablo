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

export const categories = [
  { id: "éxito", emoji: "⚡", name: "Éxito", nameEN: "Success", count: revelationsByCategory.éxito.length },
  { id: "amor", emoji: "💔", name: "Amor", nameEN: "Love", count: revelationsByCategory.amor.length },
  { id: "dinero", emoji: "💰", name: "Dinero", nameEN: "Money", count: revelationsByCategory.dinero.length },
  { id: "poder", emoji: "👑", name: "Poder", nameEN: "Power", count: revelationsByCategory.poder.length },
  { id: "relaciones", emoji: "🤝", name: "Relaciones", nameEN: "Relationships", count: revelationsByCategory.relaciones.length },
  { id: "filosofía", emoji: "🧠", name: "Filosofía", nameEN: "Philosophy", count: revelationsByCategory.filosofía.length },
  { id: "política", emoji: "🗳️", name: "Política", nameEN: "Politics", count: revelationsByCategory.política.length },
  { id: "sociedad", emoji: "🌍", name: "Sociedad", nameEN: "Society", count: revelationsByCategory.sociedad.length },
];

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

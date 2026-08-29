// Deep link liviano: no hay router de URLs en la app (AppRouter navega por
// estado), así que usamos el hash solo para "abrir esta revelación al
// entrar" — no se sincroniza en cada navegación interna.
const HASH_PREFIX = '#r/';

export const buildRevelationLink = (revelation) => {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${HASH_PREFIX}${revelation.id}`;
};

export const getRevelationIdFromHash = () => {
  const hash = window.location.hash || '';
  if (!hash.startsWith(HASH_PREFIX)) return null;
  return hash.slice(HASH_PREFIX.length) || null;
};

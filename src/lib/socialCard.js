// Genera el "Social Artifact" (pilar 7 del PRD): una tarjeta cuadrada
// dibujada a mano en canvas, con la misma estética editorial que el resto
// de la app — sin depender de librerías externas de renderizado a imagen.
import tailwindConfig from '../../tailwind.config.js';
import { categoryName } from '../data/revelations';
import { buildRevelationLink } from './deepLink';
import { track } from './analytics';

const { paper: PAPER, ink: INK, sub: SUB, accent: ACCENT } = tailwindConfig.theme.extend.colors;
const SIZE = 1080;
const PAD = 80;

const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const fitHeadline = (ctx, text, maxWidth, family) => {
  let size = 120;
  do {
    ctx.font = `900 ${size}px "${family}"`;
    size -= 4;
  } while (ctx.measureText(text).width > maxWidth && size > 48);
  return size + 4;
};

export const generateSocialCardBlob = async (revelation, lang = 'en') => {
  if (document.fonts?.ready) await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const maxWidth = SIZE - PAD * 2;

  const word = lang === 'es' ? revelation.wordES : revelation.wordEN;
  const snippet = lang === 'es' ? revelation.revelationES : revelation.revelationEN;
  const category = categoryName(revelation.category, lang);

  // Fondo
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Regla superior gruesa
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, SIZE, 6);

  // Masthead
  ctx.fillStyle = SUB;
  ctx.font = '600 22px "Oswald"';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(
    lang === 'es' ? 'REVELACIONES DEL DIABLO' : "DEVIL'S REVELATIONS",
    PAD,
    PAD + 22
  );

  // Kicker (categoría, en acento)
  ctx.fillStyle = ACCENT;
  ctx.font = '600 24px "Oswald"';
  ctx.fillText(category.toUpperCase(), PAD, PAD + 90);

  // Palabra — Playfair Black, ajustada al ancho disponible
  const headlineSize = fitHeadline(ctx, word.toUpperCase(), maxWidth, 'Playfair Display');
  ctx.fillStyle = INK;
  ctx.font = `900 ${headlineSize}px "Playfair Display"`;
  const headlineY = PAD + 90 + headlineSize + 20;
  ctx.fillText(word.toUpperCase(), PAD, headlineY);

  // Regla fina
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, headlineY + 40);
  ctx.lineTo(SIZE - PAD, headlineY + 40);
  ctx.stroke();

  // Snippet — Playfair itálica, envuelto en líneas
  ctx.fillStyle = INK;
  ctx.font = 'italic 400 40px "Playfair Display"';
  const lineHeight = 54;
  const lines = wrapText(ctx, `"${snippet}"`, maxWidth).slice(0, 6);
  let y = headlineY + 40 + 70;
  lines.forEach((line) => {
    ctx.fillText(line, PAD, y);
    y += lineHeight;
  });

  // Pie: fecha + link corto
  ctx.fillStyle = SUB;
  ctx.font = '600 20px "Oswald"';
  const dateLabel = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  ctx.fillText(dateLabel.toUpperCase(), PAD, SIZE - PAD);

  // Regla inferior gruesa
  ctx.fillStyle = INK;
  ctx.fillRect(0, SIZE - 6, SIZE, 6);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
};

export const publishRevelation = async (revelation, lang = 'en') => {
  const link = buildRevelationLink(revelation);
  const word = lang === 'es' ? revelation.wordES : revelation.wordEN;
  const shareText = lang === 'es'
    ? `${word} — Revelaciones del Diablo`
    : `${word} — Devil's Revelations`;

  const blob = await generateSocialCardBlob(revelation, lang);
  track('social_card_generated', { id: revelation.id });
  const file = new File([blob], `revelacion-${revelation.id}.png`, { type: 'image/png' });

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: shareText, text: `${shareText}\n${link}` });
      return { method: 'share' };
    }
    if (navigator.share) {
      await navigator.share({ title: shareText, text: shareText, url: link });
      return { method: 'share-link' };
    }
  } catch (error) {
    // El usuario canceló el share sheet nativo — no es un fallo, no hacemos fallback.
    if (error.name === 'AbortError') return { method: 'cancelled' };
    // Cualquier otro fallo del Web Share API (p.ej. NotAllowedError) cae al
    // método universal de descarga + link copiado.
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `revelacion-${revelation.id}.png`;
  a.click();
  URL.revokeObjectURL(url);

  await navigator.clipboard?.writeText(link);
  return { method: 'download', link };
};

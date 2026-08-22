// Genera src/data/revelations.generated.json a partir de las 956 definiciones
// reales de Ambrose Bierce (dominio público) que viven en
// /Users/marirumo/Desktop/dicc-deldiablo/src/data/bierce.json.
//
// Para cada palabra: asigna una categoría (clasificador por palabras clave
// sobre la definición ES/EN) y arma una "revelación" moderna (la verdad
// incómoda) usando bancos de frases variados por categoría, elegidos de
// forma determinista según la palabra para que no se repitan en bloque.
//
// Uso: node scripts/generate-revelations.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = '/Users/marirumo/Desktop/dicc-deldiablo/src/data/bierce.json';
const OUTPUT_PATH = join(__dirname, '../src/data/revelations.generated.json');

const bierce = JSON.parse(readFileSync(SOURCE_PATH, 'utf8'));

const stripAccents = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// --- Clasificador de categoría por palabras clave -------------------------

const CATEGORY_KEYWORDS = {
  dinero: [
    'dinero', 'riqueza', 'pobreza', 'rico', 'pobre', 'precio', 'pagar', 'comprar',
    'vender', 'moneda', 'oro', 'banco', 'deuda', 'impuesto', 'salario', 'sueldo',
    'ganancia', 'economi', 'comercio', 'mercader', 'negocio', 'capital', 'renta',
    'wealth', 'money', 'poverty', 'price', 'pay', 'buy', 'purchase', 'sell',
    'coin', 'gold', 'bank', 'debt', 'tax', 'wage', 'salary', 'profit',
    'economic', 'commerce', 'merchant', 'business', 'capital', 'income',
  ],
  politica: [
    'politic', 'voto', 'eleccion', 'partido', 'congreso', 'senad', 'democracia',
    'republica', 'ministro', 'diploma', 'patriota', 'presidente', 'candidato',
    'vote', 'election', 'senat', 'democra', 'republic', 'minister', 'diplomat',
    'patriot', 'president', 'candidate', 'congress', 'ambassador', 'embajad',
  ],
  poder: [
    'poder', 'gobierno', 'rey', 'reina', 'ley', 'justicia', 'corrup', 'tirano',
    'dictador', 'ejercito', 'guerra', 'soldado', 'autoridad', 'monarca',
    'imperio', 'juez', 'tribunal', 'castigo', 'esclav', 'conquist',
    'power', 'government', 'king', 'queen', 'law', 'justice', 'corrupt',
    'tyrant', 'army', 'war', 'soldier', 'authority', 'monarch', 'empire',
    'judge', 'court', 'punish', 'slave', 'conquer', 'rule',
  ],
  amor: [
    'amor', 'amar', 'beso', 'pasion', 'romance', 'matrimonio', 'esposa',
    'esposo', 'novio', 'novia', 'corazon', 'seduc', 'amante', 'cortejo',
    'love', 'kiss', 'passion', 'romance', 'marriage', 'wife', 'husband',
    'sweetheart', 'heart', 'lover', 'courtship', 'wed',
  ],
  relaciones: [
    'amistad', 'amigo', 'familia', 'hermano', 'hermana', 'padre', 'madre',
    'hijo', 'hija', 'vecino', 'companer', 'enemigo', 'huesped', 'invitad',
    'friend', 'family', 'brother', 'sister', 'father', 'mother', 'son',
    'daughter', 'neighbor', 'companion', 'enemy', 'guest', 'host',
  ],
  exito: [
    'exito', 'trabajo', 'ambicion', 'carrera', 'fracaso', 'esfuerzo', 'logro',
    'triunfo', 'diligencia', 'pereza', 'ocio', 'ocupacion', 'profesion',
    'success', 'work', 'ambition', 'career', 'failure', 'effort', 'achieve',
    'triumph', 'labor', 'diligen', 'idle', 'occupation', 'profession',
  ],
  sociedad: [
    'sociedad', 'gente', 'pueblo', 'costumbre', 'cultura', 'ciudad',
    'civiliza', 'multitud', 'publico', 'nacion', 'raza', 'tribu', 'clase',
    'society', 'people', 'custom', 'culture', 'city', 'civiliz', 'crowd',
    'public', 'nation', 'race', 'tribe', 'class', 'community',
  ],
};

const normalizeCategory = (category) =>
  category === 'exito' ? 'éxito' : category === 'politica' ? 'política' : category;

// Filosofía es el catch-all: conceptos abstractos, virtudes, vicios, vida,
// muerte, mente, alma — que es, de hecho, el grueso del Diccionario del Diablo.
//
// Devuelve { category, confident }. "confident" solo es true si la propia
// PALABRA (no su definición) confirma el tema — evita que un sustantivo
// concreto como "Boca" caiga en "amor" solo porque su definición de Bierce
// menciona "corazón" de pasada.
const classify = (word_es, def_es, word_en, def_en) => {
  const wordHaystack = stripAccents(`${word_es} ${word_en}`);
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => wordHaystack.includes(k))) {
      return { category: normalizeCategory(category), confident: true };
    }
  }

  const defHaystack = stripAccents(`${def_es} ${def_en}`);
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => defHaystack.includes(k))) {
      return { category: normalizeCategory(category), confident: false };
    }
  }

  return { category: 'filosofía', confident: false };
};

// --- Bancos de "revelación" (verdad incómoda moderna) por categoría -------
// {w} = la palabra tal cual (ES o EN según el idioma de la plantilla).

const TEMPLATES = {
  éxito: {
    es: [
      '{w} suena a logro. En la práctica, es la excusa que usas para no descansar.',
      'Persigues {w} toda tu vida. Cuando la alcanzas, ya quieres otra cosa.',
      'Te venden {w} como meta. Nadie te dice que el podio está vacío cuando llegas.',
      '{w} es del tamaño exacto de la comparación con el vecino.',
      'Crees que {w} te hará feliz. Solo cambia de qué te quejas.',
      'Todos hablan de {w} en el currículum. Nadie lo pone en la lápida.',
      'Sacrificaste años por {w}. {w} no te devuelve llamadas.',
      'Confundes {w} con estar ocupado. El reloj no distingue.',
      '{w} es una carrera contra gente que ni sabía que competía contigo.',
      'Al final entiendes que {w} solo era una forma más lenta de rendirse.',
    ],
    en: [
      '{w} sounds like an achievement. In practice, it is the excuse you use to never rest.',
      'You chase {w} your whole life. The moment you get it, you already want something else.',
      'They sell you {w} as the goal. Nobody mentions the podium is empty when you arrive.',
      '{w} is exactly the size of your neighbor’s bigger version of it.',
      'You think {w} will make you happy. It just changes what you complain about.',
      'Everyone talks about {w} on the résumé. Nobody puts it on the headstone.',
      'You gave up years for {w}. {w} does not return the favor.',
      'You mistake {w} for being busy. The clock does not tell the difference.',
      '{w} is a race against people who never knew they were competing with you.',
      'Eventually you realize {w} was just a slower way of giving up.',
    ],
  },
  amor: {
    es: [
      '{w} empieza con fuegos artificiales y termina dividiendo el Wi-Fi.',
      'Juraste que {w} sería para siempre. "Para siempre" duró lo que dura la novedad.',
      '{w} te hace prometer cosas que la cordura jamás firmaría.',
      'Crees que {w} te completa. Solo te distrae de que estabas incompleto antes también.',
      'Le llaman {w}. Es química con excelente departamento de relaciones públicas.',
      '{w} perdona todo la primera vez. Cuenta cada vez después.',
      'Buscas {w} verdadero. Aceptas el que aparece cuando estás cansado de buscar.',
      'Confundes {w} con no estar solo. La factura llega igual, con o sin descuento.',
      '{w} es la única guerra donde ambos bandos celebran la rendición.',
      'Nadie te enseñó que {w} también se factura en silencios, no solo en besos.',
    ],
    en: [
      '{w} starts with fireworks and ends with splitting the Wi-Fi bill.',
      'You swore {w} would last forever. "Forever" lasted exactly as long as the novelty.',
      '{w} makes you promise things sanity would never sign off on.',
      'You think {w} completes you. It just distracts you from being incomplete before, too.',
      'They call it {w}. It is chemistry with an excellent PR department.',
      '{w} forgives everything the first time. It counts every time after.',
      'You search for real {w}. You settle for whatever shows up once you are tired of searching.',
      'You mistake {w} for not being alone. The bill arrives either way.',
      '{w} is the only war where both sides celebrate the surrender.',
      'Nobody told you {w} is billed in silences too, not only in kisses.',
    ],
  },
  dinero: {
    es: [
      '{w} promete libertad. Solo cambia quién te manda.',
      'Persigues {w} para dejar de preocuparte por {w}. No funciona así.',
      '{w} no compra la felicidad, pero alquila una imitación bastante convincente.',
      'Crees que con más {w} serías otra persona. Serías la misma persona, con mejor mesa.',
      'Todos dicen que {w} no importa. Nadie lo dice gratis.',
      '{w} es el único dios que todas las religiones adoran sin admitirlo.',
      'Trabajas por {w}. {w} nunca trabaja por ti.',
      'Cuentas {w} que no tienes para imaginar la vida que no vas a vivir.',
      '{w} compra tiempo. Nunca el que ya perdiste ganándolo.',
      'Tu relación con {w} es la más larga y menos honesta que tendrás.',
    ],
    en: [
      '{w} promises freedom. It just changes who gives the orders.',
      'You chase {w} to stop worrying about {w}. It does not work that way.',
      '{w} cannot buy happiness, but it rents a pretty convincing imitation.',
      'You think more {w} would make you someone else. You would be the same person with a nicer table.',
      'Everyone says {w} does not matter. Nobody says it for free.',
      '{w} is the one god every religion worships without admitting it.',
      'You work for {w}. {w} never works for you.',
      'You count {w} you do not have to imagine the life you will never live.',
      '{w} buys time. Never the time you already lost earning it.',
      'Your relationship with {w} is the longest and least honest one you will ever have.',
    ],
  },
  poder: {
    es: [
      '{w} se ejerce mejor cuando nadie nota que lo estás ejerciendo.',
      'Todos dicen odiar {w}. Todos aceptarían un poco, en privado.',
      '{w} corrompe. Lo interesante es lo rápido que encuentras la excusa.',
      'Crees que tú usarías {w} distinto. Todos lo creyeron antes que tú.',
      '{w} se disfraza de mérito hasta que alguien pregunta cómo se consiguió.',
      'La historia de {w} la escribe quien lo tuvo, no quien lo sufrió.',
      '{w} no cambia a las personas. Solo revela lo que ya escondían.',
      'Buscas {w} para sentirte seguro. Solo cambias de qué tienes miedo.',
      '{w} concentrado en pocas manos se llama liderazgo. En muchas, caos. Convenientemente.',
      'Nadie renuncia a {w} por convicción. Renuncian cuando ya no pueden sostenerlo.',
    ],
    en: [
      '{w} works best when nobody notices you are using it.',
      'Everyone says they hate {w}. Everyone would take a little, in private.',
      '{w} corrupts. The interesting part is how fast you find the excuse.',
      'You think you would use {w} differently. Everyone thought that before you.',
      '{w} disguises itself as merit until someone asks how it was earned.',
      'The history of {w} is written by whoever had it, not whoever suffered it.',
      '{w} does not change people. It just reveals what they were already hiding.',
      'You seek {w} to feel safe. You just change what you are afraid of.',
      '{w} concentrated in a few hands is called leadership. In many, chaos. Conveniently.',
      'Nobody gives up {w} out of conviction. They give it up when they can no longer hold it.',
    ],
  },
  relaciones: {
    es: [
      '{w} dura mientras a ambos les conviene fingir que dura por otra razón.',
      'Llamas {w} a la gente que aguanta tus historias sin cobrar terapia.',
      '{w} se prueba en la crisis, no en la foto grupal.',
      'Crees conocer a alguien por {w}. Solo conoces la versión que decidió mostrarte.',
      '{w} sobrevive a la distancia, casi nunca a la comodidad.',
      'Le dices {w} a la costumbre de no haber encontrado nada mejor todavía.',
      '{w} verdadero no necesita anunciarse cada 24 horas en una historia.',
      'Confundes {w} con tener a alguien cerca. No siempre son lo mismo.',
      '{w} se mide en quién se queda cuando ya no hay nada que ganar quedándose.',
      'Nadie te avisa que {w} también se termina por aburrimiento, no solo por traición.',
    ],
    en: [
      '{w} lasts as long as it is convenient for both to pretend it lasts for another reason.',
      'You call {w} the people who tolerate your stories without charging for therapy.',
      '{w} is tested in the crisis, not in the group photo.',
      'You think you know someone through {w}. You only know the version they chose to show you.',
      '{w} survives distance, almost never comfort.',
      'You call {w} the habit of not having found anything better yet.',
      'Real {w} does not need to announce itself every 24 hours in a story.',
      'You mistake {w} for having someone nearby. They are not always the same thing.',
      '{w} is measured by who stays once there is nothing left to gain by staying.',
      'Nobody warns you {w} also ends from boredom, not only from betrayal.',
    ],
  },
  política: {
    es: [
      '{w} promete cambiarlo todo. Cambia de nombre en la boleta y sigue igual.',
      'Votas por {w} esperando algo distinto. La historia vota que no.',
      '{w} divide a la gente en equipos para que se peleen por lo que ambos equipos ya perdieron.',
      'Cada {w} jura ser el último honesto. El siguiente jura lo mismo.',
      '{w} es el arte de prometer el futuro con el presupuesto del pasado.',
      'Crees que {w} te representa. {w} representa a quien lo financia.',
      '{w} cambia de discurso según quién esté escuchando, nunca según quién esté sufriendo.',
      'La {w} más peligrosa es la que promete simplicidad para un problema complicado.',
      'Después de cada {w}, el país sigue igual y el ganador sigue mejor.',
      '{w} necesita que sigas indignado, nunca que sigas informado.',
    ],
    en: [
      '{w} promises to change everything. It changes names on the ballot and stays the same.',
      'You vote for {w} expecting something different. History votes no.',
      '{w} divides people into teams so they fight over what both teams already lost.',
      'Every {w} swears to be the last honest one. The next one swears the same.',
      '{w} is the art of promising the future with the budget of the past.',
      'You think {w} represents you. {w} represents whoever funds it.',
      '{w} changes its speech depending on who is listening, never on who is suffering.',
      'The most dangerous {w} is the one that promises simplicity for a complicated problem.',
      'After every {w}, the country stays the same and the winner does better.',
      '{w} needs you to stay outraged, never to stay informed.',
    ],
  },
  sociedad: {
    es: [
      '{w} aplaude lo mismo que castigaba ayer, apenas cambia la moda.',
      'Crees pensar por ti mismo. {w} solo te dejó elegir entre sus opciones.',
      '{w} perdona al que triunfa lo mismo que condena al que fracasa igual.',
      'Le llamas normal a lo que {w} repite lo suficiente.',
      '{w} exige autenticidad, siempre y cuando se parezca a todos los demás.',
      'Sigues las reglas de {w} para pertenecer. Nunca te dicen que también son negociables para algunos.',
      '{w} te mide por comparación, nunca por lo que realmente lograste solo.',
      'Confundes la aprobación de {w} con tener razón. No siempre coinciden.',
      '{w} cambia de villano cada década. El guion es sorprendentemente el mismo.',
      'Nadie eligió las reglas de {w}. Todos las defienden como si las hubieran escrito ellos.',
    ],
    en: [
      '{w} applauds today what it punished yesterday, only the fashion changes.',
      'You think you decide for yourself. {w} just let you pick from its options.',
      '{w} forgives the one who succeeds the same way it condemns the one who fails equally.',
      'You call normal whatever {w} repeats often enough.',
      '{w} demands authenticity, as long as it looks like everyone else’s.',
      'You follow the rules of {w} to belong. Nobody tells you they are negotiable for some.',
      '{w} measures you by comparison, never by what you actually achieved alone.',
      'You mistake {w}’s approval for being right. They do not always match.',
      '{w} changes villains every decade. The script is surprisingly the same.',
      'Nobody chose the rules of {w}. Everyone defends them as if they had written them.',
    ],
  },
  filosofía: {
    es: [
      'Crees entender {w}. La verdad es que nadie lo sabe, y actúan con tu misma confianza.',
      '{w} suena profundo hasta que alguien pide una definición y todos se quedan callados.',
      'Todos citan {w}. Pocos se detienen a vivir según lo que citan.',
      '{w} es una de esas palabras que usamos para no admitir que improvisamos todo.',
      'Buscas el sentido de {w} toda la vida. Puede que el punto sea justo no encontrarlo.',
      '{w} cambia de significado exactamente cuando te conviene que cambie.',
      'Le llamas {w} a la costumbre de no cuestionar nada más profundo.',
      '{w} es fácil de admirar en un libro. Incómodo de sostener en la vida real.',
      'Confundes tener una opinión sobre {w} con haberlo entendido.',
      'Nadie te lo dice, pero {w} es solo la forma elegante de aceptar que no hay respuesta.',
      'Todos usan {w} para sonar más inteligentes de lo que la conversación exigía.',
      '{w} es exactamente lo que cada quien necesita que sea para tener la razón.',
      'Nombras {w} y asumes que ya lo entendiste. Ponerle nombre no es lo mismo que entenderlo.',
      '{w} parece simple hasta que te toca vivirlo, no solo describirlo.',
      'Lo que llamas {w} probablemente sería otra cosa si te tocara explicarlo sin ayuda.',
      'Damos por hecho {w} hasta que un día falta, y ahí recién le prestamos atención.',
      '{w} es de esas cosas que criticas en otros y justificas en ti mismo.',
      'Hablas de {w} como si fuera universal. Es, como mucho, tu versión de esta semana.',
      'Diste por sentado {w} durante años. Nunca preguntaste por qué, hasta que ya era tarde.',
      '{w} te parece obvio solo porque nunca lo pusiste a prueba de verdad.',
    ],
    en: [
      'You think you understand {w}. The truth is nobody does, and they act with your same confidence.',
      '{w} sounds profound until someone asks for a definition and everyone goes quiet.',
      'Everyone quotes {w}. Few pause to actually live by what they quote.',
      '{w} is one of those words we use to avoid admitting we are improvising everything.',
      'You search for the meaning of {w} your whole life. Maybe the point is exactly not finding it.',
      '{w} changes meaning right when it is convenient for it to change.',
      'You call {w} the habit of never questioning anything deeper.',
      '{w} is easy to admire in a book. Uncomfortable to live by in real life.',
      'You mistake having an opinion about {w} for having understood it.',
      'Nobody tells you, but {w} is just the elegant way of accepting there is no answer.',
      'Everyone uses {w} to sound smarter than the conversation actually required.',
      '{w} is exactly whatever each person needs it to be to feel right.',
      'You name {w} and assume you understood it. Naming a thing is not the same as understanding it.',
      '{w} looks simple until you actually have to live it, not just describe it.',
      'What you call {w} would probably be something else if you had to explain it without help.',
      'You take {w} for granted until one day it is missing, and only then do you notice it.',
      '{w} is one of those things you criticize in others and excuse in yourself.',
      'You talk about {w} as if it were universal. At most, it is your version of it this week.',
      'You assumed {w} for years. You never asked why, until it was already too late.',
      '{w} feels obvious to you only because you never really put it to the test.',
    ],
  },
};

const UNIVERSAL_TEMPLATES = TEMPLATES.filosofía;

// Hash simple y determinista para elegir plantilla sin depender de Math.random.
const hashWord = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
};

const pickTemplate = (bank, lang, word) => {
  const list = bank[lang];
  const idx = hashWord(word.toLowerCase()) % list.length;
  return list[idx].replaceAll('{w}', word);
};

// --- Orden de desbloqueo diario ---------------------------------------------
// El id/número sigue el orden alfabético del diccionario original (útil para
// Biblioteca). Para que la revelación de "hoy" no avance en orden alfabético
// día a día, generamos un shuffle determinista (semilla fija, mismo resultado
// cada vez que se regenera) y lo guardamos como unlockDay: la posición 0..955
// en la que cada palabra se "desbloquea" a partir del primer día de uso.

const seededRandom = (seed) => {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
};

const shuffleIndices = (length, seed) => {
  const random = seededRandom(seed);
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const UNLOCK_SEED = 956271;
const unlockOrder = shuffleIndices(bierce.length, UNLOCK_SEED);
// unlockOrder[k] = índice (en el arreglo alfabético) que se desbloquea el día k
// unlockDayByIndex invierte eso: para el índice i, ¿qué día le toca?
const unlockDayByIndex = new Array(bierce.length);
unlockOrder.forEach((originalIndex, day) => {
  unlockDayByIndex[originalIndex] = day;
});

// --- Armar el dataset final -------------------------------------------------

const result = bierce.map((entry, i) => {
  const wordES = entry.es.word;
  const wordEN = entry.en.word;
  const biercES = entry.es.definition;
  const biercEN = entry.en.definition;
  const { category, confident } = classify(wordES, biercES, wordEN, biercEN);

  // Solo usamos el banco de frases propio de la categoría cuando la palabra
  // MISMA (no solo su definición) confirma el tema. Si no, usamos el banco
  // universal para no forzar una narrativa (romance, carrera, elecciones...)
  // sobre un sustantivo concreto que no tiene nada que ver con eso.
  const revelationBank = confident ? TEMPLATES[category] : UNIVERSAL_TEMPLATES;

  return {
    id: i + 1,
    number: i + 1,
    unlockDay: unlockDayByIndex[i],
    wordES,
    wordEN,
    category,
    biercES,
    biercEN,
    revelationES: pickTemplate(revelationBank, 'es', wordES),
    revelationEN: pickTemplate(revelationBank, 'en', wordEN),
    gifQueryES: wordES.toLowerCase(),
    gifQueryEN: wordEN.toLowerCase(),
  };
});

writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2), 'utf8');

const counts = result.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] || 0) + 1;
  return acc;
}, {});

console.log(`Generadas ${result.length} revelaciones -> ${OUTPUT_PATH}`);
console.log('Distribución por categoría:', counts);

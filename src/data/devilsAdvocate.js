// The Devil's Advocate (PRD §15) — pre-written retorts, classified by
// argument type and flavored by the subject of the active revelation.
// Tone rules: see CONTENT_GUIDELINES.md. Sarcastic, intellectual, distant.
// Never cruel, never horror-flavored, never impressed.
//
// classify() is a cheap keyword heuristic, not NLP — it only needs to feel
// like the Devil is listening, not actually understand the argument.
import { categoryName } from './revelations';

const KEYWORDS = {
  agree: {
    en: ["you're right", 'youre right', 'i agree', 'fair point', 'makes sense'],
    es: ['tiene razón', 'tiene razon', 'de acuerdo', 'tiene sentido'],
  },
  disagree: {
    en: ['wrong', 'disagree', 'not true', 'false', 'nonsense', 'ridiculous'],
    es: ['equivocado', 'no es cierto', 'falso', 'ridículo', 'ridiculo', 'no estoy de acuerdo'],
  },
  deflect: {
    en: ['but ', 'what about', 'sure, but', 'except'],
    es: ['pero ', 'y qué hay de', 'y que hay de', 'excepto'],
  },
  humor: {
    en: ['haha', 'lol', 'lmao', "that's funny"],
    es: ['jaja', 'jeje', 'que chistoso', 'qué chistoso'],
  },
  quote: {
    en: ['said', 'says', 'according to'],
    es: ['dijo', 'según', 'segun'],
  },
  personal: {
    en: ['you are', "you're just", 'youre just', "you don't know", 'you dont know'],
    es: ['tú eres', 'eres solo', 'no sabes', 'no tienes'],
  },
};

const isQuestion = (text) => /[?¿]/.test(text);

export const classifyArgument = (text, lang = 'en') => {
  const t = text.toLowerCase().trim();

  if (t.length < 12) return 'short';
  if (t.length > 220) return 'long';
  if (isQuestion(t)) return 'question';

  for (const [type, pools] of Object.entries(KEYWORDS)) {
    const words = pools[lang] || pools.en;
    if (words.some((w) => t.includes(w))) return type;
  }

  return 'generic';
};

// {subject} se reemplaza por la categoría de la revelación activa.
const RESPONSES = {
  agree: {
    en: ["Of course I'm right. You may go now.", "Correct. I'll allow you to feel clever about it for one sentence."],
    es: ['Por supuesto que tengo razón. Ya puedes retirarte.', 'Correcto. Te permito sentirte listo por una frase.'],
  },
  disagree: {
    en: ['Bold claim about {subject}. Try again with evidence.', "I've been wrong before. Today is not that day."],
    es: ['Afirmación audaz sobre {subject}. Inténtalo de nuevo con pruebas.', 'Me he equivocado antes. Hoy no es ese día.'],
  },
  deflect: {
    en: ["'But' is where arguments about {subject} go to die.", "An exception doesn't disprove the rule. It confirms how rare it is."],
    es: ['El "pero" es donde mueren los argumentos sobre {subject}.', 'Una excepción no refuta la regla. Confirma lo poco frecuente que es.'],
  },
  humor: {
    en: ['Laughing at your own joke about {subject}. I respect the self-sufficiency.', "I permit one laugh per session. You've used it."],
    es: ['Riéndote de tu propio chiste sobre {subject}. Respeto la autosuficiencia.', 'Permito una risa por sesión. Ya la usaste.'],
  },
  quote: {
    en: ['Citing someone else on {subject} is not the same as being right yourself.', 'Impressive research. Unfortunate conclusion.'],
    es: ['Citar a alguien más sobre {subject} no significa que tengas razón.', 'Investigación impresionante. Conclusión lamentable.'],
  },
  personal: {
    en: ["Redirecting to me won't save {subject} from my argument.", 'Flattering, but I was talking about the idea, not myself.'],
    es: ['Redirigir hacia mí no salvará a {subject} de mi argumento.', 'Halagador, pero yo hablaba de la idea, no de mí mismo.'],
  },
  question: {
    en: ['A question about {subject}. How refreshingly honest of you not to know.', 'I answer questions. I do not answer this one.'],
    es: ['Una pregunta sobre {subject}. Qué honesto de tu parte no saberlo.', 'Respondo preguntas. Esta no la voy a responder.'],
  },
  short: {
    en: ["That's not an argument about {subject}. That's a shrug with punctuation.", 'Brief. Also empty.'],
    es: ['Eso no es un argumento sobre {subject}. Es un encogimiento de hombros con puntuación.', 'Breve. También vacío.'],
  },
  long: {
    en: ['I stopped reading around the third clause about {subject}. So did you, probably.', 'A lot of words to avoid a conclusion about {subject}.'],
    es: ['Dejé de leer hacia la tercera cláusula sobre {subject}. Tú también, probablemente.', 'Muchas palabras para evitar una conclusión sobre {subject}.'],
  },
};

const GENERIC_RESPONSES = {
  en: [
    'Interesting. Wrong, but interesting.',
    "I've heard that argument before — usually from people who lost it.",
    "You may keep your opinion. I'll keep being right.",
    'A bold theory. Have you considered evidence?',
    "That's the kind of thing people say right before they're proven wrong publicly.",
    "I admire the confidence. It's the only accurate part of what you said.",
    'Noted, filed, and quietly ignored.',
    'You argue like someone who has never lost an argument — because no one bothered to finish it.',
    "I see you've mistaken conviction for correctness. Common error.",
    "Please, continue. I haven't laughed today.",
    "That's a very optimistic reading of humanity. I respect the effort.",
    "You're not wrong to feel that way. You're just wrong.",
    "I'll consider your point the moment it considers reality.",
    'Charming. Also irrelevant.',
    'Every century has its optimists. Yours just types faster.',
  ],
  es: [
    'Interesante. Equivocado, pero interesante.',
    'Ya he escuchado ese argumento antes — casi siempre de boca de quien lo perdió.',
    'Puedes quedarte con tu opinión. Yo me quedo con la razón.',
    'Una teoría audaz. ¿Has considerado las pruebas?',
    'Eso es justo lo que dice la gente antes de que la desmientan en público.',
    'Admiro la seguridad. Es lo único acertado de lo que has dicho.',
    'Tomado nota, archivado y discretamente ignorado.',
    'Argumentas como quien nunca ha perdido una discusión — porque nadie se molestó en terminarla.',
    'Veo que has confundido la convicción con la razón. Error común.',
    'Continúa, por favor. Hoy todavía no me he reído.',
    'Una lectura muy optimista de la humanidad. Respeto el esfuerzo.',
    'No te equivocas al sentir eso. Te equivocas en todo lo demás.',
    'Consideraré tu punto en cuanto él considere la realidad.',
    'Encantador. También irrelevante.',
    'Cada siglo tiene sus optimistas. El tuyo solo escribe más rápido.',
  ],
};

const pickFrom = (pool) => pool[Math.floor(Math.random() * pool.length)];

// revelation es opcional: sin ella, cae al fallback universal con {subject}
// genérico. Con ella, la respuesta se ata al subject activo.
export const getAdvocateResponse = (opinion, lang = 'en', revelation = null) => {
  const type = classifyArgument(opinion, lang);
  const subject = revelation
    ? categoryName(revelation.category, lang).toLowerCase()
    : lang === 'es' ? 'el tema' : 'the subject';

  if (type !== 'generic' && RESPONSES[type]) {
    const pool = RESPONSES[type][lang] || RESPONSES[type].en;
    return pickFrom(pool).replace('{subject}', subject);
  }

  const fallback = GENERIC_RESPONSES[lang] || GENERIC_RESPONSES.en;
  return pickFrom(fallback);
};

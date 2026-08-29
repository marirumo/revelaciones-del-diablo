// The Devil's Advocate — pre-written retorts.
// Tone rules: see CONTENT_GUIDELINES.md. Sarcastic, intellectual, distant.
// Never cruel, never horror-flavored, never impressed.

export const devilsAdvocateResponses = {
  en: [
    "Interesting. Wrong, but interesting.",
    "I've heard that argument before — usually from people who lost it.",
    "You may keep your opinion. I'll keep being right.",
    "A bold theory. Have you considered evidence?",
    "That's the kind of thing people say right before they're proven wrong publicly.",
    "I admire the confidence. It's the only accurate part of what you said.",
    "Noted, filed, and quietly ignored.",
    "You argue like someone who has never lost an argument — because no one bothered to finish it.",
    "I see you've mistaken conviction for correctness. Common error.",
    "Please, continue. I haven't laughed today.",
    "That's a very optimistic reading of humanity. I respect the effort.",
    "You're not wrong to feel that way. You're just wrong.",
    "I'll consider your point the moment it considers reality.",
    "Charming. Also irrelevant.",
    "Every century has its optimists. Yours just types faster.",
  ],
  es: [
    "Interesante. Equivocado, pero interesante.",
    "Ya he escuchado ese argumento antes — casi siempre de boca de quien lo perdió.",
    "Puede quedarse con su opinión. Yo me quedo con la razón.",
    "Una teoría audaz. ¿Ha considerado las pruebas?",
    "Eso es justo lo que dice la gente antes de que la desmientan en público.",
    "Admiro la seguridad. Es lo único acertado de lo que ha dicho.",
    "Tomado nota, archivado y discretamente ignorado.",
    "Argumenta usted como quien nunca ha perdido una discusión — porque nadie se molestó en terminarla.",
    "Veo que ha confundido la convicción con la razón. Error común.",
    "Continúe, por favor. Hoy todavía no me he reído.",
    "Una lectura muy optimista de la humanidad. Respeto el esfuerzo.",
    "No se equivoca al sentir eso. Se equivoca en todo lo demás.",
    "Consideraré su punto en cuanto él considere la realidad.",
    "Encantador. También irrelevante.",
    "Cada siglo tiene sus optimistas. El suyo solo escribe más rápido.",
  ],
};

export const getRandomAdvocateResponse = (lang = 'en') => {
  const pool = devilsAdvocateResponses[lang] || devilsAdvocateResponses.en;
  return pool[Math.floor(Math.random() * pool.length)];
};

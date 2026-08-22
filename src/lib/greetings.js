// Saludo sarcástico de Home, según la hora local del dispositivo. Se elige
// de forma determinista por día (mismo saludo todo el día, cambia mañana)
// para que no varíe en cada re-render ni se sienta al azar puro.

const GREETINGS = {
  madrugada: {
    es: [
      'Buenas madrugadas. O sigues despierto, o ya perdiste la cuenta.',
      '¿Todavía despierto? El insomnio también es una forma de compromiso.',
      'A esta hora nadie te juzga. Bueno, yo sí, un poco.',
      'Madrugada. La hora perfecta para decisiones que lamentarás mañana.',
      'Deberías dormir. Pero aquí estás, leyendo esto en su lugar.',
      'La noche no perdona a quien no la respeta. Buenas madrugadas de todos modos.',
    ],
    en: [
      'Good pre-dawn hours. Either you never slept, or you gave up counting.',
      'Still awake? Insomnia is a commitment too, in its own way.',
      'Nobody judges you at this hour. Except me. A little.',
      'Pre-dawn: the perfect time for decisions you will regret tomorrow.',
      'You should be asleep. Yet here you are, reading this instead.',
      'The night does not forgive those who disrespect it. Good pre-dawn hours anyway.',
    ],
  },
  mañana: {
    es: [
      'Buenos días. Otro día para fingir que tienes todo bajo control.',
      'Buenos días. El café no arregla nada, pero ayuda a ignorarlo mejor.',
      'Amaneció. Nadie preguntó si estabas listo.',
      'Buenos días. La motivación de las 7am rara vez sobrevive hasta las 9.',
      'Otra mañana, la misma alarma, las mismas excusas de siempre.',
      'Buenos días. El día apenas empieza y ya encontró forma de decepcionarte.',
    ],
    en: [
      'Good morning. Another day to pretend you have it all together.',
      'Good morning. Coffee fixes nothing, it just helps you ignore it better.',
      'Morning happened. Nobody asked if you were ready.',
      'Good morning. 7am motivation rarely survives past 9.',
      'Another morning, same alarm, same excuses as always.',
      'Good morning. The day just started and already found a way to disappoint you.',
    ],
  },
  tarde: {
    es: [
      'Buenas tardes. A mitad del día y ya quieres que termine.',
      'Buenas tardes. El almuerzo fue lo único honesto que hiciste hoy.',
      'Tarde. La energía de la mañana ya se fue a otra parte.',
      'Buenas tardes. Cinco horas más de fingir productividad.',
      'A esta hora ya sabes cómo va a terminar el día. Igual que ayer.',
      'Buenas tardes. El punto medio perfecto entre esperanza y agotamiento.',
    ],
    en: [
      'Good afternoon. Halfway through the day and already wishing it over.',
      'Good afternoon. Lunch was the only honest thing you did today.',
      'Afternoon. Morning energy left for somewhere else.',
      'Good afternoon. Five more hours of pretending to be productive.',
      'By now you already know how the day ends. Same as yesterday.',
      'Good afternoon. The perfect midpoint between hope and exhaustion.',
    ],
  },
  noche: {
    es: [
      'Buenas noches. El día terminó y sigue sin arreglarse nada.',
      'Buenas noches. Mañana prometes empezar de nuevo. Como siempre.',
      'Cae la noche. Momento perfecto para revisar todo lo que no hiciste hoy.',
      'Buenas noches. Al menos sobreviviste otro día, que ya es bastante.',
      'La noche llegó a rescatarte de un día que no pediste.',
      'Buenas noches. Mañana será exactamente igual, con otro nombre.',
    ],
    en: [
      'Good evening. The day is over and nothing got fixed.',
      'Good evening. You promise to start fresh tomorrow. As always.',
      'Night falls. Perfect time to review everything you did not do today.',
      'Good evening. At least you survived another day, that counts for something.',
      'The night arrived to rescue you from a day you never asked for.',
      'Good evening. Tomorrow will be exactly the same, under a different name.',
    ],
  },
};

const getTimeBucket = (hour) => {
  if (hour < 6) return 'madrugada';
  if (hour < 12) return 'mañana';
  if (hour < 19) return 'tarde';
  return 'noche';
};

export const getGreeting = (lang = 'es') => {
  const now = new Date();
  const bucket = getTimeBucket(now.getHours());
  const bank = GREETINGS[bucket][lang === 'es' ? 'es' : 'en'];
  const daySeed = Math.floor(now.getTime() / 86400000);
  return bank[daySeed % bank.length];
};

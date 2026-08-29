// IndexedDB Storage for Favorites and User Preferences
const DB_NAME = 'RevelacionesDiablo';
const DB_VERSION = 1;
const FAVORITES_STORE = 'favorites';
const PREFERENCES_STORE = 'preferences';

let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      const database = e.target.result;

      // Create favorites store
      if (!database.objectStoreNames.contains(FAVORITES_STORE)) {
        const favStore = database.createObjectStore(FAVORITES_STORE, { keyPath: 'id' });
        favStore.createIndex('revelationId', 'revelationId', { unique: true });
        favStore.createIndex('savedAt', 'savedAt', { unique: false });
      }

      // Create preferences store
      if (!database.objectStoreNames.contains(PREFERENCES_STORE)) {
        database.createObjectStore(PREFERENCES_STORE, { keyPath: 'key' });
      }
    };
  });
};

// Favorites
export const addFavorite = async (revelation) => {
  const database = await initDB();
  const tx = database.transaction([FAVORITES_STORE], 'readwrite');
  const store = tx.objectStore(FAVORITES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.add({
      id: `fav_${revelation.id}`,
      revelationId: revelation.id,
      wordES: revelation.wordES,
      category: revelation.category,
      savedAt: new Date().toISOString(),
      revelation,
    });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const removeFavorite = async (revelationId) => {
  const database = await initDB();
  const tx = database.transaction([FAVORITES_STORE], 'readwrite');
  const store = tx.objectStore(FAVORITES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.delete(`fav_${revelationId}`);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const isFavorite = async (revelationId) => {
  const database = await initDB();
  const tx = database.transaction([FAVORITES_STORE], 'readonly');
  const store = tx.objectStore(FAVORITES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.get(`fav_${revelationId}`);
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllFavorites = async () => {
  const database = await initDB();
  const tx = database.transaction([FAVORITES_STORE], 'readonly');
  const store = tx.objectStore(FAVORITES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getFavoritesByCategory = async (category) => {
  const database = await initDB();
  const tx = database.transaction([FAVORITES_STORE], 'readonly');
  const store = tx.objectStore(FAVORITES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const result = request.result.filter(fav => fav.category === category);
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
};

// Preferences
export const setPreference = async (key, value) => {
  const database = await initDB();
  const tx = database.transaction([PREFERENCES_STORE], 'readwrite');
  const store = tx.objectStore(PREFERENCES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.put({ key, value });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getPreference = async (key) => {
  const database = await initDB();
  const tx = database.transaction([PREFERENCES_STORE], 'readonly');
  const store = tx.objectStore(PREFERENCES_STORE);

  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result?.value);
    request.onerror = () => reject(request.error);
  });
};

// Sin preferencia guardada: si el navegador está en español, arrancamos en
// ES-LatAm (PRD: detección por navigator.language); si no, el default es EN.
export const getLanguage = async () => {
  const stored = await getPreference('language');
  if (stored) return stored;
  const browserLang = typeof navigator !== 'undefined' ? navigator.language : '';
  return browserLang?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

export const setLanguage = async (lang) => {
  return setPreference('language', lang);
};

// Pantalla de bienvenida: se muestra una sola vez por dispositivo.
export const getHasSeenWelcome = async () => {
  return !!(await getPreference('hasSeenWelcome'));
};

export const setHasSeenWelcome = async () => {
  return setPreference('hasSeenWelcome', true);
};

// Días desde medianoche (fecha local) para contar "días completos" sin horas.
const daysSinceEpoch = (date) => Math.floor(date.getTime() / 86400000);

// La primera vez que la app corre en este dispositivo, se fija esa fecha como
// "día 0" del usuario. A partir de ahí, cada día calendario desbloquea la
// siguiente revelación en el orden aleatorio (ver getRevelationForDay).
export const getFirstVisitDayIndex = async () => {
  const stored = await getPreference('firstVisitDay');
  const todayDayNumber = daysSinceEpoch(new Date());

  if (stored === undefined || stored === null) {
    await setPreference('firstVisitDay', todayDayNumber);
    return 0;
  }

  return Math.max(0, todayDayNumber - stored);
};

// Racha de días consecutivos abriendo la app. Se llama una vez por sesión:
// mismo día no suma, día siguiente suma, cualquier hueco reinicia a 1.
export const getStreak = async () => {
  const todayDayNumber = daysSinceEpoch(new Date());
  const lastVisit = await getPreference('lastVisitDay');
  const previousStreak = (await getPreference('currentStreak')) || 0;

  let streak;
  if (lastVisit === undefined || lastVisit === null) {
    streak = 1;
  } else if (todayDayNumber === lastVisit) {
    streak = previousStreak || 1;
  } else if (todayDayNumber === lastVisit + 1) {
    streak = previousStreak + 1;
  } else {
    streak = 1;
  }

  await setPreference('lastVisitDay', todayDayNumber);
  await setPreference('currentStreak', streak);
  return streak;
};

// Configuración de Firebase
// Pon tus valores reales en el archivo .env (ver .env.example) — nunca aquí.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let firebaseAppPromise = null;

/**
 * Carga perezosa del SDK de Firebase (~540KB). Nada en el arranque de la app
 * importa 'firebase/*' de forma estática: solo se descarga cuando algo
 * realmente necesita auth o Firestore (login, sync de favoritas, etc).
 * La promesa se memoiza para que initializeApp/getAuth/getFirestore corran una sola vez.
 */
export const getFirebaseApp = () => {
  if (!firebaseAppPromise) {
    firebaseAppPromise = (async () => {
      const [{ initializeApp }, { getAuth, connectAuthEmulator }, { getFirestore, connectFirestoreEmulator }] =
        await Promise.all([
          import('firebase/app'),
          import('firebase/auth'),
          import('firebase/firestore'),
        ]);

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      // Conectar emuladores solo si se pide explícitamente (VITE_USE_FIREBASE_EMULATOR=true)
      // y hay un emulador corriendo localmente (`firebase emulators:start`).
      const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';
      if (useEmulator && typeof window !== 'undefined') {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        connectFirestoreEmulator(db, 'localhost', 8080);
      }

      return { app, auth, db };
    })();
  }
  return firebaseAppPromise;
};

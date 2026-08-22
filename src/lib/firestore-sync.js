import { getFirebaseApp } from './firebase-config';

const FAVORITES_COLLECTION = 'favorites';
const USERS_COLLECTION = 'users';
const COLLECTIONS_COLLECTION = 'sharedCollections';

let firestoreDepsPromise = null;

// Carga perezosa de 'firebase/firestore' + la app inicializada, memoizada
// para que el SDK se descargue una sola vez, la primera vez que se necesite.
const getFirestoreDeps = () => {
  if (!firestoreDepsPromise) {
    firestoreDepsPromise = Promise.all([
      getFirebaseApp(),
      import('firebase/firestore'),
    ]).then(([{ db }, firestoreFns]) => ({ db, ...firestoreFns }));
  }
  return firestoreDepsPromise;
};

/**
 * Sincronizar una revelación a favoritos en Firestore
 */
export const addFavoriteToFirestore = async (userId, revelation) => {
  try {
    const { db, collection, addDoc, serverTimestamp } = await getFirestoreDeps();

    const favorite = {
      userId,
      revelationId: revelation.id,
      wordES: revelation.wordES,
      wordEN: revelation.wordEN,
      category: revelation.category,
      revelationES: revelation.revelationES,
      revelationEN: revelation.revelationEN,
      biercES: revelation.biercES,
      biercEN: revelation.biercEN,
      gifQueryES: revelation.gifQueryES,
      gifQueryEN: revelation.gifQueryEN,
      savedAt: serverTimestamp(),
      number: revelation.number,
    };

    const docRef = await addDoc(collection(db, FAVORITES_COLLECTION), favorite);
    return docRef.id;
  } catch (error) {
    console.error('Error añadiendo favorita a Firestore:', error);
    throw error;
  }
};

/**
 * Eliminar una revelación de favoritos en Firestore
 */
export const removeFavoriteFromFirestore = async (userId, revelationId) => {
  try {
    const { db, collection, query, where, getDocs, deleteDoc } = await getFirestoreDeps();

    const q = query(
      collection(db, FAVORITES_COLLECTION),
      where('userId', '==', userId),
      where('revelationId', '==', revelationId)
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error eliminando favorita de Firestore:', error);
    throw error;
  }
};

/**
 * Obtener todas las favoritas de un usuario desde Firestore
 */
export const getFavoritesFromFirestore = async (userId) => {
  try {
    const { db, collection, query, where, getDocs } = await getFirestoreDeps();

    const q = query(
      collection(db, FAVORITES_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const favorites = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      savedAt: doc.data().savedAt?.toDate?.() || new Date(),
    }));

    return favorites;
  } catch (error) {
    console.error('Error obteniendo favoritas de Firestore:', error);
    throw error;
  }
};

/**
 * Crear un perfil de usuario en Firestore
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const { db, doc, setDoc, serverTimestamp } = await getFirestoreDeps();

    const userRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(userRef, {
      email: userData.email,
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      language: 'es',
    }, { merge: true });
  } catch (error) {
    console.error('Error creando perfil de usuario:', error);
    throw error;
  }
};

/**
 * Actualizar último login
 */
export const updateLastLogin = async (userId) => {
  try {
    const { db, doc, updateDoc, serverTimestamp } = await getFirestoreDeps();

    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error actualizando último login:', error);
    throw error;
  }
};

/**
 * Obtener perfil de usuario
 */
export const getUserProfile = async (userId) => {
  try {
    const { db, doc, getDoc } = await getFirestoreDeps();

    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo perfil de usuario:', error);
    throw error;
  }
};

/**
 * Crear una colección compartida (lista de favoritas para compartir)
 */
export const createSharedCollection = async (userId, collectionData) => {
  try {
    const { db, collection, addDoc, serverTimestamp } = await getFirestoreDeps();

    const sharedCollection = {
      userId,
      title: collectionData.title,
      description: collectionData.description || '',
      favorites: collectionData.favorites || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      shareCode: generateShareCode(),
      isPublic: collectionData.isPublic || false,
    };

    const docRef = await addDoc(collection(db, COLLECTIONS_COLLECTION), sharedCollection);
    return {
      id: docRef.id,
      ...sharedCollection,
    };
  } catch (error) {
    console.error('Error creando colección compartida:', error);
    throw error;
  }
};

/**
 * Obtener una colección compartida por su código
 */
export const getSharedCollectionByCode = async (shareCode) => {
  try {
    const { db, collection, query, where, getDocs } = await getFirestoreDeps();

    const q = query(
      collection(db, COLLECTIONS_COLLECTION),
      where('shareCode', '==', shareCode)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo colección compartida:', error);
    throw error;
  }
};

/**
 * Obtener colecciones compartidas de un usuario
 */
export const getUserSharedCollections = async (userId) => {
  try {
    const { db, collection, query, where, getDocs } = await getFirestoreDeps();

    const q = query(
      collection(db, COLLECTIONS_COLLECTION),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const collections = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return collections;
  } catch (error) {
    console.error('Error obteniendo colecciones compartidas:', error);
    throw error;
  }
};

/**
 * Eliminar una colección compartida
 */
export const deleteSharedCollection = async (collectionId) => {
  try {
    const { db, doc, deleteDoc } = await getFirestoreDeps();
    await deleteDoc(doc(db, COLLECTIONS_COLLECTION, collectionId));
  } catch (error) {
    console.error('Error eliminando colección compartida:', error);
    throw error;
  }
};

/**
 * Generar código único para compartir
 */
function generateShareCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Sincronizar favoritas locales con Firestore
 */
export const syncFavoritesWithFirestore = async (userId, localFavorites) => {
  try {
    const firebaseFavorites = await getFavoritesFromFirestore(userId);
    const firebaseIds = new Set(firebaseFavorites.map(f => f.revelationId));
    const localIds = new Set(localFavorites.map(f => f.id));

    // Agregar favoritas locales que no están en Firebase
    for (const favorite of localFavorites) {
      if (!firebaseIds.has(favorite.id)) {
        await addFavoriteToFirestore(userId, favorite);
      }
    }

    // Eliminar favoritas que están en Firebase pero no locales
    for (const favorite of firebaseFavorites) {
      if (!localIds.has(favorite.revelationId)) {
        await removeFavoriteFromFirestore(userId, favorite.revelationId);
      }
    }

    return firebaseFavorites;
  } catch (error) {
    console.error('Error sincronizando favoritas:', error);
    throw error;
  }
};

import { useEffect, useState } from 'react';
import { getAllFavorites, addFavorite as addLocalFavorite, removeFavorite as removeLocalFavorite } from './storage';
import {
  addFavoriteToFirestore,
  removeFavoriteFromFirestore,
  getFavoritesFromFirestore,
  syncFavoritesWithFirestore,
} from './firestore-sync';

/**
 * Hook para sincronizar favoritas entre IndexedDB y Firestore
 * - Sincroniza automáticamente al cargar
 * - Escucha cambios y actualiza Firestore
 * - Mantiene un estado local sincronizado
 */
export const useSyncFavorites = (user) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Escuchar cambios de conectividad
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronización inicial y en background
  useEffect(() => {
    if (!user) return;

    const syncFavorites = async () => {
      try {
        setIsSyncing(true);
        const localFavorites = await getAllFavorites();
        await syncFavoritesWithFirestore(user.uid, localFavorites);
        setLastSyncTime(new Date());
      } catch (error) {
        console.error('Error en sincronización de favoritas:', error);
      } finally {
        setIsSyncing(false);
      }
    };

    // Sincronizar inmediatamente
    syncFavorites();

    // Sincronizar cada 30 segundos si está online
    let syncInterval;
    if (isOnline) {
      syncInterval = setInterval(syncFavorites, 30000);
    }

    return () => {
      if (syncInterval) clearInterval(syncInterval);
    };
  }, [user, isOnline]);

  /**
   * Agregar favorita (sincroniza automáticamente)
   */
  const addFavorite = async (revelation) => {
    try {
      // Guardar localmente primero
      await addLocalFavorite(revelation);

      // Sincronizar con Firestore si hay usuario y está online
      if (user && isOnline) {
        await addFavoriteToFirestore(user.uid, revelation);
      }

      return true;
    } catch (error) {
      console.error('Error agregando favorita:', error);
      throw error;
    }
  };

  /**
   * Eliminar favorita (sincroniza automáticamente)
   */
  const removeFavorite = async (revelationId) => {
    try {
      // Eliminar localmente primero
      await removeLocalFavorite(revelationId);

      // Sincronizar con Firestore si hay usuario y está online
      if (user && isOnline) {
        await removeFavoriteFromFirestore(user.uid, revelationId);
      }

      return true;
    } catch (error) {
      console.error('Error eliminando favorita:', error);
      throw error;
    }
  };

  /**
   * Forzar sincronización manual
   */
  const forceSync = async () => {
    if (!user) {
      console.warn('No hay usuario autenticado para sincronizar');
      return;
    }

    try {
      setIsSyncing(true);
      const localFavorites = await getAllFavorites();
      await syncFavoritesWithFirestore(user.uid, localFavorites);
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Error en sincronización manual:', error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isOnline,
    isSyncing,
    lastSyncTime,
    addFavorite,
    removeFavorite,
    forceSync,
  };
};

export default useSyncFavorites;

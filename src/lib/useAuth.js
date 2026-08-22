import { useEffect, useState } from 'react';
import { getFirebaseApp } from './firebase-config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;

    (async () => {
      const [{ auth }, { onAuthStateChanged }] = await Promise.all([
        getFirebaseApp(),
        import('firebase/auth'),
      ]);
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Login con Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const [{ auth }, { signInWithPopup, GoogleAuthProvider }] = await Promise.all([
        getFirebaseApp(),
        import('firebase/auth'),
      ]);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (err) {
      const errorMsg = err.code === 'auth/popup-closed-by-user'
        ? 'El popup de login fue cerrado'
        : err.message;
      setError(errorMsg);
      throw err;
    }
  };

  // Login con Email/Password
  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      const [{ auth }, { signInWithEmailAndPassword }] = await Promise.all([
        getFirebaseApp(),
        import('firebase/auth'),
      ]);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      let errorMsg = 'Error al iniciar sesión';
      if (err.code === 'auth/user-not-found') {
        errorMsg = 'Usuario no encontrado';
      } else if (err.code === 'auth/wrong-password') {
        errorMsg = 'Contraseña incorrecta';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Email inválido';
      }
      setError(errorMsg);
      throw err;
    }
  };

  // Registrar con Email/Password
  const registerWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const [{ auth }, { createUserWithEmailAndPassword, updateProfile }] = await Promise.all([
        getFirebaseApp(),
        import('firebase/auth'),
      ]);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      return result.user;
    } catch (err) {
      let errorMsg = 'Error al registrarse';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'Este email ya está registrado';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'La contraseña debe tener al menos 6 caracteres';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Email inválido';
      }
      setError(errorMsg);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      const [{ auth }, { signOut }] = await Promise.all([
        getFirebaseApp(),
        import('firebase/auth'),
      ]);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    isAuthenticated: !!user,
  };
};

export default useAuth;

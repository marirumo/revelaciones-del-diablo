import { useState } from 'react';
import { useAuth } from '../lib/useAuth';

export const AuthScreen = ({ onAuthSuccess, lang = 'es' }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, error } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' o 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setLocalError('');
      const user = await loginWithGoogle();
      if (user) {
        onAuthSuccess(user);
      }
    } catch (err) {
      setLocalError(error || (lang === 'es' ? 'Error al iniciar sesión' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLocalError(lang === 'es' ? 'Completa todos los campos' : 'Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      setLocalError('');
      
      let user;
      if (authMode === 'login') {
        user = await loginWithEmail(email, password);
      } else {
        if (!displayName) {
          setLocalError(lang === 'es' ? 'Ingresa tu nombre' : 'Enter your name');
          setLoading(false);
          return;
        }
        user = await registerWithEmail(email, password, displayName);
      }

      if (user) {
        onAuthSuccess(user);
      }
    } catch (err) {
      setLocalError(error || (lang === 'es' ? 'Error de autenticación' : 'Authentication error'));
    } finally {
      setLoading(false);
    }
  };

  const labels = lang === 'es' ? {
    title: '😈 Revelaciones del Diablo',
    subtitle: 'Sincroniza tus revelaciones en la nube',
    loginBtn: 'Iniciar Sesión',
    registerBtn: 'Registrarse',
    googleBtn: 'Continuar con Google',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: 'Contraseña',
    namePlaceholder: 'Tu nombre',
    noAccount: '¿No tienes cuenta?',
    haveAccount: '¿Ya tienes cuenta?',
    signUp: 'Crear una',
    signIn: 'Inicia sesión',
    orContinueWith: 'O continúa con',
  } : {
    title: '😈 Devil\'s Revelations',
    subtitle: 'Sync your revelations to the cloud',
    loginBtn: 'Sign In',
    registerBtn: 'Sign Up',
    googleBtn: 'Continue with Google',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Password',
    namePlaceholder: 'Your name',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    signUp: 'Create one',
    signIn: 'Sign in',
    orContinueWith: 'Or continue with',
  };

  return (
    <div className="w-full min-h-screen bg-hell-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce-subtle">😈</div>
          <h1 className="text-3xl font-black text-hell-gold mb-2">
            {labels.title}
          </h1>
          <p className="text-hell-text-secondary text-sm">
            {labels.subtitle}
          </p>
        </div>

        {/* Error Message */}
        {localError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg animate-slide-up-fade">
            <p className="text-red-500 text-sm">{localError}</p>
          </div>
        )}

        {/* Main Card */}
        <div className="card-hell bg-hell-card/92 border-hell mb-4 animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            {/* Display Name (Register only) */}
            {authMode === 'register' && (
              <div>
                <input
                  type="text"
                  placeholder={labels.namePlaceholder}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-hell-bg border border-hell-orange-dark rounded-lg text-hell-gold placeholder-hell-text-secondary focus:outline-none focus:border-hell-gold transition-smooth disabled:opacity-50"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder={labels.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-hell-bg border border-hell-orange-dark rounded-lg text-hell-gold placeholder-hell-text-secondary focus:outline-none focus:border-hell-gold transition-smooth disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder={labels.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-hell-bg border border-hell-orange-dark rounded-lg text-hell-gold placeholder-hell-text-secondary focus:outline-none focus:border-hell-gold transition-smooth disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-hell-primary w-full disabled:opacity-50 disabled:cursor-not-allowed hover-scale active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner" style={{ width: '16px', height: '16px' }} />
                  {authMode === 'login' ? labels.loginBtn : labels.registerBtn}
                </span>
              ) : authMode === 'login' ? labels.loginBtn : labels.registerBtn}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mb-6 pb-6 border-b border-hell-orange-dark/30">
            <p className="text-hell-text-secondary text-sm">
              {authMode === 'login' ? labels.noAccount : labels.haveAccount}{' '}
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setLocalError('');
                }}
                disabled={loading}
                className="text-hell-gold font-bold hover:text-hell-gold-soft transition-smooth disabled:opacity-50"
              >
                {authMode === 'login' ? labels.signUp : labels.signIn}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-hell-orange-dark/30 flex-1" />
            <span className="text-hell-text-secondary text-xs">
              {labels.orContinueWith}
            </span>
            <div className="h-px bg-hell-orange-dark/30 flex-1" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn-hell w-full border-2 border-hell-orange text-hell-orange hover:bg-hell-orange/10 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover-scale active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="spinner" style={{ width: '16px', height: '16px' }} />
                {labels.googleBtn}
              </span>
            ) : (
              <>🔐 {labels.googleBtn}</>
            )}
          </button>
        </div>

        {/* Info Footer */}
        <p className="text-center text-xs text-hell-text-secondary px-4">
          {lang === 'es'
            ? '✅ Tus favoritas se sincronizarán automáticamente en la nube'
            : '✅ Your favorites will be synced to the cloud automatically'}
        </p>
      </div>
    </div>
  );
};

// Giphy API Integration
// Nota: Para producción, usar una API key real con backend proxy

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY || '';
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/search';

// GIFs fallback para cuando no funciona la API
const FALLBACK_GIFS = [
  'https://media.giphy.com/media/3o7TKU0bFa6q5IHjAQ/giphy.gif', // Success
  'https://media.giphy.com/media/l0HlNaQ9hNzQn8AyI/giphy.gif', // Thinking
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Burning
  'https://media.giphy.com/media/3ornk6c7NjIb5E6iEU/giphy.gif', // Fire
  'https://media.giphy.com/media/d3z3cqarg2RBUWVi/giphy.gif', // Devil
];

export const fetchGif = async (query, lang = 'es') => {
  try {
    if (!GIPHY_API_KEY) {
      console.warn('No GIPHY_API_KEY provided, using fallback');
      return getRandomFallbackGif();
    }

    const params = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      q: query,
      limit: 1,
      offset: Math.floor(Math.random() * 100),
      rating: 'pg-13',
    });

    const response = await fetch(`${GIPHY_BASE_URL}?${params}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0].images.original.url;
    }

    return getRandomFallbackGif();
  } catch (error) {
    console.error('Error fetching from Giphy:', error);
    return getRandomFallbackGif();
  }
};

const getRandomFallbackGif = () => {
  return FALLBACK_GIFS[Math.floor(Math.random() * FALLBACK_GIFS.length)];
};

// Precargar un GIF
export const preloadGif = (url) => {
  const img = new Image();
  img.src = url;
  return img;
};

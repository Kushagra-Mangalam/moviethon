// TMDB API Configuration
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to create headers with auth
const createAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// TMDB API calls
export const getPopularMovies = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// Backend API calls - Authentication
export const registerUser = async (userData) => {
  const response = await fetch(`${BACKEND_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${BACKEND_BASE_URL}/auth/me`, {
    headers: createAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get user");
  }

  return data;
};

// Backend API calls - User favorites
export const addToFavorites = async (movieId) => {
  const response = await fetch(
    `${BACKEND_BASE_URL}/users/favorites/${movieId}`,
    {
      method: "POST",
      headers: createAuthHeaders(),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add to favorites");
  }

  return data;
};

export const removeFromFavorites = async (movieId) => {
  const response = await fetch(
    `${BACKEND_BASE_URL}/users/favorites/${movieId}`,
    {
      method: "DELETE",
      headers: createAuthHeaders(),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to remove from favorites");
  }

  return data;
};

export const getFavorites = async () => {
  const response = await fetch(`${BACKEND_BASE_URL}/users/favorites`, {
    headers: createAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get favorites");
  }

  return data;
};

// Additional TMDB API functions for advanced search
export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const discoverMovies = async (params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/discover/movie?${queryParams}`
  );
  const data = await response.json();
  return data;
};

export const getMovieGenres = async () => {
  const response = await fetch(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};

export const getTrendingMovies = async (timeWindow = "week") => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

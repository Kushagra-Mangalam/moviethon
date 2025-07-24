import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");

      console.log("[MovieContext] Loaded from localStorage:", storedFavs);
      if (storedFavs) {
        const parsed = JSON.parse(storedFavs);
        console.log("Parsed favorites:", parsed);
        setFavorites(parsed);
      }
    } catch (e) {
      console.error("Failed to parse stored data:", e);
      localStorage.removeItem("favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("[MovieContext] Saved favorites to localStorage:", favorites);
    }
  }, [favorites, loading]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    const result = favorites.some((movie) => movie.id === movieId);
    return result;
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {!loading ? children : null}
    </MovieContext.Provider>
  );
};

import "../css/MovieCard.css";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/useMovieContext";
import { useNavigate } from "react-router-dom";

const FAVORITES_KEY = "favoriteMovies";

const MovieCard = ({ movie }) => {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    favorites,
    setFavorites,
  } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, [setFavorites]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const onWatchClick = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
          <button className="watch-btn" onClick={onWatchClick}>
            Watch
          </button>
        </div>
      </div>
      <div
        className="movie-info"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export { MovieCard };

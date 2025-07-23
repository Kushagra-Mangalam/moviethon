import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/useMovieContext";
import { useAuth } from "../contexts/useAuth";
import { useToast } from "../contexts/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  const onFavouriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click event

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      if (favorite) {
        removeFromFavorites(movie.id);
        showToast(`${movie.title} removed from favorites`, "success");
      } else {
        addToFavorites(movie);
        showToast(`${movie.title} added to favorites`, "success");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      showToast("Failed to update favorites", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onWatchClick = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.id}`);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Handle both TMDB movies and local movies
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster || "https://via.placeholder.com/500x750?text=No+Image";

  const releaseDate = movie.release_date || movie.releaseYear || "N/A";
  const overview =
    movie.overview || movie.description || "No description available";

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img
          src={posterUrl}
          alt={movie.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavouriteClick}
            disabled={isLoading}
            title={
              isAuthenticated
                ? favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
                : "Login to add favorites"
            }
          >
            {favorite ? "❤️" : "🤍"}
          </button>
          <button
            className="watch-btn"
            onClick={onWatchClick}
            title="Watch movie"
          >
            Watch
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="release-date">{releaseDate}</p>
        <p className="movie-overview">{overview}</p>
        {movie.vote_average && (
          <div className="movie-rating">
            ⭐ {movie.vote_average.toFixed(1)}/10
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

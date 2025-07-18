import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/useMovieContext";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

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

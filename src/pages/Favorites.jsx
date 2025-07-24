import "../css/Favorites.css";
import { useMovieContext } from "../contexts/useMovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => {
            return <MovieCard movie={movie} key={movie.id}></MovieCard>;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites">
      <h2>No favorite movies yet</h2>
      <p>Start adding movies to your favorites by clicking the heart button!</p>
    </div>
  );
};

export { Favorites };

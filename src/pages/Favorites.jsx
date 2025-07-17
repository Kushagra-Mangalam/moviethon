import "../css/Favorites.css";
import { useMovieContext } from "../contexts/useMovieContext";
import { MovieCard } from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites) {
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
      <h2>no favorite movie yet</h2>
    </div>
  );
};

export { Favorites };

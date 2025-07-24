import React, { useEffect, useState } from "react";
import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../services/api";

const Home = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setError("failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <div className="home-header">
        <h1>Popular Movies</h1>
        <p>Discover the most popular movies right now</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id}></MovieCard>;
          })}
        </div>
      )}
    </div>
  );
};

export { Home };

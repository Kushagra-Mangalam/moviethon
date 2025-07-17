import React, { useState } from "react";
import "../css/Home.css";
import { MovieCard } from "../components/MovieCard";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    { id: 1, title: "John Wick", release_date: "2020" },
    { id: 2, title: "interstellar", release_date: "2017" },
    { id: 3, title: "toy story", release_date: "2022" },
    { id: 4, title: "baby boss", release_date: "2015" },
    { id: 5, title: "deva", release_date: "2018" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map((movie) => {
          return <MovieCard movie={movie} key={movie.id}></MovieCard>;
        })}
      </div>
    </div>
  );
};

export { Home };

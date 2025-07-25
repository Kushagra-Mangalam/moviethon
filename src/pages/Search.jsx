import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { useToast } from "../contexts/useToast";
import "../css/Search.css";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const { showToast } = useToast();

  const fetchMovies = useCallback(
    async (pageNum = 1, resetMovies = true) => {
      setLoading(true);
      try {
        let results;

        if (searchQuery.trim()) {
          // Search by query
          const response = await searchMovies(searchQuery, pageNum);
          results = response;
        } else {
          // Show popular movies when no search query
          const popularMovies = await getPopularMovies();
          results = {
            results: popularMovies,
            total_results: popularMovies.length,
            total_pages: 1,
          };
        }

        if (resetMovies || pageNum === 1) {
          setMovies(results.results);
        } else {
          setMovies((prev) => [...prev, ...results.results]);
        }

        setTotalResults(results.total_results);
        setHasMore(pageNum < results.total_pages && results.results.length > 0);
      } catch (error) {
        showToast("Failed to fetch movies", "error");
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, showToast]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchMovies(1, true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fetchMovies]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, false);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-title">
          <h1>Search Movies</h1>
          <p>Find your next favorite movie</p>
        </div>

        <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for movies..."
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>
      </div>

      <div className="search-content">
        <div className="search-results">
          {loading && movies.length === 0 ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching movies...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🎬</div>
              <h3>No movies found</h3>
              <p>
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords.`
                  : "Search for your favorite movies above."}
              </p>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h2>
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : "Popular Movies"}
                </h2>
                <div className="results-meta">
                  {totalResults > 0 && (
                    <span className="results-count">
                      {totalResults.toLocaleString()} movies found
                    </span>
                  )}
                </div>
              </div>

              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {hasMore && (
                <div className="load-more-section">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More Movies"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

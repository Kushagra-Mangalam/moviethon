import { useState, useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { useToast } from "../contexts/useToast";
import {
  getPopularMovies,
  getTrendingMovies,
  discoverMovies,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Recommendations.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState({
    trending: [],
    forYou: [],
    similar: [],
    popular: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("trending");

  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  const getMoviesByGenre = async (genreId) => {
    try {
      const response = await discoverMovies({ with_genres: genreId });
      return response;
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      return { results: [] };
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    console.log("Starting to fetch recommendations...");

    try {
      // Start with just trending movies
      console.log("Fetching trending movies...");
      const trending = await getTrendingMovies("week");
      console.log("Trending movies response:", trending);

      // Start with popular movies
      console.log("Fetching popular movies...");
      const popular = await getPopularMovies();
      console.log("Popular movies response:", popular);

      // Simple default recommendations for now
      let forYou = [];
      let similar = [];

      // Get some basic genre-based movies for "For You" section
      try {
        const actionMovies = await getMoviesByGenre(28); // Action
        forYou = actionMovies.results?.slice(0, 20) || [];
        console.log("Action movies for 'For You':", forYou.length);
      } catch (error) {
        console.error("Error fetching action movies:", error);
      }

      // Get drama movies for "Similar" section
      try {
        const dramaMovies = await getMoviesByGenre(18); // Drama
        similar = dramaMovies.results?.slice(0, 20) || [];
        console.log("Drama movies for 'Similar':", similar.length);
      } catch (error) {
        console.error("Error fetching drama movies:", error);
      }

      const recommendationsData = {
        trending: trending.results || [],
        forYou,
        similar,
        popular: popular.results || [],
      };

      setRecommendations(recommendationsData);
      console.log("Successfully set recommendations:", {
        trending: recommendationsData.trending?.length || 0,
        forYou: recommendationsData.forYou?.length || 0,
        similar: recommendationsData.similar?.length || 0,
        popular: recommendationsData.popular?.length || 0,
      });
    } catch (error) {
      showToast("Failed to load recommendations", "error");
      console.error("Recommendations error:", error);
    } finally {
      setLoading(false);
      console.log("Finished fetching recommendations");
    }
  };

  const sections = [
    {
      id: "trending",
      title: "🔥 Trending Now",
      description: "Movies that are trending this week",
    },
    {
      id: "forYou",
      title: "🎯 For You",
      description: isAuthenticated
        ? "Personalized recommendations based on your taste"
        : "Popular action movies you might enjoy",
    },
    {
      id: "similar",
      title: "🎭 Similar Movies",
      description: isAuthenticated
        ? "Movies similar to your favorites"
        : "Critically acclaimed dramas",
    },
    {
      id: "popular",
      title: "⭐ Popular",
      description: "Most popular movies right now",
    },
  ];

  useEffect(() => {
    fetchRecommendations();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentSection = sections.find((s) => s.id === activeSection);
  const currentMovies = recommendations[activeSection] || [];

  return (
    <div className="recommendations-page">
      <div className="page-header">
        <h1 className="page-title">Movie Recommendations</h1>
        <p className="page-subtitle">
          {isAuthenticated
            ? `Discover your next favorite movie, ${user?.name || "there"}!`
            : "Discover amazing movies tailored just for you"}
        </p>
        {!isAuthenticated && (
          <p className="auth-prompt">
            Sign in to get personalized recommendations!
          </p>
        )}
      </div>

      <div className="section-tabs">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`tab-button ${
              activeSection === section.id ? "active" : ""
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="recommendations-content">
        {loading ? (
          <div className="loading">Loading recommendations...</div>
        ) : (
          <>
            <div className="section-header">
              <h2 className="section-title">{currentSection?.title}</h2>
              <p className="section-description">
                {currentSection?.description}
              </p>
            </div>

            {currentMovies.length === 0 ? (
              <div className="empty-state">
                <h3>No movies found</h3>
                <p>
                  We couldn't find any movies for this section. Please try
                  refreshing the page or check back later.
                </p>
              </div>
            ) : (
              <div className="movies-grid">
                {currentMovies.map((movie) => (
                  <MovieCard
                    key={`${activeSection}-${movie.id}`}
                    movie={movie}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;

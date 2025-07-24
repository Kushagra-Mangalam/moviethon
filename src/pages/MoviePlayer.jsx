import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MoviePlayer = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=2939d0051929136f785aef03f0a5a6c2`
        );

        if (movieResponse.ok) {
          const movieData = await movieResponse.json();
          setMovie(movieData);

          // Fetch movie trailers/videos
          try {
            const videosResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2939d0051929136f785aef03f0a5a6c2`
            );

            if (videosResponse.ok) {
              const videosData = await videosResponse.json();
              const videos = videosData.results || [];

              // Find the best trailer (prefer official trailers from YouTube)
              const officialTrailer = videos.find(
                (video) =>
                  video.type === "Trailer" &&
                  video.site === "YouTube" &&
                  video.official === true
              );

              const anyTrailer = videos.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
              );

              const anyVideo = videos.find((video) => video.site === "YouTube");

              const selectedVideo = officialTrailer || anyTrailer || anyVideo;

              if (selectedVideo) {
                setTrailer({
                  key: selectedVideo.key,
                  name: selectedVideo.name,
                  type: selectedVideo.type,
                });
              }
            }
          } catch (videoError) {
            console.log("Could not load videos:", videoError);
          }
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        console.error("Error loading movie:", err);
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "white",
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Loading movie...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "white",
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "white",
          backgroundColor: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Movie not found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        color: "white",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <h1>{movie.title}</h1>

      {/* Trailer Section */}
      {trailer && (
        <div style={{ marginBottom: "2rem" }}>
          {!showTrailer ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "800px",
                height: "450px",
                backgroundColor: "#333",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
              onClick={() => setShowTrailer(true)}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    transition: "transform 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "15px solid transparent",
                      borderBottom: "15px solid transparent",
                      borderLeft: "25px solid #333",
                      marginLeft: "5px",
                    }}
                  ></div>
                </div>
                <h3 style={{ margin: 0, textAlign: "center" }}>
                  Watch {trailer.type || "Trailer"}
                </h3>
                <p style={{ margin: "0.5rem 0 0 0", opacity: 0.8 }}>
                  {trailer.name}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3>Now Playing: {trailer.name}</h3>
                <button
                  onClick={() => setShowTrailer(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Close Trailer
                </button>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "800px",
                  height: "450px",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title={trailer.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Movie Details Section */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "300px", borderRadius: "8px" }}
          />
        )}
        <div>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          {movie.genres && movie.genres.length > 0 && (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}
          {trailer && (
            <p>
              <strong>Trailer:</strong> {trailer.name} ({trailer.type})
            </p>
          )}
          <p>
            <strong>Overview:</strong>
          </p>
          <p style={{ lineHeight: 1.6, maxWidth: "600px" }}>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;

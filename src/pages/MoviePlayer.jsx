import { useParams } from "react-router-dom";
import movieData from "../data/movies.js";

const MoviePlayer = () => {
  const { id } = useParams();
  const movie = movieData.find((m) => m.id.toString() === id);

  console.log("Movie ID from URL:", id);
  console.log("Matched Movie:", movie);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie?.title || "Movie not found"}</h2>
      {movie ? (
        <iframe
          src={movie.videoUrl}
          width="640"
          height="360"
          style={{ height: "auto", width: "100%", aspectRatio: "640 / 360" }}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          // frameBorder="0"
          title={movie.title}
        ></iframe>
      ) : (
        <p>Movie not found.</p>
      )}
      <p>{movie?.overview}</p>
    </div>
  );
};

export default MoviePlayer;

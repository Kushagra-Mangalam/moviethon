import "../css/MovieCard.css";

const MovieCard = ({ movie }) => {
  const onFavouriteClick = () => {
    alert("clicked");
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} alt={movie.title}></img>
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onFavouriteClick}>
            click me
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

export { MovieCard };

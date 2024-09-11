import { Link } from "react-router-dom";
import Star from "../images/star.svg";

function MovieCard({ movie }) {
  return (
    <Link to={`/detail/${movie.id}`} className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
        alt={movie.original_title}
        className="movie-img"
      />
      <div className="movie-info">
        <div className="rating">
          <img src={Star} alt="Star" className="star" />
          <span className="vote-average">{movie.vote_average.toFixed(1)}</span>
        </div>
        <span className="movie-title">{movie.original_title}</span>
      </div>
    </Link>
  );
}

export default MovieCard;

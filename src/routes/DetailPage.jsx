import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2EzNmQxNzdiZDc2NTc1NjQ2OWM2ZmFlNjdlYWEzZCIsIm5iZiI6MTcyNTYxMDEyMC4xNjU0NjEsInN1YiI6IjY2ZDg1Nzc0MWJmMGY4M2YzZThmMDZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ow_RQcYQp9qomE_edJwa74XMo3b_QOo_o8g_gnrz1rk",
          },
        }
      );
      setMovie(res.data);
    }
    fetchMovieDetails();
  }, [id]);

  if (!movie) return null;

  return (
    <div className="detail-container">
      <div className="detail-poster">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className="detail-content">
        <h1 className="detail-title">{movie.original_title}</h1>
        <p className="detail-tagline">
          {movie.tagline || "No tagline available"}
        </p>
        <p className="detail-overview">{movie.overview}</p>

        <div className="detail-metadata">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Vote Average:</strong> {movie.vote_average.toFixed(1)}
          </p>
          <p>
            <strong>Budget:</strong> ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
          </p>
        </div>

        <div className="detail-genres">
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </div>

        <div className="detail-languages">
          <strong>Spoken Languages:</strong>{" "}
          {movie.spoken_languages.map((lang) => lang.name).join(", ")}
        </div>

        <div className="detail-companies">
          <strong>Production Companies:</strong>{" "}
          {movie.production_companies.map((company) => company.name).join(", ")}
        </div>

        {movie.homepage && (
          <div className="detail-link">
            <strong>Homepage:</strong>{" "}
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              Visit Official Site
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPage;

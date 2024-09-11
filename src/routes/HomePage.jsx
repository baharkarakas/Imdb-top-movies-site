import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const fetchedPages = useRef([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: "Bearer YOUR_API_KEY",
            },
          }
        );

        if (!fetchedPages.current.includes(page)) {
          setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
          setFilteredMovies((prevMovies) => [
            ...prevMovies,
            ...res.data.results,
          ]); // Initialize filteredMovies
          fetchedPages.current = [...fetchedPages.current, page];
          setHasMoreMovies(res.data.page < res.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    getMovies();

    function handleScroll() {
      if (window.scrollY > 50) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = movies.filter((movie) =>
      movie.original_title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <Header
        className={isNavbarHidden ? "nav--hidden" : ""}
        onSearch={handleSearch}
      />
      <div className="content">
        <div className="movie-row">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {hasMoreMovies && (
          <button className="load-more" onClick={loadMoreMovies}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default HomePage;

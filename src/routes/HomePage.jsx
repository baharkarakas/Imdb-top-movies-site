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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const queryParam = searchQuery
          ? `&query=${encodeURIComponent(searchQuery)}`
          : "";
        const url = searchQuery
          ? `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}${queryParam}`
          : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

        const res = await axios.get(url, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2EzNmQxNzdiZDc2NTc1NjQ2OWM2ZmFlNjdlYWEzZCIsIm5iZiI6MTcyNjEyMjUwNi43NjI5MjUsInN1YiI6IjY2ZDg1Nzc0MWJmMGY4M2YzZThmMDZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjlKvw2iLEcsxCMAOglfmztNd2ut51Q1jnul68g3mLY",
          },
        });

        console.log(res.data);

        if (!fetchedPages.current.includes(page)) {
          if (page === 1) {
            setMovies(res.data.results);
            setFilteredMovies(res.data.results);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
            setFilteredMovies((prevMovies) => [
              ...prevMovies,
              ...res.data.results,
            ]);
          }
          fetchedPages.current = [...fetchedPages.current, page];
          setHasMoreMovies(res.data.page < res.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    getMovies();
  }, [page, searchQuery]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchedPages.current = [];
    setMovies([]);
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

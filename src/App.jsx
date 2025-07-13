import { useState, useEffect, useRef } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import NotFound from "./NotFound"; // 404 page component

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  const searchMovies = async (title, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}&s=${title}&page=${pageNum}`);
      const data = await response.json();

      if (data.Response === "True") {
        if (pageNum === 1) {
          setMovies(data.Search);
        } else {
          setMovies(prev => [...prev, ...data.Search]);
        }
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Batman", 1);
  }, []);

  // Debounced input
  const handleSearchInput = (value) => {
    setSearchTerm(value);
    setPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        searchMovies(value, 1);
      }
    }, 500);
  };

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !loading && !error && searchTerm.trim()) {
        const nextPage = page + 1;
        setPage(nextPage);
        searchMovies(searchTerm, nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, error, searchTerm]);

  return (
    <div className="app">
      <h1>Film Escape</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            if (searchTerm.trim()) {
              searchMovies(searchTerm, 1);
              setPage(1);
            }
          }}
        />
      </div>

      {loading && <div className="loader"></div>}

      {error && (
        <div className="empty">
          <h2>{error}</h2>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="container">
          {movies.map((movie) =>
            movie.imdbID ? (
              <MovieCard key={movie.imdbID} movie={movie} />
            ) : (
              <NotFound key={Math.random()} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;

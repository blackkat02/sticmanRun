import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../api/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesByQuery(query);
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && query && (
        <p className={styles.noResults}>No movies found for "{query}"</p>
      )}
    </div>
  );
};

export default MoviesPage;
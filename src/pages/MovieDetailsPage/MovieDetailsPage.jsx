import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Outlet, NavLink, Link } from 'react-router-dom';
import { fetchMovieById } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Для скасування запиту

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieById(movieId, { signal: controller.signal });
        setMovie(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovie();

    return () => controller.abort(); // Скасування запиту при розмонтуванні
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ← Повернутись назад
      </Link>

      <div className={styles.movieInfo}>
        <img
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : '/placeholder.jpg'
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h1>{movie.title} ({movie.release_date?.substring(0, 4)})</h1>
          <p>Рейтинг: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Опис</h2>
          <p>{movie.overview || 'Опис відсутній'}</p>
          <h2>Жанри</h2>
          <p>{movie.genres?.map(genre => genre.name).join(', ') || 'Невідомо'}</p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3>Додаткова інформація</h3>
        <nav className={styles.nav}>
          <NavLink 
            to="cast" 
            className={({ isActive }) => 
              isActive ? styles.activeLink : styles.link
            }
          >
            Акторський склад
          </NavLink>
          <NavLink 
            to="reviews"
            className={({ isActive }) => 
              isActive ? styles.activeLink : styles.link
            }
          >
            Рецензії
          </NavLink>
        </nav>
      </div>

      <Outlet context={{ movieId, movie }} />
    </div>
  );
};

export default MovieDetailsPage;
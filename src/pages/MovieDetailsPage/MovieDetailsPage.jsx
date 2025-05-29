import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Outlet, NavLink } from 'react-router-dom';
import { fetchMovieById } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isComponentActive = true;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieById(movieId);
        
        if (isComponentActive) {
          setMovie(data);
          console.log(location.state)
        }
      } catch (err) {
        if (isComponentActive) {
          setError(err.message);
        }
      } finally {
        if (isComponentActive) {
          setLoading(false);
        }
      }
    };

    fetchMovie();

    return () => {
      isComponentActive = false;
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <div className={styles.wrapper}>
      <MovieDetails movie={movie} backLink={backLinkRef.current} />
   
      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <nav className={styles.nav}>
          <NavLink 
            to="cast"
            className={({ isActive }) => 
              isActive ? styles.activeLink : styles.link
            }
          >
            cast
          </NavLink>
          <NavLink 
            to="reviews"
            className={({ isActive }) => 
              isActive ? styles.activeLink : styles.link
            }
          >
            review
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
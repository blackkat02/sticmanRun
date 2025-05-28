import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {movies.length > 0 ? (
        <ul className={styles.list}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.item}>
              <Link 
                to={`/movies/${movie.id}`}
                state={{ 
                  from: `${location.pathname}${location.search}`
                }}
                className={styles.link}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
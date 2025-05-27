import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './MovieList.module.css'; // Використовуйте CSS-модулі

const MovieList = ({ movies }) => {
  const location = useLocation();

  // Видаліть console.log з рендеру - це може спричинити проблеми
  // console.log(movie.id) - краще використовувати DevTools для налагодження

  return (
    <div className={styles.container}>
      {movies.length > 0 ? (
        <ul className={styles.list}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.item}>
              <Link 
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { 
                    from: location,
                    // Додайте додаткові дані, якщо потрібно:
                    searchQuery: location.search || null
                  }
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

// Додайте перевірку типів пропсів
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieList;
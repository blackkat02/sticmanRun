import { Link } from 'react-router-dom';
import styles from './MovieDetails.module.css';

const MovieDetails = ({ movie, backLink }) => {
  
  return (
    <div className={styles.container}>
      <Link to={backLink || '/movies'} className={styles.backLink}>
        ← Go back
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
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview || 'No Overview'}</p>
          <h2>Genres</h2>
          <p>{movie.genres?.map(genre => genre.name).join(', ') || 'No Genres'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!cast || cast.length === 0) return <p className={styles.noInfo}>No info</p>;

  return (
    <div className={styles.castContainer}>
      <h3 className={styles.title}>Акторський склад</h3>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={actor.profile_path 
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : '/actor-placeholder.jpg'
              }
              alt={actor.name}
              className={styles.actorPhoto}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.actorCharacter}>Роль: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
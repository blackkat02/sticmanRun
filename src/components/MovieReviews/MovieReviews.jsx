import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
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
  if (!reviews.length) return <p className={styles.noInfo}>Немає рецензій до цього фільму</p>;

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.title}>Reviews</h3>
      <ul className={styles.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={styles.reviewItem}>
            <h4 className={styles.author}>{review.author}</h4>
            <p className={styles.content}>{review.content}</p>
            <p className={styles.date}>
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
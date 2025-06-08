import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ReviewsList from '../ReviewsList/ReviewsList'; 
import styles from './CamperReviews.module.css'; 

const CamperReviews = () => {
  const { camper } = useOutletContext(); 

  if (!camper || !camper.reviews) {
    return <p>Немає даних для відображення відгуків.</p>;
  }

  return (
    <div className={styles.reviewsWrapper}>
      <ReviewsList reviews={camper.reviews} />
    </div>
  );
};

export default CamperReviews;
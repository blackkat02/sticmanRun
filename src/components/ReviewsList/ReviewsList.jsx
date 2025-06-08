import React from 'react';
import styles from './ReviewsList.module.css'; 

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>Відгуків поки що немає.</p>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className={styles.starFilled}>⭐</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>☆</span>);
      }
    }
    return <div className={styles.starsContainer}>{stars}</div>;
  };

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.reviewItem}>
          <div className={styles.reviewerHeader}>
            <div className={styles.avatar}>{review.reviewer_name.charAt(0).toUpperCase()}</div>
            <div>
              <p className={styles.reviewerName}>{review.reviewer_name}</p>
              {renderStars(review.reviewer_rating)}
            </div>
          </div>
          <p className={styles.reviewComment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
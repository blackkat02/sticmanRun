import PropTypes from 'prop-types';
import styles from './Feedback.module.css';

const Feedback = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const positive = Math.round((good / totalFeedback) * 100);

  return (
    <div className={styles.feedbackContainer}>
      <ul className={styles.feedbackList}>
        <li>Good: {good}</li>
        <li>Neutral: {neutral}</li>
        <li>Bad: {bad}</li>
        <li>Total: {totalFeedback}</li>
        <li>Positive: {positive}%</li>
      </ul>
    </div>
  );
};

Feedback.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
};

export default Feedback;
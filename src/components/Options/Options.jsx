import PropTypes from 'prop-types';
import styles from './Options.module.css';

const Options = ({ onUpdateFeedback, onResetFeedback, totalFeedback = 0 }) => {
  return (
    <div className={styles.options}>
      <button 
        type="button"
        className={`${styles.button} ${styles.good}`} 
        onClick={() => onUpdateFeedback('good')}
      >
        Good
      </button>
      <button 
        type="button"
        className={`${styles.button} ${styles.neutral}`} 
        onClick={() => onUpdateFeedback('neutral')}
      >
        Neutral
      </button>
      <button 
        type="button"
        className={`${styles.button} ${styles.bad}`} 
        onClick={() => onUpdateFeedback('bad')}
      >
        Bad
      </button>
      
      {totalFeedback > 0 && (
        <button 
          type="button"
          className={styles.resetButton} 
          onClick={onResetFeedback}
        >
          Reset
        </button>
      )}
    </div>
  );
};

Options.propTypes = {
  onUpdateFeedback: PropTypes.func.isRequired,
  onResetFeedback: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number,
};

Options.defaultProps = {
  totalFeedback: 0,
};

export default Options;
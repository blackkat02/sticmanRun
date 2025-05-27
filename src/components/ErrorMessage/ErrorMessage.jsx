import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message = 'Сталася помилка' }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <h3 className={styles.errorTitle}>Помилка</h3>
        <p className={styles.errorMessage}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

const Notification = ({ message = 'No feedback yet' }) => {
  return (
    <div className={styles.notification}>
      <p className={styles.notificationText}>
        {message}
      </p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: 'No feedback yet',
};

export default Notification;
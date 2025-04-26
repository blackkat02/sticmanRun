import PropTypes from 'prop-types';
import styles from './FriendListItem.module.css';

const FriendListItem = ({ avatar, name, isOnline }) => (
  <div className={styles.item}>
    <span className={isOnline ? styles.online : styles.offline}></span>
    <img className={styles.avatar} src={avatar} alt="User avatar" width="48" />
    <p className={styles.name}>{name}</p>
    <p className={isOnline ? styles.online : styles.offline}>
      {isOnline ? 'Online' : 'Offline'}
    </p>
  </div>
);

FriendListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default FriendListItem;

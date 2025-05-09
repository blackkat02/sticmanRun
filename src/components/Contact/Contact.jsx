import PropTypes from 'prop-types';
import { FaUser, FaPhone, FaRegTrashAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={styles.item}>
      <div className={styles.contactInfo}>
        <div className={styles.infoRow}>
          <FaUser className={styles.icon} />
          <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.infoRow}>
          <FaPhone className={styles.icon} />
          <span className={styles.number}>{number}</span>
        </div>
      </div>
      
      <button 
        className={styles.deleteBtn}
        onClick={() => onDelete(id)}
        aria-label="Видалити контакт"
      >
        <FaRegTrashAlt className={styles.btnIcon} />
        <span className={styles.btnText}>Delete</span>
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
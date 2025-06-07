import { useLocation } from 'react-router-dom';
// useSelector тут більше не потрібен, оскільки список передається через пропси
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

// CampersList отримує список кемперів, які вже відфільтровані та пагіновані
const CampersList = ({ campers }) => { 
  const location = useLocation();

  return (
    <div className={styles.container}>
      {Array.isArray(campers) && campers.length > 0 ? ( 
        <ul className={styles.list}>
          {campers.map(camper => (
            // Важливо: перевірте, чи використовується `_id` або `id` у ваших даних
            <CamperCard key={camper._id || camper.id} camper={camper} location={location} />
          ))}
        </ul>
        
        
      ) : (
        <p className={styles.emptyMessage}>Кемперів не знайдено.</p>
      )}
    </div>
  );
};

export default CampersList;
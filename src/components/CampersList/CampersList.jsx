import { useLocation } from 'react-router-dom';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = ({ campers }) => { 
  const location = useLocation();

  return (
    <div className={styles.container}>
      {Array.isArray(campers) && campers.length > 0 ? ( 
        <ul className={styles.list}>
          {campers.map(camper => (
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
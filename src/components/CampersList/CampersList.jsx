import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectVisibleItems } from '../../redux/catalogSlice';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = () => {
  const location = useLocation();
  const campers = useSelector(selectVisibleItems);

  return (
    <div className={styles.container}>
      {campers.length > 0 ? (
        <ul className={styles.list}>
          {campers.map(camper => (
            <CamperCard 
              key={camper._id || camper.id} 
              camper={camper} 
              location={location} 
            />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No campers found.</p>
      )}
    </div>
  );
};

export default CampersList;
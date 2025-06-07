import { useLocation } from 'react-router-dom';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

// CampersList now receives the already filtered/paginated 'campers' as a prop
const CampersList = ({ campers }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {Array.isArray(campers) && campers.length > 0 ? ( // Check if campers is an array and not empty
        <ul className={styles.list}>
          {campers.map(camper => (
            // Ensure camper.id or camper._id is unique for the key
            <CamperCard key={camper._id || camper.id} camper={camper} location={location} />
          ))}
        </ul>
      ) : (
        // Message when no campers are found (e.g., due to filters or initial empty state)
        <p className={styles.emptyMessage}>No campers found.</p>
      )}
    </div>
  );
};

export default CampersList;
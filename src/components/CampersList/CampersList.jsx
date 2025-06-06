import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectFilteredCampers } from '../../redux/catalogSlice';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = ({ campers }) => {
  const location = useLocation();
  const filteredCampers = useSelector(selectFilteredCampers);
  const displayedCampers = filteredCampers || campers;

  return (
    <div className={styles.container}>
      {displayedCampers.length > 0 ? (
        <ul className={styles.list}>
          {displayedCampers.map(camper => (
            <CamperCard key={camper.id} camper={camper} location={location} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No campers found</p>
      )}
    </div>
  );
};

export default CampersList;
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCatalogSlice } from '../../redux/catalogSlice';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = () => {
  const location = useLocation();
  const filteredCampers = useSelector(selectCatalogSlice);

  const displayedCampers = filteredCampers;

  console.log('Displayed Campers in CampersList:', displayedCampers);

  return (
    <div className={styles.container}>
      {Array.isArray(displayedCampers) && displayedCampers.length > 0 ? (
        <ul className={styles.list}>
          {displayedCampers.map(camper => (
            <CamperCard key={camper.id} camper={camper} location={location} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>Кемперів не знайдено.</p>
      )}
    </div>
  );
};

export default CampersList;

import { Link, useLocation } from "react-router-dom";
import {selectFilteredCampers } from '../../redux/catalogSlice';
import CamperCard from '../CamperCard/CamperCard';
import styles from './CampersList.module.css';

const CampersList = () => {
  const location = useLocation();
  const filteredContacts = useSelector(selectFilteredCampers);

  return (
    <div className={styles.container}>
      {catalog.length > 0 ? (
      <CamperCard       
        key={camper.id}
        id={camper.id}
        name={camper.name}
        price={camper.price}
        rating={camper.rating}
        reviewsLenght={camper.reviews.lenght}
        location={camper.location}
        description={camper.description}
        transmission={camper.transmission}
        engine={camper.engine}
        kitchen={camper.kitchen}
        AC={camper.AC}
        />
      ) : (
        <p className={styles.emptyMessage}>No campers found</p>
      )}
    </div>
  );
};

export default CampersList;
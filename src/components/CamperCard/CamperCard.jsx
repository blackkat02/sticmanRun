import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper, location }) => {
  const {
    id,
    name,
    price,
    rating,
    reviews = [],
    location: camperLocation,
    description,
    transmission,
    engine,
    details = {}
  } = camper;

  return (
    <li className={styles.item}>
      <Link 
        to={`/campers/${id}`}
        state={{ 
          from: `${location.pathname}${location.search}`
        }}
        className={styles.link}
      >
        <h3>{name}</h3>
        <p>Price: {price}</p>
        <p>Rating: {rating} ({reviews.length} reviews)</p>
        <p>Location: {camperLocation}</p>
        <p>Description: {description}</p>
        <p>Transmission: {transmission}</p>
        <p>Engine: {engine}</p>
        {details.kitchen && <p>Kitchen available</p>}
        {details.AC && <p>Air conditioning available</p>}
      </Link>
    </li>
  );
};

export default CamperCard;

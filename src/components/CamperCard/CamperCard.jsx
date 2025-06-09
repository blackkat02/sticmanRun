import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';
import FavoriteToggleButton from '../FavoriteToggleButton/FavoriteToggleButton'; 
import Icon from '../Icon/Icon'; 

const CamperCard = ({ camper }) => {
  const {
    id,
    name,
    price,
    rating,
    reviews = [],
    location: camperLocation,
    description,
    form,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    gallery = [],
    details = {}, 
  } = camper;

  let vehicleTypeDisplay = '';
  switch (form) {
    case 'panelTruck':
      vehicleTypeDisplay = 'Вен';
    case 'fullyIntegrated':
      vehicleTypeDisplay = 'Інтегрований';
      break;
    case 'alcove':
      vehicleTypeDisplay = 'Альков';
      break;
    default:
      vehicleTypeDisplay = form; 
  }

  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
          {gallery.length > 0 && (
            <div className={styles.imageWrapper}>
              <img
                src={gallery[0].original || gallery[0].thumb}
                alt={`${name} thumbnail`}
                className={styles.camperImage}
              />
            </div>
          )}
        <FavoriteToggleButton camperId={id} /> 
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.priceAndRating}>
                <p className={styles.price}>€{price.toFixed(2)}</p>
                <p className={styles.rating}><span className={styles.starIcon}>⭐️</span> {rating} ({reviews.length} відгуків)</p>
                <p className={styles.location}><span className={styles.mapPinIcon}>📍</span> {camperLocation}</p>
            </div>
        </div>

        <p className={styles.descriptionText}>{description}</p>

        <div className={styles.detailsList}>
          {AC && <span className={styles.detailItem}><Icon name="AC" /> AC</span>}
          {transmission === 'automatic' && <span className={styles.detailItem}><Icon name="transmission" /> Automatic</span>}
          {kitchen && <span className={styles.detailItem}><Icon name="kitchen" /> Kitchen</span>}
          {TV && <span className={styles.detailItem}><Icon name="TV" /> TV</span>}
          {bathroom && <span className={styles.detailItem}><Icon name="bathroom" /> Bathroom</span>}
          {radio && <span className={styles.detailItem}><Icon name="radio" /> Radio</span>}
          {refrigerator && <span className={styles.detailItem}><Icon name="refrigerator" /> Refrigerator</span>}
          {microwave && <span className={styles.detailItem}><Icon name="microwave" /> Microwave</span>}
          {gas && <span className={styles.detailItem}><Icon name="gas" /> Gas</span>}
          {water && <span className={styles.detailItem}><Icon name="water" /> Water</span>}
          {details.beds > 0 && <span className={styles.detailItem}><Icon name="beds" /> {details.beds} beds</span>}
          <span className={styles.detailItem}><Icon name="form" /> {vehicleTypeDisplay}</span>
        </div>

        <Link
          to={`/campers/${id}`} 
          className={styles.showMoreButton}
        >
          Show more
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;

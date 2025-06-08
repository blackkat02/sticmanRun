import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import { selectFavoriteItems } from '../../redux/store';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);

  const {
    id,
    name,
    price,
    rating,
    reviews = [],
    location: camperLocation,
    description,
    form,
    length,
    width,
    height,
    tank,
    consumption,
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
  } = camper;

  const isFavorite = favoriteItems.includes(id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  let vehicleTypeDisplay = '';
  switch (form) {
    case 'panelTruck':
      vehicleTypeDisplay = 'Фургон';
      break;
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
        <Link
          to={`/campers/${id}`} 
          className={styles.imageLink}
        >
          {gallery.length > 0 && (
            <div className={styles.imageWrapper}>
              <img
                src={gallery[0].original || gallery[0].thumb}
                alt={`${name} thumbnail`}
                className={styles.camperImage}
              />
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.priceAndRating}>
                <p className={styles.price}>${price}</p>
                <p className={styles.rating}><span className={styles.starIcon}>⭐️</span> {rating} ({reviews.length} відгуків)</p>
                <p className={styles.location}><span className={styles.mapPinIcon}>📍</span> {camperLocation}</p>
            </div>
        </div>

        <p className={styles.descriptionText}>{description}</p>

        <div className={styles.detailsList}>
          {AC && <span className={styles.detailItem}>AC</span>}
          {transmission === 'automatic' && <span className={styles.detailItem}>Automatic</span>}
          {kitchen && <span className={styles.detailItem}>Kitchen</span>}
          {TV && <span className={styles.detailItem}>TV</span>}
          {bathroom && <span className={styles.detailItem}>Bathroom</span>}
          {radio && <span className={styles.detailItem}>Radio</span>}
          {refrigerator && <span className={styles.detailItem}>Refrigerator</span>}
          {microwave && <span className={styles.detailItem}>Microwave</span>}
          {gas && <span className={styles.detailItem}>Gas</span>}
          {water && <span className={styles.detailItem}>Water</span>}
          {camper.details?.beds && <span className={styles.detailItem}>{camper.details.beds} beds</span>}
          <span className={styles.detailItem}>{vehicleTypeDisplay}</span>
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
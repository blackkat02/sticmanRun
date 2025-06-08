import React, { useEffect } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom'; // <--- Додано NavLink, Outlet
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from '../../redux/campersOps';
import { clearSelectedCamper } from '../../redux/catalogSlice';
import { selectSelectedCamper, selectIsLoading, selectError } from '../../redux/catalogSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import { selectFavoriteItems } from '../../redux/store'; 
import styles from './CamperDetailsPage.module.css'; 
import BookingForm from '../../components/BookingForm/BookingForm'; 

const Icon = ({ name }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'transmission': return '⚙️';
      case 'engine': return '⛽';
      case 'AC': return '❄️';
      case 'bathroom': return '🚿';
      case 'kitchen': return '🍳';
      case 'TV': return '📺';
      case 'radio': return '📻';
      case 'refrigerator': return '🧊';
      case 'microwave': return '♨️';
      case 'gas': return '🔥';
      case 'water': return '💧';
      case 'length': return '📏';
      case 'width': return '↔️';
      case 'height': return '↕️';
      case 'tank': return '💧'; 
      case 'consumption': return '📊';
      case 'beds': return '🛏️';
      case 'form': return '🚐';
      default: return '❓';
    }
  };
  return <span className={styles.iconPlaceholder}>{getIcon(name)}</span>;
};


const CamperDetailsPage = () => {
  const { camperId } = useParams(); 
  const dispatch = useDispatch();

  const camper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const favoriteItems = useSelector(selectFavoriteItems);

  const isFavorite = camper ? favoriteItems.includes(camper._id || camper.id) : false; 

  useEffect(() => {
    dispatch(getDetailsCampersSliceThunk(camperId));

    return () => {
      dispatch(clearSelectedCamper());
    };
  }, [dispatch, camperId]);

  const handleToggleFavorite = () => {
    if (!camper) return; 
    const idToToggle = camper._id || camper.id; 
    if (isFavorite) {
      dispatch(removeFromFavorites(idToToggle));
    } else {
      dispatch(addToFavorites(idToToggle));
    }
  };

  if (isLoading && !camper) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={styles.error}>Помилка завантаження даних: {error}</div>;
  }

  if (!camper) {
    return <div className={styles.notFound}>Кемпер не знайдено.</div>;
  }

  return (
    <div className={styles.detailsPageContainer}>
      <div className={styles.header}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.meta}>
          <p className={styles.rating}><span className={styles.starIcon}>⭐</span> {camper.rating} ({camper.reviews.length} Reviews)</p>
          <p className={styles.location}><span className={styles.mapPinIcon}>📍</span> {camper.location}</p>
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original || image.thumb}
            alt={`${camper.name} ${index + 1}`}
            className={styles.galleryImage}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <NavLink
          to="features" 
          className={({ isActive }) => (isActive ? styles.tabButtonActive : styles.tabButton)}
        >
          Features
        </NavLink>
        <NavLink
          to="reviews" 
          className={({ isActive }) => (isActive ? styles.tabButtonActive : styles.tabButton)}
        >
          Reviews
        </NavLink>
      </div>

      <div className={styles.tabContent}>
        <div className={styles.mainContent}>
            <Outlet context={{ camper }} /> 
        </div>

        <div className={styles.bookingFormSection}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;

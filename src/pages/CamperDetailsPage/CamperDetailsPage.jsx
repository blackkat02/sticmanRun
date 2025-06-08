import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsCampersSliceThunk, clearSelectedCamper } from '../../redux/catalogSlice';
import { selectSelectedCamper, selectIsLoading, selectError } from '../../redux/catalogSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import { selectFavoriteItems } from '../../redux/store'; 
import styles from './CamperDetailsPage.module.css'; 
import BookingForm from '../../components/BookingForm/BookingForm'; 
import ReviewsList from '../../components/ReviewsList/ReviewsList'; 

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
      case 'tank': return '💧'; // Or another icon for tank
      case 'consumption': return '📊';
      case 'beds': return '🛏️';
      case 'form': return '🚐';
      default: return '❓';
    }
  };
  return <span className={styles.iconPlaceholder}>{getIcon(name)}</span>;
};

const CamperDetailsPage = () => {
  const { camperId } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const location = useLocation(); // Used for back navigation if needed

  const camper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const favoriteItems = useSelector(selectFavoriteItems);

  const isFavorite = camper ? favoriteItems.includes(camper._id || camper.id) : false; // Handle _id or id

  const [activeTab, setActiveTab] = useState('features'); // State for tabs: 'features' or 'reviews'

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

  // Determine vehicle type for display
  let vehicleTypeDisplay = '';
  switch (camper.form) {
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
      vehicleTypeDisplay = camper.form;
  }

  // Collect characteristics (equipment) for display
  const characteristics = [
    camper.transmission === 'automatic' && { label: 'Automatic', icon: 'transmission' },
    camper.engine && { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: 'engine' },
    camper.AC && { label: 'AC', icon: 'AC' },
    camper.bathroom && { label: 'Bathroom', icon: 'bathroom' },
    camper.kitchen && { label: 'Kitchen', icon: 'kitchen' },
    camper.TV && { label: 'TV', icon: 'TV' },
    camper.radio && { label: 'Radio', icon: 'radio' },
    camper.refrigerator && { label: 'Refrigerator', icon: 'refrigerator' },
    camper.microwave && { label: 'Microwave', icon: 'microwave' },
    camper.gas && { label: 'Gas', icon: 'gas' },
    camper.water && { label: 'Water', icon: 'water' },
    camper.details?.beds && { label: `${camper.details.beds} beds`, icon: 'beds' },
    camper.form && { label: vehicleTypeDisplay, icon: 'form' },
  ].filter(Boolean); // Remove falsy values

  // Collect details for display
  const details = [
    camper.length && { label: `Length: ${camper.length}`, icon: 'length' },
    camper.width && { label: `Width: ${camper.width}`, icon: 'width' },
    camper.height && { label: `Height: ${camper.height}`, icon: 'height' },
    camper.tank && { label: `Tank: ${camper.tank}`, icon: 'tank' },
    camper.consumption && { label: `Consumption: ${camper.consumption}`, icon: 'consumption' },
  ].filter(Boolean);


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
        <button
          className={`${styles.tabButton} ${activeTab === 'features' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'features' && (
          <div className={styles.featuresContent}>
            <div className={styles.characteristicsSection}>
              <h3 className={styles.sectionTitle}>Vehicle Characteristics</h3>
              <ul className={styles.characteristicsList}>
                {characteristics.map((char, index) => (
                  <li key={index} className={styles.characteristicItem}>
                    <Icon name={char.icon} /> {char.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.detailsSection}>
              <h3 className={styles.sectionTitle}>Details</h3>
              <ul className={styles.detailsSpecsList}>
                {details.map((detail, index) => (
                  <li key={index} className={styles.detailSpecItem}>
                    <Icon name={detail.icon} /> {detail.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviewsContent}>
            <ReviewsList reviews={camper.reviews} />
          </div>
        )}

        <div className={styles.bookingFormSection}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
import React, { useEffect } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsCampersSliceThunk } from '../../redux/campersOps';
import { selectSelectedCamper, selectIsLoading, selectError, clearSelectedCamper } from '../../redux/catalogSlice';
import styles from './CamperDetailsPage.module.css'; 
import BookingForm from '../../components/BookingForm/BookingForm'; 
import Loader from '../../components/Loader/Loader'; 
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FavoriteToggleButton from '../../components/FavoriteToggleButton/FavoriteToggleButton';

const CamperDetailsPage = () => {
  const { camperId } = useParams(); 
  const dispatch = useDispatch();

  const camper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getDetailsCampersSliceThunk(camperId));

    return () => {
      dispatch(clearSelectedCamper());
    };
  }, [dispatch, camperId]);

  if (isLoading && !camper) {
    return <Loader /> 
  }

  if (error) {
    return <ErrorMessage />;
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
          <FavoriteToggleButton camperId={camper._id || camper.id} />
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
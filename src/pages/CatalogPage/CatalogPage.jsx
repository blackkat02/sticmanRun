import FilterBar from '../../components/FilterBar/FilterBar'
// import CampersList from '../../components/CampersList/CampersList'
import styles from './CatalogPage.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCatalogItems,
  selectTotalCampersCount,
  selectIsLoading,
  selectError,
 
  // selectFilteredCampers,
} from '../../redux/catalogSlice'
import { getCatalogSliceThunk } from '../../redux/campersOps'; // Імпортуємо Thunk

const CatalogPage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(selectCatalogItems);
  const totalCount = useSelector(selectTotalCampersCount);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // const currentPage = useSelector(selectCurrentPage);
  // const totalPages = useSelector(selectTotalPages);

  // Якщо вам потрібен фільтрований список:
  // const filteredCampers = useSelector(selectFilteredCampers);

  useEffect(() => {
    dispatch(getCatalogSliceThunk()); // Викликаємо Thunk для завантаження даних
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Помилка: Не вдалося завантажити кемпери.</div>;
  }

  
  return (
    <section>
      <div className={styles.container}>
        <FilterBar />
        <CampersList 
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
        
      </div>
    </section>
  )
}

export default CatalogPage;

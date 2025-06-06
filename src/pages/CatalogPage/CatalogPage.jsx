import FilterBar from '../../components/FilterBar/FilterBar'
import CampersList from '../../components/CampersList/CampersList'
import styles from './CatalogPage.module.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCatalogItems,
  selectTotalCampersCount,
  selectIsLoading,
  selectError,
} from '../../redux/catalogSlice'
import { getCatalogSliceThunk } from '../../redux/campersOps';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(selectCatalogItems);
  const totalCount = useSelector(selectTotalCampersCount);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getCatalogSliceThunk());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to load campers.</div>;
  }

  return (
    <section>
      <div className={styles.container}>
        <FilterBar />
        <CampersList campers={catalog} />
      </div>
    </section>
  )
}

export default CatalogPage;
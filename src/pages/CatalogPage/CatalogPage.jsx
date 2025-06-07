import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVisibleItems,
  selectLoadMore, 
  selectIsLoading,
  selectError,
  loadMoreItems, 
  resetCatalogState,
} from '../../redux/catalogSlice';
import { getCatalogSliceThunk } from '../../redux/campersOps'; 
import FilterBar from '../../components/FilterBar/FilterBar'; 
import CampersList from '../../components/CampersList/CampersList';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectVisibleItems);
  const shouldShowLoadMore = useSelector(selectLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(resetCatalogState()); 
    dispatch(getCatalogSliceThunk());
  }, [dispatch]);


  const handleLoadMore = useCallback(() => {
    if (shouldShowLoadMore) {
      dispatch(loadMoreItems()); 
    }
  }, [dispatch, shouldShowLoadMore]);

  if (isLoading && campers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Завантаження кемперів...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Помилка: Не вдалося завантажити кемпери.</div>;
  }

  if (!isLoading && campers.length === 0 && !shouldShowLoadMore) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Кемперів не знайдено.</div>;
  }

  return (
    <section>
      <div className={styles.container}>
        <FilterBar />
        <CampersList campers={campers} />

        {shouldShowLoadMore && ( 
          <div className={styles.loadMoreWrapper}>
            <button 
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
            >
              Load more...
            </button>
          </div>
        )}

        {!shouldShowLoadMore && campers.length > 0 && (
          <div className={styles.noMoreMessage}>Більше кемперів немає.</div>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
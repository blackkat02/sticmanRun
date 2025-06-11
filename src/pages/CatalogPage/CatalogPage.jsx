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

  const showNoCampersMessage = !isLoading && campers.length === 0 && !error;

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <FilterBar />

          <div className={styles.mainContent}> 
            {isLoading && campers.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px' }}>Завантаження кемперів...</div>
            )}

            {error && (
              <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Помилка: Не вдалося завантажити кемпери. {error}</div>
            )}

            {campers.length > 0 && <CampersList campers={campers} />}

            {showNoCampersMessage && (
              <div style={{ textAlign: 'center', padding: '20px' }}>Кемперів за вашими критеріями не знайдено. Спробуйте змінити фільтри.</div>
            )}

            {shouldShowLoadMore && (
              <div className={styles.loadMoreWrapper}>
                <button
                  className={styles.loadMoreButton}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : 'Load more'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
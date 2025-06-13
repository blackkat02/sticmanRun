import React, { useEffect, useCallback } from 'react'; // useCallback is still useful for other functions
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVisibleItems,
  selectIsLoading,
  selectError,
  resetCatalogState,
} from '../../redux/catalogSlice';
import { getCatalogSliceThunk } from '../../redux/campersOps';
import FilterBar from '../../components/FilterBar/FilterBar';
import CampersList from '../../components/CampersList/CampersList';
import LoadMore from '../../components/LoadMore/LoadMore';
import Loader from '../../components/Loader/Loader'; // Still needed for initial page load/errors
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectVisibleItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(resetCatalogState());
    // On initial load, fetch the first batch of campers
    // Ensure getCatalogSliceThunk also handles setting initial offset/limit if needed
    dispatch(getCatalogSliceThunk());
  }, [dispatch]);

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

            <div className={styles.loadMoreWrapper}>
              <LoadMore />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVisibleItems, // Замінює selectCatalogSlice для відображуваних кемперів
  selectLoadMore,     // Селектор для прапора кнопки "Load More"
  selectIsLoading,    // Селектор для статусу завантаження
  selectError,        // Селектор для статусу помилки
  loadMoreItems,      // Екшен для завантаження наступної порції
  resetCatalogState,  // Екшен для повного скидання стану каталогу
} from '../../redux/catalogSlice';
import { getCatalogSliceThunk } from '../../redux/campersOps'; 
import FilterBar from '../../components/FilterBar/FilterBar'; 
import CampersList from '../../components/CampersList/CampersList';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  // Отримуємо кемперів, які вже відфільтровані та пагіновані
  const campers = useSelector(selectVisibleItems); 
  // Визначаємо, чи потрібно показувати кнопку "Load More"
  const shouldShowLoadMore = useSelector(selectLoadMore); 
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Ефект для першого завантаження даних при монтуванні компонента
  useEffect(() => {
    dispatch(resetCatalogState()); // Скидаємо стан перед новим завантаженням (якщо користувач перейшов з іншої сторінки)
    dispatch(getCatalogSliceThunk()); // Завантажуємо ВСІ кемпери з API
  }, [dispatch]);

  // Обробник для кліку на кнопку "Load More"
  const handleLoadMore = useCallback(() => {
    // Перевіряємо, чи є ще елементи для завантаження
    if (shouldShowLoadMore) {
      dispatch(loadMoreItems()); // Диспетчеризуємо екшен для збільшення "сторінки"
    }
  }, [dispatch, shouldShowLoadMore]);

  // Відображення стану завантаження (для першого завантаження)
  if (isLoading && campers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Завантаження кемперів...</div>;
  }

  // Відображення помилки
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Помилка: Не вдалося завантажити кемпери.</div>;
  }
  
  // Відображення повідомлення, якщо кемперів не знайдено (після завантаження та фільтрації)
  if (!isLoading && campers.length === 0 && !shouldShowLoadMore) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Кемперів не знайдено.</div>;
  }

  return (
    <section>
      <div className={styles.container}>
        <FilterBar /> {/* FilterBar тепер сам керує своїми фільтрами через Redux */}
        <CampersList campers={campers} /> {/* CampersList отримує вже відфільтровані та пагіновані кемпери */}
        
        {/* Кнопка "Завантажити ще" */}
        {shouldShowLoadMore && ( // Кнопка видима, якщо є ще елементи для завантаження
          <div className={styles.loadMoreWrapper}>
            <button 
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
            >
              Завантажити ще
            </button>
          </div>
        )}

        {/* Повідомлення, коли всі кемпери завантажені */}
        {!shouldShowLoadMore && campers.length > 0 && (
          <div className={styles.noMoreMessage}>Більше кемперів немає.</div>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
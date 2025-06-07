import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVisibleItems, // Now this selector provides the campers to render
  selectLoadMore,     // The flag for the Load More button
  selectIsLoading,
  selectError,
  loadMoreItems,      // Action to increment page
  resetCatalogState,  // Action to reset the state
} from '../../redux/catalogSlice';
import { getCatalogSliceThunk } from '../../redux/campersOps'; // Only need this for initial load
import FilterBar from '../../components/FilterBar/FilterBar'; // Assuming FilterBar handles its own state/dispatch
import CampersList from '../../components/CampersList/CampersList';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectVisibleItems); // Get currently visible campers
  const shouldShowLoadMore = useSelector(selectLoadMore); // Get the derived flag
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Load initial data and reset state
  useEffect(() => {
    dispatch(resetCatalogState()); // Reset state on component mount
    dispatch(getCatalogSliceThunk()); // Fetch all campers
  }, [dispatch]);

  // Handler for "Load More" button click or scroll
  const handleLoadMore = useCallback(() => {
    // We only dispatch if `shouldShowLoadMore` is true.
    // isLoadingMore is not needed here because `loadMoreItems` is synchronous.
    if (shouldShowLoadMore) {
      dispatch(loadMoreItems()); // Dispatch the action to increment the page
    }
  }, [dispatch, shouldShowLoadMore]);

  // Optional: Automatic load more on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && // 100px from bottom
        !isLoading && // Ensure not in initial loading state
        shouldShowLoadMore // Check if there are more items to load
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, isLoading, shouldShowLoadMore]); // Dependencies for useEffect

  if (isLoading && campers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading campers...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: Failed to load campers.</div>;
  }
  
  // If no campers are found after loading (and not in initial loading state)
  if (!isLoading && campers.length === 0 && !shouldShowLoadMore) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No campers found.</div>;
  }

  return (
    <section>
      <div className={styles.container}>
        <FilterBar /> {/* Assuming FilterBar manages its own state and dispatches */}
        <CampersList campers={campers} /> {/* Pass the visible campers to the list component */}
        
        {/* The Load More button logic */}
        {shouldShowLoadMore && ( // Button visible only if selectLoadMore is true
          <div className={styles.loadMoreWrapper}>
            <button 
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              // No need to disable if loadingMore is not managed separately
              // disabled={isLoadingMore} // Remove if you don't have this state
            >
              Load More
            </button>
          </div>
        )}

        {/* Message when all campers are loaded */}
        {!shouldShowLoadMore && campers.length > 0 && (
          <div className={styles.noMoreMessage}>No more campers to load</div>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;
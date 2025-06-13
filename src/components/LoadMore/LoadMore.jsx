import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoadMore,
  selectIsLoading,
  loadMoreItems, 
} from '../../redux/catalogSlice'; 

import Loader from '../Loader/Loader';

const LoadMore = () => {
  const dispatch = useDispatch();
  const shouldShowLoadMore = useSelector(selectLoadMore); 
  const isLoading = useSelector(selectIsLoading);

  const handleClick = () => {
    if (!isLoading && shouldShowLoadMore) {
        dispatch(loadMoreItems());
    }
  };

  if (!shouldShowLoadMore && !isLoading) {
    return null;
  }

  if (isLoading && shouldShowLoadMore) {
      return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
              <Loader />
          </div>
      );
  }

  if (!shouldShowLoadMore && isLoading) {
      return null; 
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      Load more
    </button>
  );
};

export default LoadMore;
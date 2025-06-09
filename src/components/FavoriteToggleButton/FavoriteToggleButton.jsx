import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice';
import { selectFavoriteItems } from '../../redux/store'; 
import styles from './FavoriteToggleButton.module.css'; 

const FavoriteToggleButton = ({ camperId }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems);
  const isFavorite = favoriteItems.includes(camperId);

  const handleToggleFavorite = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isFavorite) {
      dispatch(removeFromFavorites(camperId));
    } else {
      dispatch(addToFavorites(camperId));
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteToggleButton;
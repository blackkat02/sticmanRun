import { createSlice, createSelector } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], 
  },
  reducers: {
    addToFavorites(state, action) {
      const camperId = action.payload;
      if (!state.items.includes(camperId)) {
        state.items.push(camperId);
      }
    },
    removeFromFavorites(state, action) {
      const camperId = action.payload;
      state.items = state.items.filter(id => id !== camperId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export const selectFavoriteItems = (state) => state.favorites.items;

const persistConfig = {
  key: 'favorites', 
  storage, 
};

export const persistedFavoritesReducer = persistReducer(persistConfig, favoriteSlice.reducer);
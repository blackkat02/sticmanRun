import { createSlice, createSelector } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Використовуємо localStorage за замовчуванням

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], // Масив ID обраних кемперів
  },
  reducers: {
    // Додає ID кемпера до обраних
    addToFavorites(state, action) {
      const camperId = action.payload;
      // Перевіряємо, чи ID ще не в обраних
      if (!state.items.includes(camperId)) {
        state.items.push(camperId);
      }
    },
    // Видаляє ID кемпера з обраних
    removeFromFavorites(state, action) {
      const camperId = action.payload;
      state.items = state.items.filter(id => id !== camperId);
    },
  },
});

// Експортуємо екшени
export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

// Селектор для отримання масиву ID обраних кемперів
export const selectFavoriteItems = (state) => state.favorites.items;

// Конфігурація для redux-persist
const persistConfig = {
  key: 'favorites', // Ключ для localStorage
  storage, // Використовуємо localStorage
};

// Створюємо persistReducer
export const persistedFavoritesReducer = persistReducer(persistConfig, favoriteSlice.reducer);
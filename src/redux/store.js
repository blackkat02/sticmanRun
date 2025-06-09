import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { catalogSliceReducer } from './catalogSlice';
import { filterSliceReducer } from './filtersSlice';
import {
  persistedFavoritesReducer,
  selectFavoriteItems as importedSelectFavoriteItems 
} from './favoriteSlice'; 
import {
  persistStore,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  catalog: catalogSliceReducer,
  filters: filterSliceReducer,
  favorites: persistedFavoritesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const selectFavoriteItems = importedSelectFavoriteItems;

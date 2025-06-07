import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { catalogSliceReducer } from './catalogSlice';
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

// import { configureStore, combineReducers  } from '@reduxjs/toolkit';
// import { catalogSliceReducer } from './catalogSlice';
// import filtersSliceReducer from './filtersSlice';

// const rootReducer = combineReducers({
//   catalog: catalogSliceReducer,
//   filters: filtersSliceReducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
// });

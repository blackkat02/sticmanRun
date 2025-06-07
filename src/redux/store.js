import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { catalogSliceReducer } from './catalogSlice';
import {
  persistedFavoritesReducer,
  selectFavoriteItems as importedSelectFavoriteItems // <--- Імпортуємо його з favoriteSlice
} from './favoriteSlice'; // <--- Звідси
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

export const selectFavoriteItems = importedSelectFavoriteItems; // <--- Ре-експортуємо його

// Якщо ви експортуєте селектори з store.js, краще імпортувати їх тут і потім експортувати.
// Наприклад, якщо selectFavoriteItems використовується в багатьох місцях,
// його зручно експортувати звідси.
// import { selectFavoriteItems as importedSelectFavoriteItems } from './favoriteSlice';
// export const selectFavoriteItems = importedSelectFavoriteItems;


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

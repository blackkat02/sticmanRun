import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { catalogSliceReducer } from './catalogSlice';
import filtersSliceReducer from './filtersSlice';

const rootReducer = combineReducers({
  catalog: catalogSliceReducer,
  filters: filtersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

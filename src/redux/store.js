import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contactsSlice';
import filtersSliceReducer from './filtersSlice';

const rootReducer = combineReducers({
  contacts: contactsSliceReducer,
  filters: filtersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

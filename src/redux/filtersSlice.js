// src/redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  equipment: {
    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },
  vehicleType: {
    van: false, // <-- ЦЕ ВАЖЛИВО: залишається 'van'
    fullyIntegrated: false,
    alcove: false,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.location = action.payload.location !== undefined
                       ? action.payload.location
                       : state.location;

      if (action.payload.equipment) {
        state.equipment = { ...state.equipment, ...action.payload.equipment };
      }

      if (action.payload.vehicleType) {
        state.vehicleType = action.payload.vehicleType; 
      }
    },
    resetFilters(state) {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export const selectCurrentFilters = (state) => state.filters;
export const filterSliceReducer = filterSlice.reducer;

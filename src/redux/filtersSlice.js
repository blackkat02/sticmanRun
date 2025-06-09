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
    van: false,
    fullyIntegrated: false,
    alcove: false,
  },
};

const filterSlice = createSlice({
  name: 'filters', // Ім'я зрізу тепер 'filters'
  initialState,
  reducers: {
    setFilters(state, action) {
      // Оновлюємо фільтри.
      // Зверніть увагу: ми повністю замінюємо об'єкти equipment та vehicleType
      // якщо вони передані. Якщо потрібно мерджити, то слід зробити по-іншому.
      // Наприклад, для equipment: {...state.equipment, ...action.payload.equipment}
      
      // Локація оновлюється, якщо вона визначена в payload
      state.location = action.payload.location !== undefined 
                       ? action.payload.location 
                       : state.location;

      // Оновлення equipment: мерджимо новий об'єкт equipment з існуючим
      if (action.payload.equipment) {
        state.equipment = { ...state.equipment, ...action.payload.equipment };
      }

      // Оновлення vehicleType: мерджимо новий об'єкт vehicleType з існуючим
      if (action.payload.vehicleType) {
        state.vehicleType = { ...state.vehicleType, ...action.payload.vehicleType };
      }
    },
    // Додайте редьюсер для скидання фільтрів, якщо це необхідно
    resetFilters(state) {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;

export const selectCurrentFilters = (state) => state.filters; // Зверніть увагу: state.filters
export const filterSliceReducer = filterSlice.reducer;



// src/redux/catalogSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps";
import { selectCurrentFilters } from './filtersSlice'; // Імпортуємо селектор фільтрів

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
  state.selectedCamper = null;
};

const initialState = {
  allItems: [],
  total: 0,
  isLoading: false,
  isLoadingMore: false, // Ця властивість зараз не використовується, можна видалити якщо не планується
  isError: false,
  selectedCamper: null,

  pagination: {
    page: 1,
    perPage: 4,
  },
};

// Функція applyFilters залишається тут, оскільки вона використовує allItems
// і залежить від форми filters, яку ми імпортуємо через селектор.
const applyFilters = (items, filters) => {
  return items.filter(item => {
    // Location filter
    const matchesLocation = filters.location
      ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    // Equipment filters
    const matchesEquipment = Object.keys(filters.equipment).every(key => {
      if (filters.equipment[key]) {
        if (key === 'automatic') {
          return item.transmission === 'automatic';
        }
        // Перевіряємо, чи існує властивість і чи вона truthy
        return item.details && item.details[key]; // Припускаємо, що деталі обладнання знаходяться в item.details
      }
      return true;
    });

    // Vehicle Type filters
    const selectedVehicleTypes = Object.keys(filters.vehicleType).filter(
      type => filters.vehicleType[type]
    );
    const matchesVehicleType = selectedVehicleTypes.length > 0
      ? selectedVehicleTypes.includes(item.form)
      : true;

    return matchesLocation && matchesEquipment && matchesVehicleType;
  });
};


const catalogSlice = createSlice({
  name: 'campers', // Ім'я зрізу тепер 'campers'
  initialState,
  reducers: {
    resetCatalogState(state) {
      // Скидаємо лише стан, який стосується каталогу, без фільтрів
      state.allItems = [];
      state.total = 0;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.isError = false;
      state.selectedCamper = null;
      state.pagination.page = 1; // Скидаємо пагінацію
    },
    loadMoreItems(state) {
      state.pagination.page += 1;
    },
    // setFilters тепер НЕ потрібен тут, він буде в filterSlice
    // setFilters(state, action) { ... }
    clearSelectedCamper(state) {
        state.selectedCamper = null;
    },
    // Додамо редьюсер для скидання пагінації, якщо фільтри змінюються
    resetPagination(state) {
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allItems = payload.items;
        state.total = payload.total;
        // state.pagination.page = 1; // Це буде скидатися через resetPagination при зміні фільтрів
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedCamper = payload;
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

export const { resetCatalogState, loadMoreItems, clearSelectedCamper, resetPagination } = catalogSlice.actions;

// Селектори
export const selectAllItems = (state) => state.catalog.allItems;
export const selectTotalCampersCount = (state) => state.catalog.total;
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.isError;
export const selectPagination = (state) => state.catalog.pagination;
export const selectSelectedCamper = (state) => state.catalog.selectedCamper;

// Оновлений селектор для фільтрованих елементів
export const selectFilteredItems = createSelector(
  [selectAllItems, selectCurrentFilters], // Використовуємо селектор з filterSlice
  (allItems, filters) => {
    return applyFilters(allItems, filters);
  }
);

export const selectTotalFilteredItems = createSelector(
  [selectFilteredItems],
  (filteredItems) => filteredItems.length
);

export const selectVisibleItems = createSelector(
  [selectFilteredItems, selectPagination],
  (filteredItems, pagination) => {
    const { page, perPage } = pagination;
    const endIndex = page * perPage;
    return filteredItems.slice(0, endIndex);
  }
);

export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalFilteredItems],
  (visibleItems, totalFilteredItems) => {
    return visibleItems.length < totalFilteredItems;
  }
);

export const catalogSliceReducer = catalogSlice.reducer;
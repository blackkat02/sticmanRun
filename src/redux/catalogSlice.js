import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps";
import { selectCurrentFilters } from './filtersSlice';

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.selectedCamper = null;
  state.error = action.error.message || 'Failed to fetch data';
};

const applyFilters = (items, filters) => {

  return items.filter(item => {
    const matchesLocation = filters.location
      ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesEquipment = Object.keys(filters.equipment).every(key => {
      if (filters.equipment[key]) {
        let equipmentMatches = false;
        if (key === 'automatic') {
          equipmentMatches = item.transmission === 'automatic';;
        } else {
          equipmentMatches = !!item[key];
        }
        if (!equipmentMatches) {
          return false;
        }
      }
      return true;
    });

    const selectedVehicleTypes = Object.keys(filters.vehicleType).filter(
      type => filters.vehicleType[type]
    );

    const matchesVehicleType = selectedVehicleTypes.length > 0
      ? selectedVehicleTypes.some(selectedTypeFromUI => {
        let vehicleTypeMatches = false;
        if (selectedTypeFromUI === 'van') {
          vehicleTypeMatches = item.form === 'panelTruck';
        } else {
          vehicleTypeMatches = item.form === selectedTypeFromUI;
        }
        if (vehicleTypeMatches) {
          return true;
        }
        return false;
      })
      : true;

    const finalResult = matchesLocation && matchesEquipment && matchesVehicleType;

    return finalResult;
  });
};

const initialState = {
  allItems: [],
  total: 0,
  isLoading: false,
  isLoadingMore: false,
  isError: false,
  error: null,
  selectedCamper: null,

  pagination: {
    page: 1,
    perPage: 4,
  },
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetCatalogState(state) {
      state.allItems = [];
      state.total = 0;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.isError = false;
      state.error = null;
      state.selectedCamper = null;
      state.pagination.page = 1;
    },
    loadMoreItems(state) {
      state.pagination.page += 1;
    },
    clearSelectedCamper(state) {
      state.selectedCamper = null;
    },
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
        state.isError = false;
        state.error = null;
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedCamper = payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

export const {
  resetCatalogState,
  loadMoreItems,
  clearSelectedCamper,
  resetPagination
} = catalogSlice.actions;

export const selectAllItems = (state) => state.catalog.allItems;
export const selectTotalCampersCount = (state) => state.catalog.total;
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.error;
export const selectPagination = (state) => state.catalog.pagination;
export const selectSelectedCamper = (state) => state.catalog.selectedCamper;

export const selectFilteredItems = createSelector(
  [selectAllItems, selectCurrentFilters],
  (allItems, filters) => {
    const filtered = applyFilters(allItems, filters);
    return filtered;
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
    const visible = filteredItems.slice(0, endIndex);
    return visible;
  }
);

export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalFilteredItems, selectIsLoading],
  (visibleItems, totalFilteredItems, isLoading) => {
    return visibleItems.length < totalFilteredItems && !isLoading;
  }
);

export const catalogSliceReducer = catalogSlice.reducer;
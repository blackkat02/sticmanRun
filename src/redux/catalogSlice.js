import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps"; 

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
  isLoadingMore: false,
  isError: false,
  selectedCamper: null,

  pagination: {
    page: 1,
    perPage: 4,
    totalFilteredItems: 0,
  },

  filters: {
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
  },
};

const applyFilters = (items, filters) => {

  return items.filter(item => {
    // Location filter
    const matchesLocation = filters.location
      ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    // Equipment filters
    const matchesEquipment = Object.keys(filters.equipment).every(key => {
      if (filters.equipment[key]) {
        // Special handling for 'automatic' which is transmission
        if (key === 'automatic') {
          return item.transmission === 'automatic';
        }
        // For other equipment, check if the property exists and is truthy
        return item[key]; // Assuming equipment properties like AC, kitchen are directly on item
      }
      return true; // If filter is false, it doesn't restrict
    });

    // Vehicle Type filters
    const selectedVehicleTypes = Object.keys(filters.vehicleType).filter(
      type => filters.vehicleType[type]
    );
    const matchesVehicleType = selectedVehicleTypes.length > 0
      ? selectedVehicleTypes.includes(item.form)
      : true; // If no vehicle type selected, all types match

    return matchesLocation && matchesEquipment && matchesVehicleType;
  });
};
// <--- END applyFilters DEFINITION ---


const catalogSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetCatalogState(state) {
      return initialState;
    },
    loadMoreItems(state) {
      state.pagination.page += 1;
    },
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        location: action.payload.location !== undefined ? action.payload.location : state.filters.location,
        equipment: { ...state.filters.equipment, ...action.payload.equipment },
        vehicleType: { ...state.vehicleType, ...action.payload.vehicleType }, // Corrected state.vehicleType to state.filters.vehicleType
      };
      state.pagination.page = 1;
    },
    clearSelectedCamper(state) {
        state.selectedCamper = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allItems = payload.items;
        state.total = payload.total;
        state.pagination.page = 1;
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

export const { resetCatalogState, loadMoreItems, setFilters, clearSelectedCamper } = catalogSlice.actions;

export const selectAllItems = (state) => state.catalog.allItems;
export const selectTotalCampersCount = (state) => state.catalog.total;
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.isError;
export const selectPagination = (state) => state.catalog.pagination;
export const selectCurrentFilters = (state) => state.catalog.filters;
export const selectSelectedCamper = (state) => state.catalog.selectedCamper;

export const selectFilteredItems = createSelector(
  [selectAllItems, selectCurrentFilters],
  (allItems, filters) => {
    // The applyFilters function must be defined in this scope
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

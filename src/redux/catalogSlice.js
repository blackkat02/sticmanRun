import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps"; 

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

// Updated handleRejected: Now correctly resets pagination state
const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
  state.items = [];
  state.total = 0;

  state.page = 1; // Reset to first page on error
  state.perPage = 4; // Reset perPage (if it's not a fixed constant)
  state.countPage = 0; // Reset count of loaded pages
  // state.loadMore will be derived, so no need to set it here
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],    // The full list of items loaded from API
    total: 0,     // Total items available on the backend
    isLoading: false,
    isError: false,

    // --- Pagination State ---
    page: 1,      // Current "page" number (batch number)
    perPage: 4,   // Number of items to display per "page" / batch
    // countPage: 0, // This seems redundant if page is tracking batches and total is from backend
                  // If you want to track number of times "Load More" was clicked, keep it.
                  // For "Load More" logic, page and perPage are sufficient.
                  // I'll remove it for simplicity if it's not strictly needed.
    // loadMore: false, // This will be a derived state (selector), not directly in initialState
  },
  reducers: {
    // New reducer to handle "Load More" button click
    loadMoreItems(state) {
      state.page += 1; // Increment the page number
      // The actual visible items will be calculated by a selector
    },
    // Optional: Reset state when leaving/entering catalog page
    resetCatalogState(state) {
      state.items = [];
      state.total = 0;
      state.isLoading = false;
      state.isError = false;
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.items; // Assuming payload.items is the full array from API
        state.total = payload.total; // Assuming payload.total is the total count from API
        state.page = 1; // Reset to the first page when new data is loaded
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // This pushes a single camper detail to the main items list.
        // As discussed, verify if this is the desired behavior for your catalog.
        state.items.push(payload);
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

// --- Selectors ---

// Selects the full list of items from state
export const selectAllItems = (state) => state.catalog.items; 

// Selects the total count from state
export const selectTotalCampersCount = (state) => state.catalog.total;

// Selects current loading status for initial load
export const selectIsLoading = (state) => state.catalog.isLoading;

// Selects error status
export const selectError = (state) => state.catalog.isError;

// Selects current page number
export const selectPage = (state) => state.catalog.page;

// Selects items per page
export const selectPerPage = (state) => state.catalog.perPage;

// --- Derived Selectors ---

// Selects the visible items based on pagination
// This is your `selectCatalogSlice` equivalent, but now applies pagination logic
export const selectVisibleItems = createSelector(
  [selectAllItems, selectPage, selectPerPage],
  (allItems, page, perPage) => {
    // Slice the allItems array to get only the items for the current "page"
    // For "Load More" behavior, we slice from 0 up to (page * perPage)
    const endIndex = page * perPage;
    return allItems.slice(0, endIndex);
  }
);

// Selects the `loadMore` flag. It's true if there are more items to load.
export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalCampersCount],
  (visibleItems, totalCampersCount) => {
    // `visibleItems.length` is the number of campers currently displayed.
    // `totalCampersCount` is the total number of campers available from the backend.
    return visibleItems.length < totalCampersCount;
  }
);

// Export the reducer and action creators
export const { loadMoreItems, resetCatalogState } = catalogSlice.actions; // Export action creator
export const catalogSliceReducer = catalogSlice.reducer;

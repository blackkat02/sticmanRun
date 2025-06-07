import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps"; 

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
  state.items = [];
  state.total = 0;

  state.page = 1;
  state.perPage = 4;
  state.countPage = 0; 
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    isError: false,

    page: 1,
    perPage: 4,
  },
  reducers: {
    loadMoreItems(state) {
      state.page += 1; 
    },
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
        state.items = payload.items;
        state.total = payload.total;
        state.page = 1;
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

export const selectAllItems = (state) => state.catalog.items; 

export const selectTotalCampersCount = (state) => state.catalog.total;

export const selectIsLoading = (state) => state.catalog.isLoading;

export const selectError = (state) => state.catalog.isError;

export const selectPage = (state) => state.catalog.page;

export const selectPerPage = (state) => state.catalog.perPage;

export const selectVisibleItems = createSelector(
  [selectAllItems, selectPage, selectPerPage],
  (allItems, page, perPage) => {
    const endIndex = page * perPage;
    return allItems.slice(0, endIndex);
  }
);

export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalCampersCount],
  (visibleItems, totalCampersCount) => {

    return visibleItems.length < totalCampersCount;
  }
);

export const { loadMoreItems, resetCatalogState } = catalogSlice.actions;
export const catalogSliceReducer = catalogSlice.reducer;

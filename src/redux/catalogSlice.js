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
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.items;
        state.total = payload.total;
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected)
  },
});

export const selectCatalogSlice = (state) => state.catalog.items; // Повертає список кемперів
export const selectTotalCampersCount = (state) => state.catalog.total; // Повертає загальну кількість
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.isError;
export const catalogSliceReducer = catalogSlice.reducer;

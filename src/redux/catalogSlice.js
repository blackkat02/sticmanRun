import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk} from "./campersOps";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
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

export const selectCatalogSlice = (state) => state.catalog.items;
export const selectTotalCampersCount = (state) => state.catalog.total; 
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.isError;
export const selectFilter = (state) => state.filters;

export const selectFilteredCampers = createSelector(
  [selectCatalog, selectFilter],
  (catalog, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return catalog.filter(camper =>
      camper.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const catalogSliceReducer = catalogSlice.reducer;
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { 
  getCatalogSliceThunk, 
  getDetailsCampersSliceThunk
} from "./contactsOps";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const catalogCampersSlice = createSlice({
  name: 'contacts',
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

export const selectCatalogSlice = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.isError;
export const selectFilter = (state) => state.filters;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const catalogSliceReducer = catalogSlice.reducer;
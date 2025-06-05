import { createSlice, createSelector } from '@reduxjs/toolkit';
import { 
  getContactsSliceThunk, 
  createContactsSliceThunk, 
  removeContactsSliceThunk 
} from "./contactsOps";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactsSliceThunk.pending, handlePending)
      .addCase(getContactsSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(getContactsSliceThunk.rejected, handleRejected)
      
      .addCase(createContactsSliceThunk.pending, handlePending)
      .addCase(createContactsSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(createContactsSliceThunk.rejected, handleRejected)
      
      .addCase(removeContactsSliceThunk.pending, handlePending)
      .addCase(removeContactsSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(contact => contact.id !== payload);
      })
      .addCase(removeContactsSliceThunk.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.isError;
export const selectFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const contactsSliceReducer = contactsSlice.reducer;
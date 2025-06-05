import { createSlice } from '@reduxjs/toolkit';

const filtersSliceReducer = createSlice({
  name: 'filters',
  initialState: {
    name: ""
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filtersSliceReducer.actions;
export default filtersSliceReducer.reducer;



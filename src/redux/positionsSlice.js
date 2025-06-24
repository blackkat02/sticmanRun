import { createSlice, createSelector } from '@reduxjs/toolkit';

export const initialPosition = [
  { name: 'wp', position: 'a2' },
  { name: 'bp', position: 'a7' },
];

// export const initialPosition = 
//   { name: 'wp', position: 'a2' },

// ;

const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
    initialPosition: initialPosition,
    // items: [],
    // isLoading: false,
    // isError: false,
  },
})
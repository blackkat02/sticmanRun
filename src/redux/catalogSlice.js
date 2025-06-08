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

// <--- DEFINE applyFilters HERE ---
const applyFilters = (items, filters) => {
  // console.log("Applying filters:", filters); // Debugging line
  // console.log("Items before filter:", items); // Debugging line

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



// import { createSlice, createSelector } from '@reduxjs/toolkit';
// import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps"; 

// const handlePending = (state) => {
//   state.isLoading = true;
//   state.isError = false;
// };

// const handleRejected = (state) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.allItems = [];
//   state.total = 0;
//   state.pagination.page = 1;
//   state.pagination.totalFilteredItems = 0;
//   // Важливо: Оскільки кнопки "Reset" немає, подумайте, чи потрібно скидати фільтри
//   // при загальній помилці завантаження. Для початку, залишу, як є.
//   state.filters = initialState.filters; 
// };

// const initialState = {
//   allItems: [],
//   total: 0,
//   isLoading: false,
//   isLoadingMore: false,
//   isError: false,

//   pagination: {
//     page: 1,
//     perPage: 4,
//     totalFilteredItems: 0,
//   },

//   filters: {
//     location: '',
//     equipment: {
//       AC: false,
//       automatic: false,
//       kitchen: false,
//       TV: false,
//       bathroom: false,
//     },
//     vehicleType: { 
//       van: false,
//       fullyIntegrated: false,
//       alcove: false,
//     },
//   },
// };

// const applyFilters = (items, filters) => {
//   let filtered = [...items];

//   // Фільтрація за локацією
//   if (filters.location) {
//     const normalizedLocation = filters.location.toLowerCase().trim();
//     if (normalizedLocation) {
//       filtered = filtered.filter(item =>
//         item.location.toLowerCase().includes(normalizedLocation)
//       );
//     }
//   }

//   // Фільтрація за обладнанням (ВИПРАВЛЕНО)
//   const selectedEquipment = Object.keys(filters.equipment).filter(key => filters.equipment[key]);
//   if (selectedEquipment.length > 0) {
//     filtered = filtered.filter(item => {
//       return selectedEquipment.every(equipKey => {
//         if (equipKey === 'automatic') {
//           // 'automatic' в FilterBar відповідає 'transmission: "automatic"' у кемпера
//           return item.transmission === 'automatic';
//         }
//         // Для інших елементів обладнання шукаємо безпосередньо на об'єкті item
//         // Приклад: item.AC, item.kitchen, item.TV, item.bathroom
//         // Перевіряємо, чи властивість існує і є true
//         return item[equipKey] === true; 
//       });
//     });
//   }

//   // Фільтрація за типом транспортного засобу
//   const selectedVehicleTypeKeys = Object.keys(filters.vehicleType).filter(key => filters.vehicleType[key]);

//   if (selectedVehicleTypeKeys.length > 0) {
//     filtered = filtered.filter(item => {
//       const formMapping = {
//         'van': 'panelTruck',
//         'fullyIntegrated': 'fullyIntegrated',
//         'alcove': 'alcove',
//       };
      
//       return selectedVehicleTypeKeys.some(typeKey => item.form === formMapping[typeKey]);
//     });
//   }

//   return filtered;
// };


// const catalogSlice = createSlice({
//   name: 'campers',
//   initialState,
//   reducers: {
//     resetCatalogState(state) {
//       return initialState;
//     },
//     loadMoreItems(state) {
//       state.pagination.page += 1;
//     },
//     setFilters(state, action) {
//       state.filters = {
//         ...state.filters,
//         location: action.payload.location !== undefined ? action.payload.location : state.filters.location,
//         equipment: { ...state.filters.equipment, ...action.payload.equipment },
//         vehicleType: { ...state.filters.vehicleType, ...action.payload.vehicleType },
//       };
//       state.pagination.page = 1; // Скидаємо пагінацію при зміні фільтрів
//     },
//     // Reducer resetFilters більше не потрібен, оскільки кнопки "Reset" немає.
//     // Проте, якщо ви хочете скидати фільтри програмно (наприклад, при переході на іншу сторінку),
//     // ви можете залишити його, але він не буде прив'язаний до UI кнопки.
//     // resetFilters(state) {
//     //   state.filters = initialState.filters;
//     //   state.pagination.page = 1;
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCatalogSliceThunk.pending, handlePending)
//       .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.allItems = payload.items;
//         state.total = payload.total;
//         state.pagination.page = 1;
//       })
//       .addCase(getCatalogSliceThunk.rejected, handleRejected)

//       .addCase(getDetailsCampersSliceThunk.pending, handlePending)
//       .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         const existingIndex = state.allItems.findIndex(item => item._id === payload._id || item.id === payload.id);
//         if (existingIndex !== -1) {
//           state.allItems[existingIndex] = payload;
//         } else {
//           state.allItems.push(payload);
//         }
//       })
//       .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
//   },
// });

// export const { resetCatalogState, loadMoreItems, setFilters } = catalogSlice.actions; // resetFilters видалено з експорту

// export const selectAllItems = (state) => state.catalog.allItems;
// export const selectTotalCampersCount = (state) => state.catalog.total;
// export const selectIsLoading = (state) => state.catalog.isLoading;
// export const selectError = (state) => state.catalog.isError;
// export const selectPagination = (state) => state.catalog.pagination;
// export const selectCurrentFilters = (state) => state.catalog.filters;

// export const selectFilteredItems = createSelector(
//   [selectAllItems, selectCurrentFilters],
//   (allItems, filters) => {
//     return applyFilters(allItems, filters);
//   }
// );

// export const selectTotalFilteredItems = createSelector(
//   [selectFilteredItems],
//   (filteredItems) => filteredItems.length
// );

// export const selectVisibleItems = createSelector(
//   [selectFilteredItems, selectPagination],
//   (filteredItems, pagination) => {
//     const { page, perPage } = pagination;
//     const endIndex = page * perPage;
//     return filteredItems.slice(0, endIndex);
//   }
// );

// export const selectLoadMore = createSelector(
//   [selectVisibleItems, selectTotalFilteredItems],
//   (visibleItems, totalFilteredItems) => {
//     return visibleItems.length < totalFilteredItems;
//   }
// );

// export const catalogSliceReducer = catalogSlice.reducer;
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps";
import { selectCurrentFilters } from './filtersSlice';

// Допоміжні функції для обробки станів thunk
const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.selectedCamper = null;
  state.error = action.error.message || 'Failed to fetch data';
};

// Функція для застосування фільтрів до масиву елементів
const applyFilters = (items, filters) => {
  // Логи для відладки (можна закоментувати або прибрати після завершення відладки)
  // console.log("--- Starting applyFilters ---");
  // console.log("Filters applied (full object):", filters);

  return items.filter(item => {
    // console.log("\n--- Checking item details for:", item.name, "---");
    // console.log("Full item object:", item);
    // console.log("Current filters for this item:", filters);

    // Фільтрація за локацією
    const matchesLocation = filters.location
      ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    // Фільтрація за обладнанням
    const matchesEquipment = Object.keys(filters.equipment).every(key => {
      if (filters.equipment[key]) {
        let equipmentMatches = false;
        if (key === 'automatic') {
          equipmentMatches = item.transmission === 'automatic';
          // console.log(`  Equipment: Checking automatic: item.transmission (${item.transmission}) === 'automatic' -> ${equipmentMatches}`);
        } else {
          equipmentMatches = !!item[key];
          // console.log(`  Equipment: Checking ${key}: item[${key}] (${item[key]}) -> ${equipmentMatches}`);
        }
        if (!equipmentMatches) {
            // console.log(`  Equipment: CRITERION FAILED for ${key} (Expected true, got false)`);
            return false;
        }
      }
      return true;
    });
    // console.log(`Overall matchesEquipment for ${item.name}: ${matchesEquipment}`);


    // Фільтрація за типом транспортного засобу (повернено до початкової логіки)
    const selectedVehicleTypes = Object.keys(filters.vehicleType).filter(
      type => filters.vehicleType[type]
    );

    const matchesVehicleType = selectedVehicleTypes.length > 0
      ? selectedVehicleTypes.some(selectedTypeFromUI => {
          let vehicleTypeMatches = false;
          // Якщо з UI прийшло 'van', то в даних це 'panelTruck'
          if (selectedTypeFromUI === 'van') {
            vehicleTypeMatches = item.form === 'panelTruck'; // <--- Ключова зміна
            // console.log(`  VehicleType: Checking 'van' (mapped to 'panelTruck'): item.form (${item.form}) === 'panelTruck' -> ${vehicleTypeMatches}`);
          } else {
            // Для інших типів (fullyIntegrated, alcove) - пряме співпадіння
            vehicleTypeMatches = item.form === selectedTypeFromUI;
            // console.log(`  VehicleType: Checking '${selectedTypeFromUI}': item.form (${item.form}) === '${selectedTypeFromUI}' -> ${vehicleTypeMatches}`);
          }
          if (vehicleTypeMatches) {
              return true;
          }
          return false;
        })
      : true; // Якщо жоден тип не вибрано, пропускаємо всі
    // console.log(`Overall matchesVehicleType for ${item.name}: ${matchesVehicleType}`);


    // Кінцевий результат фільтрації
    const finalResult = matchesLocation && matchesEquipment && matchesVehicleType;
    // console.log(`Final Result for ${item.name}: Location=${matchesLocation}, Equipment=${matchesEquipment}, VehicleType=${matchesVehicleType} => ${finalResult}`);
    // console.log("-------------------------------------------\n");

    return finalResult;
  });
};

// Початковий стан слайсу Redux
const initialState = {
  allItems: [],
  total: 0,
  isLoading: false,
  isLoadingMore: false,
  isError: false,
  error: null,
  selectedCamper: null,

  pagination: {
    page: 1,
    perPage: 4,
  },
};

const catalogSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    resetCatalogState(state) {
      state.allItems = [];
      state.total = 0;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.isError = false;
      state.error = null;
      state.selectedCamper = null;
      state.pagination.page = 1;
    },
    loadMoreItems(state) {
      state.pagination.page += 1;
    },
    clearSelectedCamper(state) {
      state.selectedCamper = null;
    },
    resetPagination(state) {
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allItems = payload.items;
        state.total = payload.total;
        state.isError = false;
        state.error = null;
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.selectedCamper = payload;
        state.isError = false;
        state.error = null;
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

// Експорт екшенів
export const {
  resetCatalogState,
  loadMoreItems,
  clearSelectedCamper,
  resetPagination
} = catalogSlice.actions;

// Селектори
export const selectAllItems = (state) => state.catalog.allItems;
export const selectTotalCampersCount = (state) => state.catalog.total;
export const selectIsLoading = (state) => state.catalog.isLoading;
export const selectError = (state) => state.catalog.error;
export const selectPagination = (state) => state.catalog.pagination;
export const selectSelectedCamper = (state) => state.catalog.selectedCamper;

export const selectFilteredItems = createSelector(
  [selectAllItems, selectCurrentFilters],
  (allItems, filters) => {
    const filtered = applyFilters(allItems, filters);
    // console.log("selectFilteredItems result (length):", filtered.length);
    return filtered;
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
    const visible = filteredItems.slice(0, endIndex);
    // console.log("selectVisibleItems result (length):", visible.length);
    return visible;
  }
);

export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalFilteredItems, selectIsLoading],
  (visibleItems, totalFilteredItems, isLoading) => {
    return visibleItems.length < totalFilteredItems && !isLoading;
  }
);

// Експорт редьюсера
export const catalogSliceReducer = catalogSlice.reducer;
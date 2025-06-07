import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getCatalogSliceThunk, getDetailsCampersSliceThunk } from "./campersOps"; 

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
  state.allItems = []; // Використовуємо allItems замість items для зберігання всього списку
  state.total = 0;
  state.pagination.page = 1; // Скидаємо пагінацію
  state.pagination.totalFilteredItems = 0; // Скидаємо кількість відфільтрованих
  // Також скидаємо фільтри при помилці, щоб уникнути некоректного стану
  state.filters = initialState.filters; 
};

// Початковий стан для всього slice
const initialState = {
  allItems: [], // Містить УСІ завантажені кемпери з бекенду
  total: 0, // Загальна кількість кемперів з бекенду
  isLoading: false, // Флаг для першого завантаження
  isLoadingMore: false, // Флаг для "Load More" (якщо буде реалізовано асинхронно)
  isError: false, // Флаг помилки

  // --- Стан пагінації ---
  pagination: {
    page: 1,      // Поточна "сторінка" / кількість завантажених порцій
    perPage: 4,   // Кількість елементів на одну порцію
    totalFilteredItems: 0, // Загальна кількість елементів ПІСЛЯ фільтрації
  },

  // --- Стан фільтрів (перенесено сюди з FilterBar) ---
  filters: {
    location: '',
    equipment: {
      AC: false,
      automatic: false, // automatic - це для transmission, а не details
      kitchen: false,
      TV: false,
      bathroom: false,
    },
    vehicleType: { // Тип ТЗ будемо зберігати як об'єкт булевих значень, щоб дозволити множинний вибір
      van: false, // maps to camper.form === "panelTruck"
      fullyIntegrated: false, // maps to camper.form === "fullyIntegrated"
      alcove: false, // maps to camper.form === "alcove"
    },
  },
};

// --- Допоміжні функції для обчислення даних (винесені для чистоти та мемоізації) ---

// Функція для застосування фільтрів до масиву кемперів
const applyFilters = (items, filters) => {
  let filtered = [...items]; // Робимо копію, щоб не змінювати оригінал

  // Фільтрація за локацією
  if (filters.location) {
    const normalizedLocation = filters.location.toLowerCase().trim();
    if (normalizedLocation) { // Перевіряємо, що фільтр не пустий після trim
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(normalizedLocation)
      );
    }
  }

  // Фільтрація за обладнанням
  const selectedEquipment = Object.keys(filters.equipment).filter(key => filters.equipment[key]);
  if (selectedEquipment.length > 0) {
    filtered = filtered.filter(item => {
      return selectedEquipment.every(equipKey => {
        if (equipKey === 'automatic') {
          // 'automatic' в FilterBar відповідає 'transmission: "automatic"' у кемпера
          return item.transmission === 'automatic';
        }
        // Для інших елементів обладнання шукаємо в item.details
        // Важливо: перевіряємо, чи item.details існує
        return item.details && item.details[equipKey];
      });
    });
  }

  // Фільтрація за типом транспортного засобу
  const selectedVehicleType = Object.keys(filters.vehicleType).filter(key => filters.vehicleType[key]);
  if (selectedVehicleType.length > 0) {
    filtered = filtered.filter(item => {
      // Зіставляємо назви з FilterBar з полем 'form' у кемпера
      const formMapping = {
        'van': 'panelTruck', // 'van' у FilterBar відповідає 'panelTruck' у даних кемпера
        'fullyIntegrated': 'fullyIntegrated',
        'alcove': 'alcove',
      };
      // Перевіряємо, чи форма кемпера відповідає будь-якому з вибраних типів
      return selectedVehicleType.some(typeKey => item.form === formMapping[typeKey]);
    });
  }

  return filtered;
};


const catalogSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    // Редюсер для скидання всього стану каталогу (перед новим завантаженням)
    resetCatalogState(state) {
      return initialState; // Повертаємо весь початковий стан
    },
    // Редюсер для збільшення сторінки для "Load More"
    loadMoreItems(state) {
      state.pagination.page += 1;
    },
    // Редюсер для встановлення фільтрів (викликається з FilterBar)
    setFilters(state, action) {
      // action.payload буде об'єктом, що містить оновлені частини фільтрів
      state.filters = {
        ...state.filters,
        location: action.payload.location !== undefined ? action.payload.location : state.filters.location,
        equipment: { ...state.filters.equipment, ...action.payload.equipment },
        vehicleType: { ...state.filters.vehicleType, ...action.payload.vehicleType },
      };
      state.pagination.page = 1; // Скидаємо пагінацію при зміні фільтрів
    },
    // Редюсер для скидання всіх фільтрів до початкового стану
    resetFilters(state) {
      state.filters = initialState.filters;
      state.pagination.page = 1; // Скидаємо пагінацію
    },
  },
  extraReducers: (builder) => {
    builder
      // getCatalogSliceThunk - для першого завантаження УСІХ даних
      .addCase(getCatalogSliceThunk.pending, handlePending)
      .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allItems = payload.items; // Зберігаємо масив кемперів
        state.total = payload.total; // Зберігаємо загальну кількість
        state.pagination.page = 1; // Скидаємо пагінацію на першу сторінку при завантаженні нових даних
      })
      .addCase(getCatalogSliceThunk.rejected, handleRejected)

      // getDetailsCampersSliceThunk - для отримання деталей ОДНОГО кемпера
      // Примітка: додавання одного кемпера до allItems може бути нелогічним,
      // якщо allItems - це повний каталог. Зазвичай деталі зберігають окремо.
      // Залишаю як є за вашим проханням, але майте це на увазі.
      .addCase(getDetailsCampersSliceThunk.pending, handlePending)
      .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // Перевіряємо, чи цей кемпер вже є в allItems, і оновлюємо його,
        // або додаємо, якщо його немає.
        const existingIndex = state.allItems.findIndex(item => item._id === payload._id || item.id === payload.id);
        if (existingIndex !== -1) {
          state.allItems[existingIndex] = payload;
        } else {
          state.allItems.push(payload);
        }
      })
      .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
  },
});

// --- Експорт екшенів ---
export const { resetCatalogState, loadMoreItems, setFilters, resetFilters } = catalogSlice.actions;

// --- Селектори ---

// Селектор для всього списку кемперів (після завантаження)
export const selectAllItems = (state) => state.catalog.allItems;
// Селектор для загальної кількості кемперів з бекенду
export const selectTotalCampersCount = (state) => state.catalog.total;
// Селектор для статусу завантаження
export const selectIsLoading = (state) => state.catalog.isLoading;
// Селектор для статусу помилки
export const selectError = (state) => state.catalog.isError;
// Селектор для поточного стану пагінації (об'єкт)
export const selectPagination = (state) => state.catalog.pagination;
// Селектор для поточного стану фільтрів (об'єкт)
export const selectCurrentFilters = (state) => state.catalog.filters;

// Мемоізований селектор для отримання відфільтрованих елементів (застосовує фільтри до allItems)
export const selectFilteredItems = createSelector(
  [selectAllItems, selectCurrentFilters],
  (allItems, filters) => {
    return applyFilters(allItems, filters);
  }
);

// Мемоізований селектор для отримання загальної кількості відфільтрованих елементів
export const selectTotalFilteredItems = createSelector(
  [selectFilteredItems],
  (filteredItems) => filteredItems.length
);

// Мемоізований селектор для отримання видимих елементів (застосовує пагінацію до відфільтрованих)
// Цей селектор замінює `selectCatalogSlice` з ваших попередніх файлів.
export const selectVisibleItems = createSelector(
  [selectFilteredItems, selectPagination],
  (filteredItems, pagination) => {
    const { page, perPage } = pagination;
    const endIndex = page * perPage;
    return filteredItems.slice(0, endIndex);
  }
);

// Селектор, який визначає, чи потрібно відображати кнопку "Load More"
export const selectLoadMore = createSelector(
  [selectVisibleItems, selectTotalFilteredItems],
  (visibleItems, totalFilteredItems) => {
    return visibleItems.length < totalFilteredItems;
  }
);

// Експортуємо головний редюсер slice
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
//   state.items = [];
//   state.total = 0;

//   state.page = 1;
//   state.perPage = 4;
//   state.countPage = 0; 
// };

// const catalogSlice = createSlice({
//   name: 'campers',
//   initialState: {
//     items: [],
//     total: 0,
//     isLoading: false,
//     isError: false,

//     page: 1,
//     perPage: 4,
//   },
//   reducers: {
//     loadMoreItems(state) {
//       state.page += 1; 
//     },
//     resetCatalogState(state) {
//       state.items = [];
//       state.total = 0;
//       state.isLoading = false;
//       state.isError = false;
//       state.page = 1;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCatalogSliceThunk.pending, handlePending)
//       .addCase(getCatalogSliceThunk.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.items = payload.items;
//         state.total = payload.total;
//         state.page = 1;
//       })
//       .addCase(getCatalogSliceThunk.rejected, handleRejected)

//       .addCase(getDetailsCampersSliceThunk.pending, handlePending)
//       .addCase(getDetailsCampersSliceThunk.fulfilled, (state, { payload }) => {
//         state.isLoading = false;
//         state.items.push(payload);
//       })
//       .addCase(getDetailsCampersSliceThunk.rejected, handleRejected);
//   },
// });

// export const selectAllItems = (state) => state.catalog.items; 

// export const selectTotalCampersCount = (state) => state.catalog.total;

// export const selectIsLoading = (state) => state.catalog.isLoading;

// export const selectError = (state) => state.catalog.isError;

// export const selectPage = (state) => state.catalog.page;

// export const selectPerPage = (state) => state.catalog.perPage;

// export const selectVisibleItems = createSelector(
//   [selectAllItems, selectPage, selectPerPage],
//   (allItems, page, perPage) => {
//     const endIndex = page * perPage;
//     return allItems.slice(0, endIndex);
//   }
// );

// export const selectLoadMore = createSelector(
//   [selectVisibleItems, selectTotalCampersCount],
//   (visibleItems, totalCampersCount) => {

//     return visibleItems.length < totalCampersCount;
//   }
// );

// export const { loadMoreItems, resetCatalogState } = catalogSlice.actions;
// export const catalogSliceReducer = catalogSlice.reducer;

const FilterBar = () => {

  return
}

export default FilterBar;


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectFilters } from '../../redux/catalogSlice'; // Імпортуємо селектор для фільтрів
// import styles from './FilterBar.module.css';

// const FilterBar = ({ onSetFilter, onResetFilters }) => {
//   const currentFilters = useSelector(selectFilters); // Отримуємо поточні фільтри зі стору

//   // Локальний стан для форми фільтрів, щоб керувати input'ами
//   const [localLocation, setLocalLocation] = useState(currentFilters.location);
//   const [localEquipment, setLocalEquipment] = useState(currentFilters.equipment);
//   const [localVehicleType, setLocalVehicleType] = useState(currentFilters.vehicleType);

//   // Синхронізуємо локальний стан з Redux стором, якщо фільтри змінюються ззовні
//   useEffect(() => {
//     setLocalLocation(currentFilters.location);
//     setLocalEquipment(currentFilters.equipment);
//     setLocalVehicleType(currentFilters.vehicleType);
//   }, [currentFilters]);

//   const handleApplyFilters = () => {
//     onSetFilter({
//       location: localLocation,
//       equipment: localEquipment,
//       vehicleType: localVehicleType,
//     });
//   };

//   const handleReset = () => {
//     onResetFilters();
//     // Скидаємо локальний стан також
//     setLocalLocation('');
//     setLocalEquipment([]);
//     setLocalVehicleType('');
//   };

//   const handleEquipmentChange = (e) => {
//     const { value, checked } = e.target;
//     setLocalEquipment(prev =>
//       checked ? [...prev, value] : prev.filter(item => item !== value)
//     );
//   };

//   return (
//     <div className={styles.filterBar}>
//       <h3>Фільтри</h3>
//       <div className={styles.filterGroup}>
//         <label htmlFor="location">Локація:</label>
//         <input
//           type="text"
//           id="location"
//           value={localLocation}
//           onChange={(e) => setLocalLocation(e.target.value)}
//           placeholder="Київ, Львів..."
//         />
//       </div>

//       <div className={styles.filterGroup}>
//         <h4>Обладнання:</h4>
//         <label>
//           <input
//             type="checkbox"
//             value="airConditioner"
//             checked={localEquipment.includes('airConditioner')}
//             onChange={handleEquipmentChange}
//           />
//           Кондиціонер
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             value="kitchen"
//             checked={localEquipment.includes('kitchen')}
//             onChange={handleEquipmentChange}
//           />
//           Кухня
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             value="beds"
//             checked={localEquipment.includes('beds')}
//             onChange={handleEquipmentChange}
//           />
//           Ліжка
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             value="TV"
//             checked={localEquipment.includes('TV')}
//             onChange={handleEquipmentChange}
//           />
//           TV
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             value="bathroom"
//             checked={localEquipment.includes('bathroom')}
//             onChange={handleEquipmentChange}
//           />
//           Ванна/Душ
//         </label>
//         {/* Додайте інші варіанти обладнання */}
//       </div>

//       <div className={styles.filterGroup}>
//         <h4>Тип транспорту:</h4>
//         <label>
//           <input
//             type="radio"
//             name="vehicleType"
//             value="panelTruck"
//             checked={localVehicleType === 'panelTruck'}
//             onChange={(e) => setLocalVehicleType(e.target.value)}
//           />
//           Фургон
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="vehicleType"
//             value="fullyIntegrated"
//             checked={localVehicleType === 'fullyIntegrated'}
//             onChange={(e) => setLocalVehicleType(e.target.value)}
//           />
//           Інтегрований
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="vehicleType"
//             value="alcove"
//             checked={localVehicleType === 'alcove'}
//             onChange={(e) => setLocalVehicleType(e.target.value)}
//           />
//           Альков
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="vehicleType"
//             value="" // Опція "Всі"
//             checked={localVehicleType === ''}
//             onChange={(e) => setLocalVehicleType(e.target.value)}
//           />
//           Всі
//         </label>
//       </div>

//       <div className={styles.buttonGroup}>
//         <button onClick={handleApplyFilters} className={styles.applyButton}>Застосувати фільтри</button>
//         <button onClick={handleReset} className={styles.resetButton}>Скинути фільтри</button>
//       </div>
//     </div>
//   );
// };

// export default FilterBar;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilters,
  resetFilters,
  selectCurrentFilters,
} from '../../redux/catalogSlice';
import styles from './FilterBar.module.css';

// Приклади імпорту іконок (ЗАМІНІТЬ НА ВАШІ РЕАЛЬНІ ІКОНКИ)
// import { ReactComponent as AcIcon } from '../../assets/icons/ac.svg';
// import { ReactComponent as AutomaticIcon } from '../../assets/icons/automatic.svg';
// import { ReactComponent as KitchenIcon } from '../../assets/icons/kitchen.svg';
// import { ReactComponent as TvIcon } from '../../assets/icons/tv.svg';
// import { ReactComponent as BathroomIcon } from '../../assets/icons/bathroom.svg';
// import { ReactComponent as VanIcon } from '../../assets/icons/van.svg';
// import { ReactComponent as FullyIntegratedIcon } from '../../assets/icons/fullyIntegrated.svg';
// import { ReactComponent as AlcoveIcon } from '../../assets/icons/alcove.svg';

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentReduxFilters = useSelector(selectCurrentFilters);

  const [localFilters, setLocalFilters] = useState({
    location: '',
    equipment: {
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
    },
    vehicleType: '', // Змінено на рядок для зберігання вибраного типу ТЗ (або порожній рядок для жодного)
  });

  // Синхронізуємо локальний стан з Redux при зміні Redux фільтрів
  useEffect(() => {
    // Для vehicleType потрібно конвертувати об'єкт { van: true, alcove: false } в рядок 'van'
    const selectedVehicleTypeKey = Object.keys(currentReduxFilters.vehicleType).find(
      (key) => currentReduxFilters.vehicleType[key]
    );

    setLocalFilters({
      ...currentReduxFilters,
      vehicleType: selectedVehicleTypeKey || '', // Якщо нічого не вибрано, ставимо порожній рядок
    });
  }, [currentReduxFilters]);

  const handleLocationChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleEquipmentChange = (name) => {
    setLocalFilters((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [name]: !prev.equipment[name], // Перемикаємо стан
      },
    }));
  };

  // Оновлена логіка для Vehicle Type: тепер це поводиться як радіо-група,
  // але з можливістю зняти вибір, якщо натиснути на вже вибраний елемент.
  const handleVehicleTypeChange = (name) => {
    setLocalFilters((prev) => {
      // Якщо натиснуто на вже вибраний тип, деактивуємо його (встановлюємо порожній рядок)
      const newVehicleType = prev.vehicleType === name ? '' : name;
      return {
        ...prev,
        vehicleType: newVehicleType,
      };
    });
  };

  const handleSearch = () => {
    // Перед відправкою до Redux, конвертуємо localFilters.vehicleType (рядок)
    // назад в об'єкт булевих значень, щоб він відповідав структурі Redux.
    const reduxVehicleType = {
      van: false,
      fullyIntegrated: false,
      alcove: false,
    };
    if (localFilters.vehicleType) {
      reduxVehicleType[localFilters.vehicleType] = true;
    }

    dispatch(
      setFilters({
        location: localFilters.location,
        equipment: localFilters.equipment,
        vehicleType: reduxVehicleType, // Передаємо конвертований об'єкт
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.filterBar}>
      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Location</h3>
        <input
          type="text"
          placeholder="City"
          value={localFilters.location}
          onChange={handleLocationChange}
          className={styles.locationInput}
          aria-label="Filter by city"
        />
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
        <div className={styles.filterGroup} role="group" aria-labelledby="equipment-heading">
          {[
            { id: 'ac', label: 'AC', name: 'AC', icon: <i></i> }, // Додайте `<AcIcon />` тут
            { id: 'automatic', label: 'Automatic', name: 'automatic', icon: <i></i> }, // Додайте `<AutomaticIcon />`
            { id: 'kitchen', label: 'Kitchen', name: 'kitchen', icon: <i></i> }, // Додайте `<KitchenIcon />`
            { id: 'tv', label: 'TV', name: 'TV', icon: <i></i> }, // Додайте `<TvIcon />`
            { id: 'bathroom', label: 'Bathroom', name: 'bathroom', icon: <i></i> }, // Додайте `<BathroomIcon />`
          ].map((item) => (
            <label
              key={item.id}
              className={`${styles.filterItem} ${styles.iconLabel} ${localFilters.equipment[item.name] ? styles.selected : ''}`}
            >
              <input
                type="checkbox"
                id={item.id}
                checked={localFilters.equipment[item.name]}
                onChange={() => handleEquipmentChange(item.name)}
                className={styles.hiddenCheckbox} // Приховати стандартний чекбокс
                aria-label={`Filter by ${item.label}`}
              />
              <div className={styles.iconWrapper}>
                {item.icon} {/* Місце для вашої іконки */}
                <span>{item.label}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <div className={styles.filterGroup} role="group" aria-labelledby="vehicle-type-heading">
          {[
            { id: 'van', label: 'Van', name: 'van', icon: <i></i> }, // Додайте `<VanIcon />`
            { id: 'fully-integrated', label: 'Fully Integrated', name: 'fullyIntegrated', icon: <i></i> }, // Додайте `<FullyIntegratedIcon />`
            { id: 'alcove', label: 'Alcove', name: 'alcove', icon: <i></i> }, // Додайте `<AlcoveIcon />`
          ].map((item) => (
            <label
              key={item.id}
              className={`${styles.filterItem} ${styles.iconLabel} ${localFilters.vehicleType === item.name ? styles.selected : ''}`}
            >
              <input
                type="radio" // Змінено на radio
                name="vehicleType" // Всі radio buttons в одній групі мають однаковий name
                id={item.id}
                checked={localFilters.vehicleType === item.name} // Перевіряємо, чи цей тип вибраний
                onChange={() => handleVehicleTypeChange(item.name)}
                className={styles.hiddenRadio} // Приховати стандартний радіо
                aria-label={`Filter by ${item.label}`}
              />
              <div className={styles.iconWrapper}>
                {item.icon} {/* Місце для вашої іконки */}
                <span>{item.label}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.searchSection}>
        <button type="button" className={styles.searchButton} aria-label="Apply filters" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className={styles.resetButton} aria-label="Reset filters" onClick={handleReset}>
          Reset
        </button>
      </section>
    </div>
  );
};

export default FilterBar;


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setFilters, // Екшен для застосування фільтрів
//   resetFilters, // Екшен для скидання фільтрів
//   selectCurrentFilters, // Селектор для читання поточних фільтрів з Redux
// } from '../../redux/catalogSlice'; // Шлях до вашого Redux Slice
// import styles from './FilterBar.module.css';

// const FilterBar = () => {
//   const dispatch = useDispatch();
//   const currentReduxFilters = useSelector(selectCurrentFilters); // Отримуємо поточні фільтри з Redux

//   // Локальний стан для елементів форми фільтрів
//   const [localFilters, setLocalFilters] = useState({
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
//   });

//   // Ефект для синхронізації локального стану з Redux (наприклад, після resetFilters)
//   useEffect(() => {
//     setLocalFilters(currentReduxFilters);
//   }, [currentReduxFilters]); // Залежність від зміни Redux фільтрів

//   const handleLocationChange = (e) => {
//     setLocalFilters(prev => ({ ...prev, location: e.target.value }));
//   };

//   const handleEquipmentChange = (name) => {
//     setLocalFilters(prev => ({
//       ...prev,
//       equipment: {
//         ...prev.equipment,
//         [name]: !prev.equipment[name], // Перемикаємо стан checkbox
//       },
//     }));
//   };

//   const handleVehicleTypeChange = (name) => {
//     setLocalFilters(prev => {
//       const newVehicleType = {};
//       // Для radio buttons, лише один може бути true
//       Object.keys(prev.vehicleType).forEach(key => {
//         newVehicleType[key] = (key === name); // Встановлюємо true для вибраного, false для інших
//       });
//       return {
//         ...prev,
//         vehicleType: newVehicleType,
//       };
//     });
//   };

//   // Обробник для кнопки "Search" - застосовує фільтри через Redux
//   const handleSearch = () => {
//     dispatch(setFilters(localFilters)); // Диспетчеризуємо локальні фільтри до Redux
//   };

//   // Обробник для кнопки "Reset" - скидає фільтри в Redux та локально
//   const handleReset = () => {
//     dispatch(resetFilters()); // Скидаємо фільтри в Redux
//     // Локальний стан автоматично оновиться через useEffect, який залежить від currentReduxFilters
//   };

//   return (
//     <div className={styles.filterBar}>
//       <section className={styles.filterSection}>
//         <h3 className={styles.sectionTitle}>Location</h3>
//         <input
//           type="text"
//           placeholder="City"
//           value={localFilters.location}
//           onChange={handleLocationChange}
//           className={styles.locationInput}
//           aria-label="Filter by city"
//         />
//       </section>

//       <section className={styles.filterSection}>
//         <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
//         <div className={styles.filterGroup} role="group" aria-labelledby="equipment-heading">
//           {[
//             { id: 'ac', label: 'AC', name: 'AC' },
//             { id: 'automatic', label: 'Automatic', name: 'automatic' }, // automatic is transmission
//             { id: 'kitchen', label: 'Kitchen', name: 'kitchen' },
//             { id: 'tv', label: 'TV', name: 'TV' },
//             { id: 'bathroom', label: 'Bathroom', name: 'bathroom' },
//             // Додайте інші елементи обладнання, які відповідають вашим даним кемперів
//           ].map((item) => (
//             <label key={item.id} className={styles.filterItem}>
//               <input
//                 type="checkbox"
//                 id={item.id}
//                 checked={localFilters.equipment[item.name]} // Перевіряємо локальний стан
//                 onChange={() => handleEquipmentChange(item.name)}
//                 aria-label={`Filter by ${item.label}`}
//               />
//               {item.label}
//             </label>
//           ))}
//         </div>
//       </section>

//       <section className={styles.filterSection}>
//         <h3 className={styles.sectionTitle}>Vehicle type</h3>
//         <div className={styles.filterGroup} role="group" aria-labelledby="vehicle-type-heading">
//           {[
//             { id: 'van', label: 'Van', name: 'van' }, // Camper form: "panelTruck"
//             { id: 'fully-integrated', label: 'Fully Integrated', name: 'fullyIntegrated' }, // Camper form: "fullyIntegrated"
//             { id: 'alcove', label: 'Alcove', name: 'alcove' }, // Camper form: "alcove"
//           ].map((item) => (
//             <label key={item.id} className={styles.filterItem}>
//               <input
//                 type="radio" // Змінено на radio
//                 name="vehicleType" // Важливо: всі radio buttons в одній групі мають однаковий name
//                 id={item.id}
//                 checked={localFilters.vehicleType[item.name]} // Перевіряємо локальний стан
//                 onChange={() => handleVehicleTypeChange(item.name)}
//                 aria-label={`Filter by ${item.label}`}
//               />
//               {item.label}
//             </label>
//           ))}
//           {/* Додайте кнопку для скидання вибору типу ТЗ, якщо потрібно "жодного" */}
//           <label className={styles.filterItem}>
//             <input
//               type="radio"
//               name="vehicleType"
//               id="all-types"
//               checked={Object.values(localFilters.vehicleType).every(val => !val)}
//               onChange={() => handleVehicleTypeChange('')} // Пустий рядок або спеціальне значення для "Всі"
//             />
//             Усі типи
//           </label>
//         </div>
//       </section>

//       <section className={styles.searchSection}>
//         <button type="button" className={styles.searchButton} aria-label="Apply filters" onClick={handleSearch}>
//           Search
//         </button>
//         <button type="button" className={styles.resetButton} aria-label="Reset filters" onClick={handleReset}>
//           Reset
//         </button>
//       </section>
//     </div>
//   );
// };

// export default FilterBar;
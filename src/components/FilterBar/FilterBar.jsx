import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectCurrentFilters } from '../../redux/filtersSlice';
import { resetPagination } from '../../redux/catalogSlice';
import styles from './FilterBar.module.css';

// Приклади імпорту іконок (ЗАМІНИТИ НА РЕАЛЬНІ ІКОНКИ)
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
    vehicleType: {
      van: false,
      fullyIntegrated: false,
      alcove: false,
    },
  });

  useEffect(() => {
    setLocalFilters({
      location: currentReduxFilters.location,
      equipment: { ...currentReduxFilters.equipment },
      vehicleType: { ...currentReduxFilters.vehicleType },
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
        [name]: !prev.equipment[name],
      },
    }));
  };

  const handleVehicleTypeChange = (name) => {
    setLocalFilters((prev) => {
      const newVehicleTypeState = {
        van: false,
        fullyIntegrated: false,
        alcove: false,
      };

      if (prev.vehicleType[name]) {
        return {
          ...prev,
          vehicleType: newVehicleTypeState,
        };
      } else {
        newVehicleTypeState[name] = true;
        return {
          ...prev,
          vehicleType: newVehicleTypeState,
        };
      }
    });
  };

  const handleSearch = () => {
    dispatch(
      setFilters({
        location: localFilters.location,
        equipment: localFilters.equipment,
        vehicleType: localFilters.vehicleType, // Відправляємо об'єкт як є
      })
    );
    dispatch(resetPagination());
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
            { id: 'ac', label: 'AC', name: 'AC', icon: <i></i> },
            { id: 'automatic', label: 'Automatic', name: 'automatic', icon: <i></i> },
            { id: 'kitchen', label: 'Kitchen', name: 'kitchen', icon: <i></i> },
            { id: 'tv', label: 'TV', name: 'TV', icon: <i></i> },
            { id: 'bathroom', label: 'Bathroom', name: 'bathroom', icon: <i></i> },
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
                className={styles.hiddenCheckbox}
                aria-label={`Filter by ${item.label}`}
              />
              <div className={styles.iconWrapper}>
                {item.icon}
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
            { id: 'van', label: 'Van', name: 'van', icon: <i></i> }, // <-- ПОВЕРНУЛИ 'van' сюди
            { id: 'fully-integrated', label: 'Fully Integrated', name: 'fullyIntegrated', icon: <i></i> },
            { id: 'alcove', label: 'Alcove', name: 'alcove', icon: <i></i> },
          ].map((item) => (
            <label
              key={item.id}
              className={`${styles.filterItem} ${styles.iconLabel} ${localFilters.vehicleType[item.name] ? styles.selected : ''}`}
            >
              <input
                type="checkbox"
                name="vehicleTypeToggle"
                id={item.id}
                checked={localFilters.vehicleType[item.name]}
                onChange={() => handleVehicleTypeChange(item.name)}
                className={styles.hiddenCheckbox}
                aria-label={`Filter by ${item.label}`}
              />
              <div className={styles.iconWrapper}>
                {item.icon}
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
      </section>
    </div>
  );
};

export default FilterBar;
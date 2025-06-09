import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, selectCurrentFilters } from '../../redux/filtersSlice';
import { resetPagination } from '../../redux/catalogSlice';
import styles from './FilterBar.module.css';
import clsx from 'clsx';

import AcIconSrc from '../../assets/icons/AC.svg';
import AutomaticIconSrc from '../../assets/icons/automatic.svg';
import KitchenIconSrc from '../../assets/icons/kitchen.svg';
import TvIconSrc from '../../assets/icons/tv.svg';
import BathroomIconSrc from '../../assets/icons/bathroom.svg';
import VanIconSrc from '../../assets/icons/van.svg';
import FullyIntegratedIconSrc from '../../assets/icons/fullyIntegrated.svg';
import AlcoveIconSrc from '../../assets/icons/alcove.svg';


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
        vehicleType: localFilters.vehicleType,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="2"
          viewBox="0 0 360 2"
          fill="none"
        >
          <path d="M0 1H360" stroke="#DADDE1" />
        </svg>

        <div className={styles.filterGroup} role="group" aria-labelledby="equipment-heading">
          {[
            { id: 'ac', label: 'AC', name: 'AC', iconSrc: AcIconSrc }, 
            { id: 'automatic', label: 'Automatic', name: 'automatic', iconSrc: AutomaticIconSrc }, 
            { id: 'kitchen', label: 'Kitchen', name: 'kitchen', iconSrc: KitchenIconSrc }, 
            { id: 'tv', label: 'TV', name: 'TV', iconSrc: TvIconSrc }, 
            { id: 'bathroom', label: 'Bathroom', name: 'bathroom', iconSrc: BathroomIconSrc }, 
          ].map((item) => (
            <label
              key={item.id}
              className={clsx(styles.filterItem, styles.iconLabel, {
                [styles.selected]: localFilters.equipment[item.name],
              })}
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
                <img src={item.iconSrc} alt={item.label} width="32" height="32" />
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="2"
          viewBox="0 0 360 2"
          fill="none"
        >
          <path d="M0 1H360" stroke="#DADDE1" />
        </svg>

        <div className={styles.filterGroup} role="group" aria-labelledby="vehicle-type-heading">
          {[
            // І тут так само
            { id: 'van', label: 'Van', name: 'van', iconSrc: VanIconSrc }, 
            { id: 'fully-integrated', label: 'Fully Integrated', name: 'fullyIntegrated', iconSrc: FullyIntegratedIconSrc }, 
            { id: 'alcove', label: 'Alcove', name: 'alcove', iconSrc: AlcoveIconSrc }, 
          ].map((item) => (
            <label
              key={item.id}
              className={clsx(styles.filterItem, styles.iconLabel, {
                [styles.selected]: localFilters.vehicleType[item.name],
              })}
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
                <img src={item.iconSrc} alt={item.label} width="32" height="32" />
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
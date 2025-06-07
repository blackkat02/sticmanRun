import React, { useState } from 'react';
import styles from './FilterBar.module.css';

const FilterBar = () => {
  const [filters, setFilters] = useState({
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

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleEquipmentChange = (name) => {
    setFilters({
      ...filters,
      equipment: {
        ...filters.equipment,
        [name]: !filters.equipment[name],
      },
    });
  };

  const handleVehicleTypeChange = (name) => {
    setFilters({
      ...filters,
      vehicleType: {
        ...filters.vehicleType,
        [name]: !filters.vehicleType[name],
      },
    });
  };

  return (
    <div className={styles.filterBar}>
      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Location</h3>
        <input
          type="text"
          placeholder="City"
          value={filters.location}
          onChange={handleLocationChange}
          className={styles.locationInput}
          aria-label="Filter by city"
        />
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
        <div className={styles.filterGroup} role="group" aria-labelledby="equipment-heading">
          {[
            { id: 'ac', label: 'AC', name: 'AC' },
            { id: 'automatic', label: 'Automatic', name: 'automatic' },
            { id: 'kitchen', label: 'Kitchen', name: 'kitchen' },
            { id: 'tv', label: 'TV', name: 'TV' },
            { id: 'bathroom', label: 'Bathroom', name: 'bathroom' },
          ].map((item) => (
            <label key={item.id} className={styles.filterItem}>
              <input
                type="checkbox"
                id={item.id}
                checked={filters.equipment[item.name]}
                onChange={() => handleEquipmentChange(item.name)}
                aria-label={`Filter by ${item.label}`}
              />
              {item.label}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <div className={styles.filterGroup} role="group" aria-labelledby="vehicle-type-heading">
          {[
            { id: 'van', label: 'Van', name: 'van' },
            { id: 'fully-integrated', label: 'Fully Integrated', name: 'fullyIntegrated' },
            { id: 'alcove', label: 'Alcove', name: 'alcove' },
          ].map((item) => (
            <label key={item.id} className={styles.filterItem}>
              <input
                type="checkbox"
                id={item.id}
                checked={filters.vehicleType[item.name]}
                onChange={() => handleVehicleTypeChange(item.name)}
                aria-label={`Filter by ${item.label}`}
              />
              {item.label}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.searchSection}>
        <button type="button" className={styles.searchButton} aria-label="Apply filters">
          Search
        </button>
      </section>
    </div>
  );
};

export default FilterBar;

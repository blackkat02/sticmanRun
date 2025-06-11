import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './CamperFeatures.module.css';

const Icon = ({ name }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'transmission': return '⚙️';
      case 'engine': return '⛽';
      case 'AC': return '❄️';
      case 'bathroom': return '🚿';
      case 'kitchen': return '🍳';
      case 'TV': return '📺';
      case 'radio': return '📻';
      case 'refrigerator': return '🧊';
      case 'microwave': return '♨️';
      case 'gas': return '🔥';
      case 'water': return '💧';
      case 'length': return '📏';
      case 'width': return '↔️';
      case 'height': return '↕️';
      case 'tank': return '💧';
      case 'consumption': return '📊';
      case 'beds': return '🛏️';
      case 'form': return '🚐';
      default: return '❓';
    }
  };
  return <span className={styles.iconPlaceholder}>{getIcon(name)}</span>;
};


const CamperFeatures = () => {
  const { camper } = useOutletContext(); 

  if (!camper) {
    return <p>Немає даних для відображення характеристик.</p>;
  }

  let vehicleTypeDisplay = '';
  switch (camper.form) {
    case 'panelTruck':
      vehicleTypeDisplay = 'Фургон';
      break;
    case 'fullyIntegrated':
      vehicleTypeDisplay = 'Інтегрований';
      break;
    case 'alcove':
      vehicleTypeDisplay = 'Альков';
      break;
    default:
      vehicleTypeDisplay = camper.form;
  }

  const characteristics = [
    camper.transmission === 'automatic' && { label: 'Automatic', icon: 'transmission' },
    camper.engine && { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: 'engine' },
    camper.AC && { label: 'AC', icon: 'AC' },
    camper.bathroom && { label: 'Bathroom', icon: 'bathroom' },
    camper.kitchen && { label: 'Kitchen', icon: 'kitchen' },
    camper.TV && { label: 'TV', icon: 'TV' },
    camper.radio && { label: 'Radio', icon: 'radio' },
    camper.refrigerator && { label: 'Refrigerator', icon: 'refrigerator' },
    camper.microwave && { label: 'Microwave', icon: 'microwave' },
    camper.gas && { label: 'Gas', icon: 'gas' },
    camper.water && { label: 'Water', icon: 'water' },
    camper.details?.beds && { label: `${camper.details.beds} beds`, icon: 'beds' },
    camper.form && { label: vehicleTypeDisplay, icon: 'form' },
  ].filter(Boolean);

  const details = [
    camper.length && { label: `Length: ${camper.length}`, icon: 'length' },
    camper.width && { label: `Width: ${camper.width}`, icon: 'width' },
    camper.height && { label: `Height: ${camper.height}`, icon: 'height' },
    camper.tank && { label: `Tank: ${camper.tank}`, icon: 'tank' },
    camper.consumption && { label: `Consumption: ${camper.consumption}`, icon: 'consumption' },
  ].filter(Boolean);

  return (
    <div className={styles.featuresContent}>
      <div className={styles.characteristicsSection}>
        <h3 className={styles.sectionTitle}>Vehicle Characteristics</h3>
        <ul className={styles.characteristicsList}>
          {characteristics.map((char, index) => (
            <li key={index} className={styles.characteristicItem}>
              <Icon name={char.icon} /> {char.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.detailsSection}>
        <h3 className={styles.sectionTitle}>Details</h3>
        <ul className={styles.detailsSpecsList}>
          {details.map((detail, index) => (
            <li key={index} className={styles.detailSpecItem}>
              <Icon name={detail.icon} /> {detail.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CamperFeatures;
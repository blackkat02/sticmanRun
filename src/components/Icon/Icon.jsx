// src/components/Icon/Icon.jsx
import React from 'react';
import styles from './Icon.module.css'; // Створіть цей CSS-файл

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

export default Icon;
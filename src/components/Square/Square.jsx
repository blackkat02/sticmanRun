import React from 'react';
import styles from './Square.module.css'; // Оновлений імпорт

const Square = ({ isLight }) => {
  // Використання styles.light або styles.dark
  const className = isLight ? styles.light : styles.dark;
  return (
    <div className={`${styles.square} ${className}`}></div> 
  );
};

export default Square;
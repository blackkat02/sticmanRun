import React from 'react';
import styles from './Square.module.css';

const Square = ({ isLight, id, showSquareId }) => {
  const className = isLight ? styles.light : styles.dark;
  return (
    <div
      id={id}
      className={`${styles.square} ${className}`}
    >
      {showSquareId && <span className={styles.squareIdLabel}>{id}</span>}
    </div>
  );
};

export default Square;
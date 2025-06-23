import React from 'react';
import styles from './Square.module.css';
import Piece from '../Piece/Piece';

const Square = ({ isLight, id, showSquareId, pieceType }) => {
  const className = isLight ? styles.light : styles.dark;
  return (
    <div
      id={id}
      className={`${styles.square} ${className}`}
    >
      {showSquareId && <span className={styles.squareIdLabel}>{id}</span>}
      {pieceType && <Piece type={pieceType} />}
    </div>
  );
};

export default Square;

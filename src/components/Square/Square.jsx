// Square.jsx (Виправлено)
import React from 'react';
import Piece from '../Piece/Piece'; // Переконайтесь, що шлях правильний
import styles from './Square.module.css';

const Square = ({ id, isLight, showSquareId, pieceType, onClick }) => {
  // console.log(`Рендер клітинки: ${id}`); // Тепер використовуємо 'id'

  return (
    <div
      // Використовуємо 'id' для класів, якщо стилі залежать від алгебраїчної нотації
      className={`${styles.square} ${isLight ? styles.light : styles.dark} ${styles[id] || ''}`}
      onClick={onClick}
    >
      {showSquareId && <span className={styles.squareId}>{id}</span>} {/* <-- Виправлено на 'id' */}
      {pieceType && <Piece type={pieceType} />}
    </div>
  );
};

export default React.memo(Square);
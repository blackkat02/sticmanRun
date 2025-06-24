// src/components/Piece/Piece.jsx
import React from 'react';
import styles from './Piece.module.css';

const getPieceSymbol = (pieceType) => {
  const symbols = {
    // Білі фігури (світлі символи)
    'wp': '♙', // White Pawn (U+2659)
    'wn': '♘', // White Knight (U+2658)
    'wb': '♗', // White Bishop (U+2657)
    'wr': '♖', // White Rook (U+2656) - ВАЛІДНО
    'wq': '♕', // White Queen (U+2655) - ВАЛІДНО
    'wk': '♔', // White King (U+2654) - ВАЛІДНО

    // Чорні фігури (темні символи)
    'bp': '♟', // Black Pawn (U+265F)
    'bn': '♞', // Black Knight (U+265E)
    'bb': '♝', // Black Bishop (U+265D)
    'br': '♜', // Black Rook (U+265C) - ВАЛІДНО
    'bq': '♛', // Black Queen (U+265B) - ВАЛІДНО
    'bk': '♚'  // Black King (U+265A) - ВАЛІДНО
  };
  return symbols[pieceType] || '';
};

const Piece = ({ type }) => {
  const symbol = getPieceSymbol(type);
  return (
    <span className={styles.piece}>
      {symbol}
    </span>
  );
};

export default React.memo(Piece); // Не забудьте мемоізувати, як ми раніше обговорювали
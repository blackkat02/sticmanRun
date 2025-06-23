import React from 'react';
import styles from './Piece.module.css'; 

const getPieceSymbol = (pieceType) => {
  const symbols = {
    'wp': '♟', // White Pawn
    'wn': '♞', // White Knight
    'wb': '♝', // White Bishop
    'wr': '♖', // White Rook
    'wq': '♕', // White Queen
    'wk': '♔', // White King
    'bp': '♙', // Black Pawn
    'bn': '♘', // Black Knight
    'bb': '♗', // Black Bishop
    'br': '♜', // Black Rook
    'bq': '♛', // Black Queen
    'bk': '♚'  // Black King
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

export default Piece;
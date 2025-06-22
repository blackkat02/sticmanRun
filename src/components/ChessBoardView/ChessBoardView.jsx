import React from 'react';
import Square from '../Square/Square';
import styles from './ChessBoardView.module.css';

const ChessBoardView = () => {
  const board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      board.push(<Square key={`${i}-${j}`} isLight={isLight} />);
    }
  }

  return (
    <div className={styles.chessBoard}>
      {board}
    </div>
  );
};

export default ChessBoardView;
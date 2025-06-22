import React from 'react';
import ChessBoardView from '../ChessBoardView/ChessBoardView';

const ChessGameContainer = () => {
  return (
    <div className="chess-game-container">
      <h2>Шахова партія</h2>
      <ChessBoardView />
    </div>
  );
};

export default ChessGameContainer;
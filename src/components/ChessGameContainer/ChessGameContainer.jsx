import React from 'react';
import ChessBoardView from '../ChessBoardView/ChessBoardView';

const ChessGameContainer = ({ showSquareId }) => {
  return (
    <div className="chess-game-container">
      <h2>Шахова партія</h2>
      <ChessBoardView showSquareId={showSquareId} />
    </div>
  );
};

export default ChessGameContainer;
// GameBoard.jsx
import React from 'react';
// Виправлені імпорти: додано .jsx розширення
import { Cell } from '../Cell/Cell.jsx'; 
import Sticman from '../Sticman/Sticman.jsx'; 

export const GameBoard = ({ playerPosition, onCellClick }) => {
  const boardWidthInCells = 20;
  const numberOfLevels = 3;

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardWidthInCells}, 50px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, 50px)`,
    gap: '0px',
    maxWidth: '100%',
    overflowX: 'auto',
    margin: '20px auto',
    border: '2px solid #333',
    transform: 'scaleY(-1)', // Перевертаємо по вертикалі для візуалізації рівнів
  };

  const cellContainerStyle = {
    transform: 'scaleY(-1)', // Перевертаємо кожну клітинку назад, щоб вміст був правильним
    position: 'relative', // Важливо для позиціонування Sticman
  };

  const cells = [];
  for (let level = 0; level < numberOfLevels; level++) {
    for (let x = 0; x < boardWidthInCells; x++) {
      // Перевіряємо, чи поточна клітинка є позицією гравця
      // playerPosition тепер завжди об'єкт { x, level }
      const isPlayerHere = playerPosition.x === x && playerPosition.level === level;

      cells.push(
        <div key={`${x}-${level}`} style={cellContainerStyle}>
          <Cell 
            x={x} 
            level={level}
            onClick={() => onCellClick(x, level)} // Передаємо клік назад в HomePage
          >
            {/* Якщо гравець на цій клітинці, відображаємо Sticman */}
            {isPlayerHere && <Sticman positionX={x} positionY={level} level={level} />}
          </Cell>
        </div>
      );
    }
  }

  return (
    <div style={boardStyle}>
      {cells}
    </div>
  );
};

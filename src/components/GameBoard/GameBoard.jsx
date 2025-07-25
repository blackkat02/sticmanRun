// GameBoard.jsx
import React from 'react';
import { Cell } from '../Cell/Cell.jsx'; // Переконайтеся, що шлях правильний і розширення .jsx
import Sticman from '../Sticman/Sticman.jsx'; // Переконайтеся, що шлях правильний і розширення .jsx

// GameBoard тепер отримує лише playerPosition як пропс
export const GameBoard = ({ playerPosition }) => { 
  const boardWidthInCells = 20;
  const numberOfLevels = 3;

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${boardWidthInCells}, 50px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, 50px)`,
    gap: '0px',
    maxWidth: '100%',
    overflowX: 'auto', // Дозволяє горизонтальну прокрутку, якщо дошка ширша за екран
    margin: '20px auto', // Центрує дошку по горизонталі
    border: '2px solid #333', // Бордер для всієї дошки
    transform: 'scaleY(-1)', // Перевертаємо по вертикалі для візуалізації рівнів (0-й рівень знизу)
  };

  const cellContainerStyle = {
    transform: 'scaleY(-1)', // Перевертаємо кожну клітинку назад, щоб вміст (текст, кінь) був правильним
    position: 'relative', // Важливо для позиціонування Sticman всередині клітинки
  };

  const cells = [];
  // Генеруємо клітинки для кожного рівня та координати X
  for (let level = 0; level < numberOfLevels; level++) {
    for (let x = 0; x < boardWidthInCells; x++) {
      // Перевіряємо, чи поточна клітинка є позицією гравця
      // playerPosition - це об'єкт { x, level }
      const isPlayerHere = playerPosition.x === x && playerPosition.level === level;

      cells.push(
        <div key={`${x}-${level}`} style={cellContainerStyle}>
          <Cell 
            x={x} 
            level={level}
            // onClick більше не потрібен для руху, оскільки рух керується клавіатурою в HomePage
          >
            {/* Умовне відображення Sticman: показуємо його тільки на поточній позиції гравця */}
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


import React from 'react';
import { Cell } from '../Cell/Cell';

export const GameBoard = () => {
  // Розміри дошки
  const boardWidthInCells = 20; // 20 клітинок завширшки
  const numberOfLevels = 3;    // 3 рівні (0, 1, 2 або a, b, c)

  const boardStyle = {
    display: 'grid',
    // Створюємо колонки, де кожна клітинка має ширину 50px
    gridTemplateColumns: `repeat(${boardWidthInCells}, 50px)`,
    // Створюємо рядки, де кожна клітинка має висоту 50px
    gridTemplateRows: `repeat(${numberOfLevels}, 50px)`,
    gap: '0px', // Без проміжків між клітинками
    maxWidth: '100%', // Дошка на всю ширину екрана (або контейнера)
    overflowX: 'auto', // Прокрутка, якщо дошка ширша за екран
    margin: '20px auto', // Центруємо дошку
    border: '2px solid #333', // Бордер для всієї дошки
    // Щоб верхній рівень був зверху візуально, а не знизу
    transform: 'scaleY(-1)', // Перевертаємо по вертикалі
  };

  const cellContainerStyle = {
    transform: 'scaleY(-1)', // Кожну клітинку теж перевертаємо, щоб текст був правильним
  };

  const cells = [];
  for (let level = 0; level < numberOfLevels; level++) {
    for (let x = 0; x < boardWidthInCells; x++) {
      cells.push(
        <div key={`${x}-${level}`} style={cellContainerStyle}>
          <Cell 
            x={x} 
            y={level} // y тут фактично є рівнем
            level={level}
            onClick={() => console.log(`Натиснуто клітинку: X=${x}, Рівень=${level}`)} 
          />
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
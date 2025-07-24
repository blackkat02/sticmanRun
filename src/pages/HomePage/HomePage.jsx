// HomePage.jsx
import React, { useState } from 'react';
// Імпортуємо GameBoard. Переконайтеся, що шлях правильний і розширення .jsx
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx'; 
// Якщо у тебе є стилі для HomePage, імпортуй їх.
// import styles from './HomePage.module.css'; 

const HomePage = () => {
  // Стан для позиції гравця: { x: координата по горизонталі, level: рівень }
  // Починаємо з 0-ї клітинки на 0-му рівні
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 }); 

  // Функція для обробки кліків по клітинках
  const handleCellClick = (x, level) => {
    // Переміщуємо гравця на клікнуту позицію
    setPlayerPosition({ x, level });
    console.log(`Гравець переміщено на: X=${x}, Рівень=${level}`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Ігрове поле</h1>
      <p>Поточна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level}</p>
      {/* Передаємо поточну позицію гравця та функцію обробки кліка до GameBoard */}
      <GameBoard 
        playerPosition={playerPosition} 
        onCellClick={handleCellClick} 
      />
    </div>
  );
};

export default HomePage;

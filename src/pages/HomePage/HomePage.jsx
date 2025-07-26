// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  // Стан для позиції гравця: { x: координата по горизонталі, level: рівень }
  // Встановлюємо початковий рівень (level) на 0, щоб кінь був на першому поверсі (0a)
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 }); 

  // Використовуємо useEffect для додавання та видалення слухача подій клавіатури
  useEffect(() => {
    const handleKeyDown = (event) => {
      setPlayerPosition(prevPosition => {
        let newX = prevPosition.x;
        // Логіка руху: 'KeyD' для вперед (вправо), 'KeyA' для назад (вліво)
        if (event.code === 'KeyD') { 
          newX = prevPosition.x + 1;
        } else if (event.code === 'KeyA') { 
          newX = prevPosition.x - 1;
        }

        if (newX !== prevPosition.x) {
          console.log(`Гравець переміщено на: X=${newX}, Рівень=${prevPosition.level}`);
          return { ...prevPosition, x: newX };
        }
        return prevPosition;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Безкінечне Ігрове Поле</h1>
      <p>Поточна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level}</p>
      <GameBoard 
        playerPosition={playerPosition} 
      />
    </div>
  );
};

export default HomePage;

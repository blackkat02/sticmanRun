import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  // Єдине джерело істини для позиції гравця.
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const animationDuration = 1000;

  // Рефи для gameBoard все ще потрібні, але без імперативних методів
  const gameBoardRef = useRef(null);

  // onAnimationEnd нам також більше не потрібен, бо isAnimatingRef зник
  // Тому і onAnimationEnd не має сенсу

  // Використовуємо useCallback, щоб функція handleKeyDown не змінювалася
  // при кожному рендері, якщо playerPosition не змінився.
  const handleKeyDown = useCallback((event) => {
    // Ігноруємо, якщо клавіша затиснута. Блокування isAnimatingRef більше немає.
    if (event.repeat) {
      return;
    }
    
    let newX = playerPosition.x;

    if (event.code === 'KeyD') {
      newX += 1;
    } else if (event.code === 'KeyA') {
      newX -= 1;
    }

    // Якщо позиція змінюється, оновлюємо стан.
    if (newX !== playerPosition.x) {
      setPlayerPosition({ ...playerPosition, x: newX });
    }
  }, [playerPosition]);

  // Додаємо і видаляємо слухача подій.
  // Цей useEffect тепер чистий і зрозумілий.
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const currentCellName = `${playerPosition.x}-${playerPosition.level + 1}`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '20px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Безкінечне Ігрове Поле</h1>
        <p>
          Поточна логічна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level + 1}
          <br />
          **Поле:** {currentCellName}
        </p>
        <p>
          **Тривалість анімації (мсек):** {animationDuration}
        </p>
      </div>
      <div style={{ position: 'relative', width: '100%', height: `calc(100vh - ${200}px)`, overflow: 'hidden' }}>
        <GameBoard
          ref={gameBoardRef}
          playerPosition={playerPosition}
          animationDuration={animationDuration}
          // onAnimationEnd більше не потрібен
        />
      </div>
    </div>
  );
};

export default HomePage;
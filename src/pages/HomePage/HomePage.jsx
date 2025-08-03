import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  // Єдине джерело істини для позиції гравця.
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const animationDuration = 1000;

  const gameBoardRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Цей колбек тепер просто сигналізує про завершення анімації.
  // Стан playerPosition вже оновлений.
  const onAnimationEnd = useCallback(() => {
    isAnimatingRef.current = false;
  }, []);

  // Використовуємо useCallback, щоб функція handleKeyDown не змінювалася
  // при кожному рендері, якщо playerPosition не змінився.
  const handleKeyDown = useCallback((event) => {
    // Ігноруємо, якщо клавіша затиснута або триває анімація
    if (event.repeat || isAnimatingRef.current) {
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
      isAnimatingRef.current = true;
      setPlayerPosition({ ...playerPosition, x: newX }); // Декларативно оновлюємо позицію
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
          playerPosition={playerPosition} // Передаємо єдине джерело істини
          animationDuration={animationDuration}
          onAnimationEnd={onAnimationEnd}
        />
      </div>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const [boardState, setBoardState] = useState(new Map());
  const animationDuration = 1000;
  const gameBoardRef = useRef(null);

  // useRef для доступу до актуального стану дошки в обробнику подій
  const boardStateRef = useRef(boardState);
  useEffect(() => {
    boardStateRef.current = boardState;
  }, [boardState]);

  // Функція для ініціалізації дошки
  const initializeBoard = useCallback(() => {
    const board = new Map();
    for (let x = 0; x < 500; x++) {
      for (let level = 0; level < 3; level++) {
        let content = null;
        if (level === 0 && x > 3 && Math.random() < 0.3) {
            content = 'stone';
        }
        const key = `${x}-${level}`;
        board.set(key, { x, level, content });
      }
    }
    setBoardState(board);
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  // Оновлений обробник подій, який використовує useRef
  const handleKeyDown = useCallback((event) => {
    if (event.repeat) return;
    
    let newX = playerPosition.x;
    let newLevel = playerPosition.level;

    if (event.code === 'KeyD') newX += 1;
    else if (event.code === 'KeyA') newX -= 1;

    // Отримуємо найновіший стан дошки з рефа
    const currentBoard = boardStateRef.current;
    const targetCell = currentBoard.get(`${newX}-${newLevel}`);

    if (targetCell && targetCell.content === 'stone') {
      return;
    }
    
    if (newX !== playerPosition.x || newLevel !== playerPosition.level) {
      setPlayerPosition({ x: newX, level: newLevel });
    }
  }, [playerPosition]);

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
        {boardState.size > 0 && (
          <GameBoard
            ref={gameBoardRef}
            boardState={boardState}
            playerPosition={playerPosition}
            animationDuration={animationDuration}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;

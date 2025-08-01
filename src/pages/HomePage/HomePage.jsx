// HomePage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  const [displayPlayerPosition, setDisplayPlayerPosition] = useState({ x: 0, level: 0 });
  const logicalPlayerPositionRef = useRef({ x: 0, level: 0 });
  const animationDuration = 1000;

  const gameBoardRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const onAnimationEnd = useCallback(() => {
    isAnimatingRef.current = false;
    setDisplayPlayerPosition({ x: logicalPlayerPositionRef.current.x, level: logicalPlayerPositionRef.current.level });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat || isAnimatingRef.current) {
        return;
      }
      
      let newLogicalX = logicalPlayerPositionRef.current.x;

      if (event.code === 'KeyD') {
        newLogicalX += 1;
      } else if (event.code === 'KeyA') {
        newLogicalX -= 1;
      }

      if (newLogicalX !== logicalPlayerPositionRef.current.x) {
        isAnimatingRef.current = true;
        
        if (gameBoardRef.current) {
          gameBoardRef.current.movePlayer(newLogicalX, true, onAnimationEnd);
          logicalPlayerPositionRef.current = { ...logicalPlayerPositionRef.current, x: newLogicalX };
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (gameBoardRef.current) {
      gameBoardRef.current.movePlayer(logicalPlayerPositionRef.current.x, false);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAnimationEnd]);

  const currentCellName = `${displayPlayerPosition.x}-${displayPlayerPosition.level + 1}`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '20px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Безкінечне Ігрове Поле</h1>
        <p>
          Поточна логічна позиція коня: X={displayPlayerPosition.x}, Рівень={displayPlayerPosition.level + 1}
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
          playerPosition={displayPlayerPosition}
          animationDuration={animationDuration}
          onAnimationEnd={onAnimationEnd}
        />
      </div>
    </div>
  );
};

export default HomePage;
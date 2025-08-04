import React, { useRef, useState, forwardRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';

export const GameBoard = forwardRef(({ playerPosition, animationDuration }, ref) => {
  const cellSize = 50;
  const numberOfLevels = 3;
  
  const gameBoardRef = useRef(null);
  const [parentContainerWidth, setParentContainerWidth] = useState(0);

  const calculatePosition = useCallback((logicalX) => {
    // Важливо: перевіряємо, що parentContainerWidth > 0, інакше повертаємо 0, щоб уникнути помилок
    if (parentContainerWidth === 0) return 0;
    return (parentContainerWidth / 2) - (logicalX * cellSize) - (cellSize / 2);
  }, [parentContainerWidth, cellSize]);

  // ЦЕЙ useEffect ВІДПОВІДАЄ ЛИШЕ ЗА РОЗМІР КОНТЕЙНЕРА
  useEffect(() => {
    const updateParentContainerWidth = () => {
      if (gameBoardRef.current && gameBoardRef.current.parentElement) {
        setParentContainerWidth(gameBoardRef.current.parentElement.offsetWidth);
      }
    };
    updateParentContainerWidth();
    window.addEventListener('resize', updateParentContainerWidth);
    return () => {
      window.removeEventListener('resize', updateParentContainerWidth);
    };
  }, []); // Пустий масив, бо ця логіка не залежить від стану

  // ЦЕЙ useLayoutEffect ВІДПОВІДАЄ ЛИШЕ ЗА АНІМАЦІЮ ПРИ ЗМІНІ ПОЗИЦІЇ
  useLayoutEffect(() => {
    if (parentContainerWidth > 0 && gameBoardRef.current) {
      const newTargetPixelPosition = calculatePosition(playerPosition.x);
      
      gameBoardRef.current.style.transition = `transform ${animationDuration / 1000}s ease-out`;
      gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
    }
  }, [playerPosition.x, parentContainerWidth, animationDuration, calculatePosition]);

  // ЦЕЙ useEffect ВІДПОВІДАЄ ЛИШЕ ЗА ПОЧАТКОВУ ПОЗИЦІЮ БЕЗ АНІМАЦІЇ
  // Він спрацьовує лише один раз при першому рендері з коректними даними
  useEffect(() => {
    if (parentContainerWidth > 0 && gameBoardRef.current) {
        const initialPosition = calculatePosition(playerPosition.x);
        // Миттєве позиціонування
        gameBoardRef.current.style.transition = `transform ${animationDuration / 1000}s ease-out`;
        gameBoardRef.current.style.transform = `translateX(${initialPosition}px)`;
    }
  }, [parentContainerWidth, calculatePosition, playerPosition.x]);


  const totalRenderableCells = 500;
  const renderStartX = -250;
  
  const gameBoardStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    top: '0px',
    left: `${renderStartX * cellSize}px`,
    width: `${totalRenderableCells * cellSize}px`,
    border: '2px solid #333',
    backgroundColor: '#e0f7fa',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${totalRenderableCells}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, ${cellSize}px)`,
    gap: '0px',
    position: 'relative',
    left: '0px',
    bottom: '0px',
    width: '100%',
    transformOrigin: 'top left',
    zIndex: 1,
  };

  const cells = [];
  for (let level = numberOfLevels - 1; level >= 0; level--) {
    for (let x = renderStartX; x < totalRenderableCells + renderStartX; x++) {
      let cellContent = null;
      if (level === 0 && x <= 3) {
        // Do nothing
      } else if (level === 0 && Math.random() < 0.3) {
        cellContent = <Stone cellSize={cellSize} />;
      }
      cells.push(
        <div key={`${x}-${level}`} style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          gridColumnStart: (x - renderStartX) + 1,
          gridRowStart: (numberOfLevels - level),
        }}>
          <Cell
            x={x}
            level={level}
          >
            {cellContent}
          </Cell>
        </div>
      );
    }
  }

  const sticmanLeftPx = (playerPosition.x - renderStartX) * cellSize;
  const sticmanBottomPx = playerPosition.level * cellSize;

  return (
    <div
      ref={gameBoardRef}
      style={gameBoardStyle}
      // onTransitionEnd={onAnimationEnd}
    >
      <div style={gridStyle}>
        {cells}
      </div>
      <Sticman
        style={{
          position: 'absolute',
          left: `${sticmanLeftPx}px`,
          bottom: `${sticmanBottomPx}px`,
          zIndex: 2,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        positionX={playerPosition.x}
        positionY={playerPosition.level}
        level={playerPosition.level}
        cellSize={cellSize}
      />
    </div>
  );
});
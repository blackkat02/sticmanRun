// GameBoard.jsx
import React, { useRef, useState, useImperativeHandle, forwardRef, useLayoutEffect, useEffect } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';

export const GameBoard = forwardRef(({ playerPosition, animationDuration, onAnimationEnd }, ref) => {
  const cellSize = 50;
  const numberOfLevels = 3;
  
  const gameBoardRef = useRef(null);
  const [parentContainerWidth, setParentContainerWidth] = useState(0);

  // Ініціалізуємо null, щоб відрізняти від 0px
  let currentTransformX = useRef(null);

  useImperativeHandle(ref, () => ({
    movePlayer: (newLogicalX, animate = true) => {
      if (parentContainerWidth === 0) {
        return;
      }
      
      const newTargetPixelPosition = (parentContainerWidth / 2) - (newLogicalX * cellSize) - (cellSize / 2);

      if (gameBoardRef.current) {
          // Якщо це перший рендер, не перевіряємо на рівність
          const isInitialRender = currentTransformX.current === null;
          if (!isInitialRender && currentTransformX.current === newTargetPixelPosition) {
              return;
          }

          if (animate && !isInitialRender) {
              gameBoardRef.current.style.transition = `transform ${animationDuration / 1000}s ease-out`;
          } else {
              gameBoardRef.current.style.transition = 'none';
          }

          gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
          currentTransformX.current = newTargetPixelPosition;

          if (!animate || isInitialRender) {
              onAnimationEnd();
          }
      }
    },
  }));

  useLayoutEffect(() => {
    const updateParentContainerWidth = () => {
      if (gameBoardRef.current && gameBoardRef.current.parentElement) {
        const newWidth = gameBoardRef.current.parentElement.offsetWidth;
        if (newWidth > 0 && newWidth !== parentContainerWidth) {
          setParentContainerWidth(newWidth);
        }
      }
    };
    updateParentContainerWidth();
    window.addEventListener('resize', updateParentContainerWidth);
    return () => {
      window.removeEventListener('resize', updateParentContainerWidth);
    };
  }, [parentContainerWidth]);

  // Запускаємо початкове позиціонування тільки коли ширина контейнера відома
  useEffect(() => {
    if (parentContainerWidth > 0 && gameBoardRef.current) {
      ref.current.movePlayer(playerPosition.x, false);
    }
  }, [parentContainerWidth, playerPosition.x, ref]);

  const totalRenderableCells = 1000;
  const renderStartX = -500;
  
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
      onTransitionEnd={onAnimationEnd}
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
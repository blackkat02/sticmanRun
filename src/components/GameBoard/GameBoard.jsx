// GameBoard.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';

export const GameBoard = ({ playerPosition, animationDuration, onAnimationEnd }) => {
  const cellSize = 50;
  const numberOfLevels = 3;

  const gameBoardRef = useRef(null);
  const [parentContainerWidth, setParentContainerWidth] = useState(0);

  const [currentTransformX, setCurrentTransformX] = useState(0);
  const isInitialRenderRef = useRef(true);
  const prevPlayerPositionXRef = useRef(playerPosition.x);

  useEffect(() => {
    const updateParentContainerWidth = () => {
      if (gameBoardRef.current && gameBoardRef.current.parentElement) {
        setParentContainerWidth(gameBoardRef.current.parentElement.offsetWidth);
      } else {
        setParentContainerWidth(window.innerWidth);
      }
    };

    updateParentContainerWidth();
    window.addEventListener('resize', updateParentContainerWidth);

    return () => {
      window.removeEventListener('resize', updateParentContainerWidth);
    };
  }, []);

  const initialRenderStartX = -500;
  const renderStartX = initialRenderStartX;
  const renderEndX = 500;
  const totalRenderableCells = renderEndX - renderStartX;

  useEffect(() => {
    const newTargetPixelPosition = (parentContainerWidth / 2) - (cellSize / 2) - ((playerPosition.x - renderStartX) * cellSize);

    // 1. Початковий рендер
    if (isInitialRenderRef.current) {
        setCurrentTransformX(newTargetPixelPosition);
        isInitialRenderRef.current = false;
        prevPlayerPositionXRef.current = playerPosition.x;
        console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] GameBoard: Initial render, setting transform to ${newTargetPixelPosition}`);
        return;
    }

    // 2. Зміна playerPosition.x - запускаємо анімацію
    if (prevPlayerPositionXRef.current !== playerPosition.x) {
        let frameId;
        frameId = requestAnimationFrame(() => {
            frameId = requestAnimationFrame(() => {
                setCurrentTransformX(newTargetPixelPosition);
                console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] GameBoard: playerPosition.x=${playerPosition.x}, Setting transform to ${newTargetPixelPosition} (animated)`);
            });
        });
        prevPlayerPositionXRef.current = playerPosition.x;
        return () => {
            cancelAnimationFrame(frameId);
        };
    }

    // 3. Зміна розміру вікна, але playerPosition.x не змінився - миттєвий snap
    if (currentTransformX !== newTargetPixelPosition) {
        const boardElement = gameBoardRef.current;
        if (boardElement) {
            boardElement.style.transition = 'none'; // Вимикаємо анімацію
            void boardElement.offsetWidth; // Примусовий рефлоу
            boardElement.style.transform = `translateX(${newTargetPixelPosition}px)`;
            boardElement.style.transition = `transform ${animationDuration / 1000}s ease-out`; // Відновлюємо
            setCurrentTransformX(newTargetPixelPosition); // Оновлюємо стан React
        }
        console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] GameBoard: Container resized (player X same), setting transform to ${newTargetPixelPosition} (no transition).`);
        return;
    }

  }, [playerPosition.x, parentContainerWidth, animationDuration, cellSize, renderStartX, currentTransformX]);

  const handleTransitionEnd = useCallback((event) => {
    const expectedTarget = (parentContainerWidth / 2) - (cellSize / 2) - ((playerPosition.x - renderStartX) * cellSize);
    if (event.propertyName === 'transform' && onAnimationEnd && currentTransformX === expectedTarget) {
      onAnimationEnd();
    }
  }, [onAnimationEnd, currentTransformX, playerPosition.x, parentContainerWidth, cellSize, renderStartX]);

  const gameBoardStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: `${totalRenderableCells * cellSize}px`,
    border: '2px solid #333',
    backgroundColor: '#e0f7fa',
    transition: `transform ${animationDuration / 1000}s ease-out`,
    transform: `translateX(${currentTransformX}px)`,
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
    for (let x = renderStartX; x < renderEndX; x++) {
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
      onTransitionEnd={handleTransitionEnd}
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
};
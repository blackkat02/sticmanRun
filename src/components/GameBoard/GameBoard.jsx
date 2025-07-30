// GameBoard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';

export const GameBoard = ({ playerPosition, animationDuration, onAnimationEnd }) => {
  const cellSize = 50;
  const numberOfLevels = 3;

  const gameBoardRef = useRef(null);
  const [parentContainerWidth, setParentContainerWidth] = useState(0);

  const [currentTransformX, setCurrentTransformX] = useState(0);
  const isInitialRenderRef = useRef(true); // Новий прапор для першого рендера

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
  const initialRenderEndX = 500;

  const renderStartX = initialRenderStartX;
  const renderEndX = initialRenderEndX;
  const totalRenderableCells = renderEndX - renderStartX;

  const targetPixelPosition = (parentContainerWidth / 2) - (cellSize / 2) - ((playerPosition.x - renderStartX) * cellSize);

  useEffect(() => {
    // Якщо це перший рендер і transformX ще не встановлений або дорівнює 0,
    // просто встановлюємо його без анімації та одразу знімаємо прапор.
    // Це дозволить уникнути небажаних onAnimationEnd на старті.
    if (isInitialRenderRef.current) {
      setCurrentTransformX(targetPixelPosition);
      console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] GameBoard: Initial render, setting transform to ${targetPixelPosition}`);
      isInitialRenderRef.current = false; // Позначаємо, що початковий рендер завершено
      return; // Виходимо, не запускаємо RAF для анімації при першому рендері
    }

    // Якщо playerPosition.x змінився, запускаємо анімацію
    let frameId;
    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => {
        setCurrentTransformX(targetPixelPosition);
        // GameBoard.jsx, рядок 59
        console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] GameBoard: playerPosition.x=${playerPosition.x}, Setting transform to ${targetPixelPosition}`);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [playerPosition.x, targetPixelPosition]); // currentTransformX прибрано з залежностей

  const handleTransitionEnd = (event) => {
    // Перевіряємо, що анімація завершилася для властивості 'transform'
    // І що це не "початковий рендер", який не мав анімуватися
    // І що поточна позиція після анімації відповідає цільовій
    if (event.propertyName === 'transform' && onAnimationEnd && !isInitialRenderRef.current && currentTransformX === targetPixelPosition) {
      onAnimationEnd();
    }
  };

  const gameBoardStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: `${totalRenderableCells * cellSize}px`,
    border: '2px solid #333',
    backgroundColor: '#e0f7fa',
    // transition застосовується тільки після першого рендеру
    transition: isInitialRenderRef.current ? 'none' : `transform ${animationDuration / 1000}s ease-out`,
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
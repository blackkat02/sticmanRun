// GameBoard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';

export const GameBoard = ({ playerPosition }) => {
  const cellSize = 50;
  const numberOfLevels = 3;

  const gameBoardRef = useRef(null);
  const [parentContainerWidth, setParentContainerWidth] = useState(0);

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

  const bufferCells = 20; // Збільшимо буфер ще більше для надійності

  // Логічний діапазон X-координат, який ми рендеримо.
  // renderStartX - це мінімальна X-координата, яка буде відображена.
  // renderEndX - це максимальна X-координата, яка буде відображена.
  // Це гарантує, що ми завжди рендеримо достатньо клітинок навколо гравця,
  // включаючи від'ємні координати.
  const renderStartX = playerPosition.x - Math.floor(parentContainerWidth / (2 * cellSize)) - bufferCells;
  const renderEndX = playerPosition.x + Math.ceil(parentContainerWidth / (2 * cellSize)) + bufferCells;
  const totalRenderableCells = renderEndX - renderStartX;

  // !!! КЛЮЧОВЕ ВИПРАВЛЕННЯ: targetTranslateX має утримувати коня в центрі !!!
  // Це означає, що коли гравець знаходиться на playerPosition.x,
  // клітинка playerPosition.x має бути по центру батьківського контейнера.
  // Розглянемо:
  // (parentContainerWidth / 2) - (cellSize / 2) -> це піксельна позиція центру екрану.
  // (playerPosition.x - renderStartX) * cellSize -> це піксельна позиція коня ВІДНОСНО початку рендереного гриду.
  // Щоб перемістити ГРІД так, щоб кінь був по центру екрану, ми беремо центр екрану
  // і ВІДНІМАЄМО поточну піксельну позицію коня ВІДНОСНО renderStartX.
  const targetTranslateX = (parentContainerWidth / 2) - (cellSize / 2) - ((playerPosition.x - renderStartX) * cellSize);

  const gameBoardSpringProps = useSpring({
    x: targetTranslateX,
    config: {
      tension: 180,
      friction: 25,
      mass: 1
    },
    immediate: playerPosition.x === 0,
  });

  const animatedGameBoardContainerStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    left: '0px',
    top: '0px',
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

  // Позиція Sticman всередині РЕНДЕРЕНОГО гриду.
  // Він має бути на своїй клітинці відносно renderStartX.
  const sticmanLeftPx = (playerPosition.x - renderStartX) * cellSize;
  const sticmanBottomPx = playerPosition.level * cellSize;

  return (
    <animated.div
        ref={gameBoardRef}
        style={{ ...animatedGameBoardContainerStyle, x: gameBoardSpringProps.x }}
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
    </animated.div>
  );
};
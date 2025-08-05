import React, { useRef, forwardRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';
import { useParentContainerWidth } from '../../hooks/useParentContainerWidth.js';
import { useViewportWidth } from '../../hooks/useViewportWidth.js';

export const GameBoard = forwardRef(({ boardState, playerPosition, animationDuration }, ref) => {
  const cellSize = 50;
  const numberOfLevels = 3;

  const [gameBoardRef] = useParentContainerWidth();
  const viewportWidth = useViewportWidth();

  const initialRenderRef = useRef(true);

  // Розраховуємо діапазон клітинок для рендерингу
  const totalVisibleCells = Math.ceil(viewportWidth / cellSize);
  const totalRenderableCells = totalVisibleCells * 2 + 10;
  
  // renderFromX - це логічна координата (номер клітинки), з якої починається рендеринг
  const renderFromX = playerPosition.x - Math.floor(totalVisibleCells / 2) - 5;
  const renderToX = renderFromX + totalRenderableCells;

  // Функція для розрахунку піксельного зсуву дошки
  const calculateBoardPosition = useCallback((logicalX) => {
    if (viewportWidth === 0) return 0;
    
    // Знаходимо індекс клітинки гравця відносно початку рендерингу
    const playerRelativeIndex = logicalX - renderFromX;
    
    // Розраховуємо піксельну позицію гравця на рендереній дошці
    const playerPixelPositionOnRenderedBoard = (playerRelativeIndex * cellSize) + (cellSize / 2);
    
    // Центр в'юпорта
    const viewportCenter = viewportWidth / 2;
    
    // Зсув для центрування. Це те, на скільки ми змістимо дошку.
    return viewportCenter - playerPixelPositionOnRenderedBoard;
  }, [viewportWidth, cellSize, renderFromX]); // renderFromX є залежністю, щоб функція оновлювалася при зміні діапазону рендерингу

  useLayoutEffect(() => {
    if (viewportWidth > 0 && gameBoardRef.current) {
      const newTargetPixelPosition = calculateBoardPosition(playerPosition.x);

      if (initialRenderRef.current) {
        gameBoardRef.current.style.transition = 'none'; // Вимкнути анімацію при першому рендері
        gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
        initialRenderRef.current = false;
      } else {
        gameBoardRef.current.style.transition = `transform ${animationDuration / 1000}s ease-out`; // Увімкнути анімацію
        gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
      }
    }
  }, [playerPosition.x, viewportWidth, animationDuration, calculateBoardPosition, gameBoardRef]);

  const cells = useMemo(() => {
    const result = [];
    for (let level = numberOfLevels - 1; level >= 0; level--) {
      for (let x = renderFromX; x < renderToX; x++) {
        const cellData = boardState.get(`${x}-${level}`);
        
        let cellContent = null;
        // Рендеримо Sticman прямо в його клітинці
        if (x === playerPosition.x && level === playerPosition.level) {
          cellContent = <Sticman cellSize={cellSize} />;
        } else if (cellData?.content === 'stone') {
          cellContent = <Stone cellSize={cellSize} />;
        }

        result.push(
          <div key={`${x}-${level}`} style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            gridColumnStart: (x - renderFromX) + 1,
            gridRowStart: (numberOfLevels - level),
          }}>
            <Cell x={x} level={level}>
              {cellContent}
            </Cell>
          </div>
        );
      }
    }
    return result;
  }, [boardState, numberOfLevels, renderFromX, renderToX, cellSize, playerPosition.x, playerPosition.level]);

  const gameBoardStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: `${totalRenderableCells * cellSize}px`,
    border: '2px solid #333',
    backgroundColor: '#e0f7fa',
    zIndex: 1
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${totalRenderableCells}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, ${cellSize}px)`,
    gap: '0px',
    width: '100%',
    position: 'relative',
    left: '0px',
    bottom: '0px',
    transformOrigin: 'top left',
    zIndex: 1,
  };

  return (
    <div ref={gameBoardRef} style={gameBoardStyle}>
      <div style={gridStyle}>
        {cells}
      </div>
    </div>
  );
});

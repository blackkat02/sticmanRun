import React, { useRef, useState, forwardRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { Cell } from '../Cell/Cell.jsx';
import Sticman from '../Sticman/Sticman.jsx';
import Stone from '../Stone/Stone.jsx';
import { useParentContainerWidth } from '../../hooks/useParentContainerWidth.js';
import { useViewportWidth } from '../../hooks/useViewportWidth.js';

export const GameBoard = forwardRef(({ boardState, playerPosition, animationDuration }, ref) => {
  const cellSize = 50;
  const numberOfLevels = 3;

  const [gameBoardRef, parentContainerWidth] = useParentContainerWidth();
  const viewportWidth = useViewportWidth();

  const calculatePosition = useCallback((logicalX) => {
    if (parentContainerWidth === 0) return 0;
    return (parentContainerWidth / 2) - (logicalX * cellSize) - (cellSize / 2);
  }, [parentContainerWidth, cellSize]);

  const initialRenderRef = useRef(true);

  useLayoutEffect(() => {
    if (parentContainerWidth > 0 && gameBoardRef.current) {
      const newTargetPixelPosition = calculatePosition(playerPosition.x);

      if (initialRenderRef.current) {
        gameBoardRef.current.style.transition = 'none';
        gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
        initialRenderRef.current = false;
      } else {
        gameBoardRef.current.style.transition = `transform ${animationDuration / 1000}s ease-out`;
        gameBoardRef.current.style.transform = `translateX(${newTargetPixelPosition}px)`;
      }
    }
  }, [playerPosition.x, parentContainerWidth, animationDuration, calculatePosition]);

  const totalVisibleCells = Math.ceil(viewportWidth / cellSize);
  const totalRenderableCells = totalVisibleCells * 2 + 10;

  let renderFromX;

  if (initialRenderRef.current) {
    renderFromX = 0 - Math.floor(totalVisibleCells / 2) - 5;
  } else {
    renderFromX = playerPosition.x - Math.floor(totalVisibleCells / 2) - 5;
  }

  const renderToX = renderFromX + totalRenderableCells;

  // Використовуємо useMemo, щоб уникнути зайвих перерахунків
  const cells = useMemo(() => {
    const result = [];
    for (let level = numberOfLevels - 1; level >= 0; level--) {
      for (let x = renderFromX; x < renderToX; x++) {
        const cellData = boardState.get(`${x}-${level}`);
        let cellContent = null;
        if (cellData?.content === 'stone') {
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
  }, [boardState, numberOfLevels, renderFromX, renderToX, cellSize]);

  const sticmanLeftPx = (playerPosition.x - renderFromX) * cellSize;
  const sticmanBottomPx = playerPosition.level * cellSize;

  const gameBoardStyle = {
    height: `${numberOfLevels * cellSize}px`,
    position: 'absolute',
    top: '0px',
    left: `${renderFromX * cellSize}px`,
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

  return (
    <div
      ref={gameBoardRef}
      style={gameBoardStyle}
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

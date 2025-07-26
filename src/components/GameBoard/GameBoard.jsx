// GameBoard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Cell } from '../Cell/Cell.jsx'; 
import Sticman from '../Sticman/Sticman.jsx'; 

export const GameBoard = ({ playerPosition }) => { 
  const cellSize = 50; // Розмір клітинки в пікселях
  const numberOfLevels = 3; // Кількість рівнів по вертикалі

  const boardContainerRef = useRef(null); // Реф для зовнішнього контейнера (видимий в'юпорт)
  const gridRef = useRef(null); // Реф для внутрішнього grid-контейнера (той, що рухається та перевертається)
  const [containerWidth, setContainerWidth] = useState(0); // Стан для ширини контейнера

  // Ефект для оновлення ширини контейнера при монтуванні та зміні розміру вікна
  useEffect(() => {
    const updateContainerWidth = () => {
      if (boardContainerRef.current) {
        setContainerWidth(boardContainerRef.current.offsetWidth);
      }
    };

    updateContainerWidth(); // Викликаємо при першому рендері
    window.addEventListener('resize', updateContainerWidth); // Додаємо слухача на зміну розміру вікна

    return () => {
      window.removeEventListener('resize', updateContainerWidth); // Очищення слухача
    };
  }, []); 

  // Розраховуємо кількість клітинок для рендерингу по горизонталі
  const bufferCells = 10; // Буфер клітинок з кожного боку (всього 20)
  const cellsToRenderHorizontally = Math.ceil(containerWidth / cellSize) + (bufferCells * 2);

  // Ефект для застосування трансформації прокрутки та перевертання до сітки
  useEffect(() => {
    if (gridRef.current && containerWidth > 0) {
      // Розраховуємо піксельну позицію гравця відносно початку "уявного" безкінечного поля
      const playerLogicalPixelX = playerPosition.x * cellSize;

      // Розраховуємо горизонтальну позицію прокрутки, щоб відцентрувати гравця.
      // playerPixelOffsetInGrid: Піксельна позиція гравця відносно *початку поточного рендереного чанка поля*.
      const playerPixelOffsetInGrid = (playerPosition.x - renderStartX) * cellSize;

      // translateXValue: Значення зміщення для gridRef, щоб кінь був по центру.
      const translateXValue = (containerWidth / 2) - playerPixelOffsetInGrid - (cellSize / 2);
      
      // Застосовуємо трансформацію до внутрішнього grid-контейнера (gridRef)
      // !!! IMPORTANT: scaleY(-1) applied here to flip the ENTIRE grid vertically !!!
      gridRef.current.style.transform = `translateX(${translateXValue}px) scaleY(-1)`;
    }
  }, [playerPosition.x, cellSize, containerWidth, cellsToRenderHorizontally]); 

  // Стилі для зовнішнього контейнера ігрової дошки (видимий в'юпорт)
  const boardContainerStyle = {
    height: `${numberOfLevels * cellSize}px`, 
    overflow: 'hidden', 
    position: 'relative', 
    width: '100%', 
    border: '2px solid #333', 
    margin: '20px auto', 
    backgroundColor: '#e0f7fa', 
  };

  // Стилі для внутрішнього grid-контейнера (той, що рухається та перевертається)
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cellsToRenderHorizontally}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, ${cellSize}px)`,
    gap: '0px',
    position: 'absolute', 
    left: '0px', 
    top: '0px', 
    width: `${cellsToRenderHorizontally * cellSize}px`,
    transformOrigin: 'center center', 
    zIndex: 1, 
  };

  const cells = [];
  const renderStartX = playerPosition.x - Math.floor(cellsToRenderHorizontally / 2);
  const renderEndX = renderStartX + cellsToRenderHorizontally;

  for (let level = 0; level < numberOfLevels; level++) {
    for (let x = renderStartX; x < renderEndX; x++) {
      cells.push(
        <div key={`${x}-${level}`} style={{
          // Styles for each cell's wrapper
          // !!! IMPORTANT: NO transform: 'scaleY(-1)' here. It's on the Cell component. !!!
          position: 'relative', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          width: `${cellSize}px`,
          height: `${cellSize}px`,
        }}>
          <Cell 
            x={x} 
            level={level}
          />
        </div>
      );
    }
  }

  // Calculate Sticman's position relative to the *moving grid*.
  const sticmanRenderedX = playerPosition.x - renderStartX;
  const sticmanLeftPx = sticmanRenderedX * cellSize;
  // Calculate Sticman's Y position relative to the bottom of the *flipped* grid.
  const sticmanBottomPx = (numberOfLevels - 1 - playerPosition.level) * cellSize;

  return (
    <div ref={boardContainerRef} style={boardContainerStyle}>
      {/* Inner div with ref, to which we apply the transform */}
      <div ref={gridRef} style={gridStyle}>
        {cells}
        {/* Sticman is now rendered directly inside the moving grid, positioned absolutely */}
        <Sticman 
          style={{
            position: 'absolute',
            left: `${sticmanLeftPx}px`,
            bottom: `${sticmanBottomPx}px`,
            // transform: 'scaleY(-1)' is applied in Sticman.jsx to flip its content back
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
    </div>
  );
};

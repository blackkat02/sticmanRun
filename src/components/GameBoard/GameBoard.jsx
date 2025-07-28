// GameBoard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Cell } from '../Cell/Cell.jsx'; 
import Sticman from '../Sticman/Sticman.jsx'; 
import Stone from '../Stone/Stone.jsx'; 

export const GameBoard = ({ playerPosition }) => { 
  const cellSize = 50; // Cell size in pixels
  const numberOfLevels = 3; // Number of vertical levels

  const boardContainerRef = useRef(null); // Ref for the outer container (visible viewport)
  const gridRef = useRef(null); // Ref for the inner grid container (the one that moves)
  const [containerWidth, setContainerWidth] = useState(0); // State for the container's width

  // Effect to update container width on mount and window resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (boardContainerRef.current) {
        setContainerWidth(boardContainerRef.current.offsetWidth);
      }
    };

    updateContainerWidth(); // Call on initial render
    window.addEventListener('resize', updateContainerWidth); // Add resize listener

    return () => {
      window.removeEventListener('resize', updateContainerWidth); // Cleanup listener
    };
  }, []); 

  // Calculate the number of cells to render horizontally based on container width and a buffer
  const bufferCells = 10; // Buffer cells on each side (total buffer 20)
  const cellsToRenderHorizontally = Math.ceil(containerWidth / cellSize) + (bufferCells * 2);

  // Effect to apply the scroll transformation to the grid
  useEffect(() => {
    if (gridRef.current && containerWidth > 0) {
      // Calculate the pixel position of the player's logical X coordinate
      const playerLogicalPixelX = playerPosition.x * cellSize;

      // Calculate the horizontal scroll position needed to center the player.
      const playerPixelOffsetInGrid = (playerPosition.x - renderStartX) * cellSize;

      // translateXValue: Value of the offset for gridRef to center the knight.
      const translateXValue = (containerWidth / 2) - playerPixelOffsetInGrid - (cellSize / 2);
      
      // !!! IMPORTANT: NO scaleY(-1) here. Grid will NOT be flipped. !!!
      gridRef.current.style.transform = `translateX(${translateXValue}px)`;
    }
  }, [playerPosition.x, cellSize, containerWidth, cellsToRenderHorizontally]); 

  // Styles for the outer game board container (the visible viewport)
  const boardContainerStyle = {
    height: `${numberOfLevels * cellSize}px`, 
    overflow: 'hidden', 
    position: 'relative', 
    width: '100%', 
    border: '2px solid #333', 
    margin: '20px auto', 
    backgroundColor: '#e0f7fa', 
  };

  // Styles for the inner grid container (the one that moves)
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cellsToRenderHorizontally}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, ${cellSize}px)`,
    gap: '0px',
    position: 'absolute', 
    left: '0px', 
    // !!! IMPORTANT: Position from the bottom to make level 0 appear at the bottom !!!
    bottom: '0px', 
    width: `${cellsToRenderHorizontally * cellSize}px`,
    transformOrigin: 'center center', 
    zIndex: 1, 
  };

  const cells = [];
  const renderStartX = playerPosition.x - Math.floor(cellsToRenderHorizontally / 2);
  const renderEndX = renderStartX + cellsToRenderHorizontally;

  // !!! IMPORTANT: Loop levels in reverse order to render from top to bottom (visually) !!!
  // This makes level 0 appear at the bottom when positioned with 'bottom' CSS property.
  for (let level = numberOfLevels - 1; level >= 0; level--) { 
    for (let x = renderStartX; x < renderEndX; x++) {
      let cellContent = null;
      // Logic for random stone rendering
      // Stones appear only on level 0 (first floor) with a 30% chance.
      // Prevent stone on initial safe fields (x <= 3)
      if (level === 0 && x <= 3) {
        // Do nothing, no stone on initial safe fields
      } else if (level === 0 && Math.random() < 0.3) { // 30% chance for other level 0 cells
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
          // !!! IMPORTANT: NO transform: 'scaleY(-1)' here. Cells will not be flipped. !!!
        }}>
          <Cell 
            x={x} 
            level={level}
          >
            {cellContent} {/* Render stone if it exists */}
          </Cell>
        </div>
      );
    }
  }

  // Calculate Sticman's position relative to the *moving grid*.
  const sticmanRenderedX = playerPosition.x - renderStartX;
  const sticmanLeftPx = sticmanRenderedX * cellSize;
  // !!! IMPORTANT: Calculate Sticman's Y position relative to the bottom of the *unflipped* grid. !!!
  // level 0 is at bottom: 0px, level 1 at bottom: 50px, etc.
  const sticmanBottomPx = playerPosition.level * cellSize; 

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
            zIndex: 2, 
            width: `${cellSize}px`, 
            height: `${cellSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // !!! IMPORTANT: NO transform: 'scaleY(-1)' here. Sticman will not be flipped by its container. !!!
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

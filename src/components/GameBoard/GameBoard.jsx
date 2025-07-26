// GameBoard.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Cell } from '../Cell/Cell.jsx'; 
import Sticman from '../Sticman/Sticman.jsx';

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
  }, []); // Empty dependency array, as window listener is added once

  // Calculate the number of cells to render horizontally based on container width and a buffer
  const bufferCells = 10; // Buffer cells on each side (total buffer 20)
  const cellsToRenderHorizontally = Math.ceil(containerWidth / cellSize) + (bufferCells * 2);

  // Effect to apply the scroll transformation to the grid
  useEffect(() => {
    if (gridRef.current && containerWidth > 0) {
      // Calculate the pixel position of the player's logical X coordinate
      // This is the player's position relative to the *start of the rendered grid*.
      // We need to adjust for renderStartX to get the correct offset within the current grid.
      const playerPixelOffsetInGrid = (playerPosition.x - renderStartX) * cellSize;

      // Calculate the horizontal scroll position needed to center the player.
      // We want the player's pixel position in the grid to appear at `containerWidth / 2`.
      // So, the grid needs to be translated by `(center of viewport) - (player's pixel position within rendered grid)`.
      // Add cellSize / 2 to perfectly center the player within their cell.
      const translateXValue = (containerWidth / 2) - playerPixelOffsetInGrid - (cellSize / 2);
      
      // Apply the transformation to the inner grid container (gridRef)
      // scaleY(-1) is applied here to flip the entire grid vertically.
      gridRef.current.style.transform = `translateX(${translateXValue}px) scaleY(-1)`;
    }
  }, [playerPosition.x, cellSize, containerWidth, cellsToRenderHorizontally]); // Added cellsToRenderHorizontally as dependency

  // Styles for the outer game board container (the visible viewport)
  const boardContainerStyle = {
    height: `${numberOfLevels * cellSize}px`, // Fixed height based on number of levels
    overflow: 'hidden', // Hide scrollbars, as we control scrolling via transform
    position: 'relative', // For absolute positioning of the inner grid container and Sticman
    width: '100%', // Board takes full viewport width
    border: '2px solid #333', // Border for the entire board
    margin: '20px auto', // Center the board horizontally
    backgroundColor: '#e0f7fa', // Background color for visual clarity
  };

  // Styles for the inner grid container (the one that moves and is flipped vertically)
  const gridStyle = {
    display: 'grid',
    // Generate enough columns to cover the visible area + buffer
    gridTemplateColumns: `repeat(${cellsToRenderHorizontally}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${numberOfLevels}, ${cellSize}px)`,
    gap: '0px',
    position: 'absolute', // Absolute positioning for movement
    left: '0px', 
    top: '0px',
    // Width of the grid container must be sufficient for all rendered cells
    width: `${cellsToRenderHorizontally * cellSize}px`,
    // transform: 'scaleY(-1)' is applied via useEffect to gridRef.current
    transformOrigin: 'center center', // For correct vertical flipping
    zIndex: 1, // Ensure grid is below Sticman
  };

  const cells = [];
  // Calculate the start and end X coordinates for rendering
  // This ensures we always render enough cells to cover the viewport plus the buffer.
  // renderStartX: playerPosition.x minus half of the cellsToRenderHorizontally (logical start of the rendered chunk)
  const renderStartX = playerPosition.x - Math.floor(cellsToRenderHorizontally / 2);
  const renderEndX = renderStartX + cellsToRenderHorizontally;

  for (let level = 0; level < numberOfLevels; level++) {
    for (let x = renderStartX; x < renderEndX; x++) {
      cells.push(
        <div key={`${x}-${level}`} style={{
          // Styles for each cell's wrapper
          // Apply scaleY(-1) here to flip the cell's content back to normal orientation
          transform: 'scaleY(-1)', 
          position: 'relative', 
          display: 'flex', // For centering cell content
          justifyContent: 'center',
          alignItems: 'center',
          // Ensure the cell has fixed dimensions
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
  // Sticman's X position within the *rendered* grid.
  const sticmanRenderedX = playerPosition.x - renderStartX;
  const sticmanLeftPx = sticmanRenderedX * cellSize;
  const sticmanBottomPx = playerPosition.level * cellSize; // Position relative to grid's bottom

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
            // Apply scaleY(-1) to Sticman to flip its content back
            transform: 'scaleY(-1)', 
            zIndex: 2, // Ensure Sticman is above cells
            width: `${cellSize}px`, // Sticman takes up one cell
            height: `${cellSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          positionX={playerPosition.x} 
          positionY={playerPosition.level} 
          level={playerPosition.level} 
          cellSize={cellSize} // Pass cellSize for Sticman's internal use if needed
        />
      </div>
    </div>
  );
};

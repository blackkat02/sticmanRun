// GameBoard.jsx - Цей код в цілому залишається таким же
// ... (імпорти та інші частини коду) ...

export const GameBoard = ({ playerPosition }) => {
  // ... (інші стани та рефи) ...

  // Розрахунок позиції Sticman
  const sticmanRenderedX = playerPosition.x - renderStartX;
  const sticmanLeftPx = sticmanRenderedX * cellSize;
  const sticmanBottomPx = playerPosition.level * cellSize;

  return (
    <div ref={boardContainerRef} style={boardContainerStyle}>
      <div ref={gridRef} style={gridStyle}>
        {cells}
        <Sticman
          style={{
            position: 'absolute',
            left: `${sticmanLeftPx}px`, // Передаємо Left
            bottom: `${sticmanBottomPx}px`, // Передаємо Bottom
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
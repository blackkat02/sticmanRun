// Stone.jsx
import React from 'react';

const Stone = ({ cellSize }) => {
  const stoneSymbol = '🪨'; // Символ каменю (можна замінити на SVG або інше)

  const stoneStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Залишаємо тільки центрування
    fontSize: `${cellSize * 0.7}px`,
    lineHeight: 1,
    zIndex: 1,
    color: '#616161',
    userSelect: 'none',
    border: '5px solid #333',
  };

  return (
    <div style={stoneStyle}>
      {stoneSymbol}
    </div>
  );
};

export default Stone;
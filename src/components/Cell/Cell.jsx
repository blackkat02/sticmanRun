// Cell.jsx
import React from 'react';

export const Cell = ({ x, y, level, children }) => {
  const cellStyle = {
    width: '50px',
    height: '50px',
    border: '1px dashed lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8em',
    color: '#666',
    boxSizing: 'border-box',
    cursor: 'default',
    backgroundColor: 'white',
    position: 'relative',
    // !!! ПЕРЕКОНАЙСЯ, ЩО ЦЬОГО РЯДКА ТУТ НЕМАЄ: !!!
    // transform: 'scaleY(-1)',
  };

  const displayCoord = `${x}-${level + 1}`;

  return (
    <button style={cellStyle}>
      {displayCoord}
      {children}
    </button>
  );
};
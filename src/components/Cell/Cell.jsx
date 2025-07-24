// Cell.jsx
import React from 'react';

export const Cell = ({ x, y, level, onClick, children }) => { 
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
    cursor: 'pointer',
    backgroundColor: 'white',
    position: 'relative', 
  };

  const displayCoord = `${x}${String.fromCharCode(97 + level)}`;
  
  return (
    <button style={cellStyle} onClick={onClick}>
      {displayCoord}
      {children} {/* Тут будуть відображатися діти, тобто твій Sticman */}
    </button>
  );
};

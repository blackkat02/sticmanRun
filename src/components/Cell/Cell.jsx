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
    // This transform flips the content of the cell (text, knight) back to normal orientation
    // because the parent grid is flipped (scaleY(-1)).
    transform: 'scaleY(-1)', 
  };

  // Change coordinate display to X-Level (1-indexed level)
  // level + 1 so that level 0 displays as 1, level 1 as 2, etc.
  const displayCoord = `${x}-${level + 1}`; 
  
  return (
    <button style={cellStyle}> 
      {displayCoord}
      {children} 
    </button>
  );
};

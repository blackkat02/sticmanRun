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
    // IMPORTANT: REMOVE transform: 'scaleY(-1)' from here.
    // Text will now appear correctly without flipping, as the grid itself is not flipped.
  };

  // Display coordinates as X-Level (1-indexed level)
  const displayCoord = `${x}-${level + 1}`; 
  
  return (
    <button style={cellStyle}> 
      {displayCoord}
      {children} 
    </button>
  );
};

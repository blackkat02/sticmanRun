// Cell.jsx
import React from 'react';

// onClick більше не передається як пропс, оскільки рух керується клавіатурою
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
    cursor: 'default', // Змінено на 'default', оскільки клітинки більше не клікабельні для руху гравця
    backgroundColor: 'white',
    position: 'relative', // Важливо для позиціонування дочірніх елементів (як Sticman)
  };

  // Формуємо відображення координати, наприклад, "0a", "1b"
  const displayCoord = `${x}${String.fromCharCode(97 + level)}`;
  
  return (
    // onClick атрибут прибрано з кнопки, оскільки він більше не використовується для руху
    <button style={cellStyle}> 
      {displayCoord}
      {children} {/* Тут будуть відображатися дочірні елементи, наприклад, твій Sticman */}
    </button>
  );
};


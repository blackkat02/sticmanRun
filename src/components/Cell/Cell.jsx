// Cell.js - Компонент окремої клітинки
import React from 'react';

export const Cell = ({ x, y, level, onClick }) => {
  const cellStyle = {
    width: '50px', // Розмір клітинки
    height: '50px',
    border: '1px dashed lightgray', // Переривчастий світло-сірий бордер
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8em',
    color: '#667',
    boxSizing: 'border-box', // Щоб бордер не збільшував розмір клітинки
    cursor: 'pointer',
    backgroundColor: 'white', // Можеш змінити для візуалізації рівнів
  };

  // Тимчасова індикація для демонстрації координат та рівнів
  const displayCoord = `${x}${String.fromCharCode(97 + level)}`; // 0a, 1b, etc.
  
  return (
    <button style={cellStyle} onClick={onClick}>
      {displayCoord}
    </button>
  );
};
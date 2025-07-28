// Stone.jsx
import React from 'react';

const Stone = ({ cellSize }) => {
  const stoneSymbol = '🪨'; // Символ каменю (можна замінити на SVG або інше)

  const stoneStyle = {
    // Стилі для позиціонування каменю всередині клітинки
    position: 'absolute', // Абсолютне позиціонування всередині батьківської клітинки
    top: '50%', // Центруємо по вертикалі
    left: '50%', // Центруємо по горизонталі
    transform: 'translate(-50%, -50%) scaleY(-1)', // Зміщуємо на -50% для точного центрування
                                                 // scaleY(-1) для перевертання символу назад,
                                                 // оскільки батьківська клітинка перевернута.
    fontSize: `${cellSize * 0.7}px`, // Розмір символу відносно розміру клітинки
    lineHeight: 1,
    zIndex: 1, // Переконаємось, що камінь знаходиться над текстом клітинки, але під гравцем
    color: '#616161', // Колір каменю
    userSelect: 'none', // Забороняємо виділення тексту
    border: '5px solid #333', 
  };

  return (
    <div style={stoneStyle}>
      {stoneSymbol}
    </div>
  );
};

export default Stone;

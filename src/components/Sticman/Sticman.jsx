// Sticman.jsx
import React from 'react';
import styles from './Sticman.module.css'; 

// Sticman тепер приймає 'style' пропс для позиціонування з батьківського компонента
const Sticman = ({ positionX, positionY, level, cellSize, style }) => {
  const chessKnightSymbol = '♞'; 

  // Стилі для Sticman.
  // transform: 'scaleY(-1)' додано сюди, щоб перевернути символ коня назад,
  // оскільки його батьківський контейнер (gridRef) перевернутий.
  const sticmanCalculatedStyle = {
    // Всі позиційні стилі (position, left, bottom, width, height, display, justify-content, align-items, zIndex)
    // тепер передаються через пропс 'style' з GameBoard.jsx.
    // Тут залишаємо лише ті стилі, які стосуються самого символу або його внутрішнього відображення.
    transform: 'scaleY(-1)', // This line is crucial for flipping the knight back
  };

  return (
    // Застосовуємо стилі з модуля CSS, а також стилі, передані через пропс 'style' з GameBoard.jsx
    <div className={styles.sticmanKnight} style={{ ...sticmanCalculatedStyle, ...style }}>
      {chessKnightSymbol}
      {/* Можна додати для дебагу поточні координати, якщо хочеш */}
      {/* <span style={{fontSize: '10px', position: 'absolute', bottom: '0'}}>
        ({positionX},{level})
      </span> */}
    </div>
  );
};

export default Sticman;



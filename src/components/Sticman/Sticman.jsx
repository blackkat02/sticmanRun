// Sticman.jsx
import React from 'react';
import styles from './Sticman.module.css'; 

const Sticman = ({ positionX, positionY, level, cellSize, style }) => {
  const chessKnightSymbol = '♞'; 

  // Стилі для контейнера Sticman.
  // Цей контейнер НЕ перевертається. Він позиціонується GameBoard.
  const sticmanCalculatedStyle = {
    position: 'absolute', 
    zIndex: 5, 
    width: `${cellSize}px`, 
    height: `${cellSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Стиль для самого символу коня.
  // !!! ОСЬ ТУТ КІНЬ ПЕРЕВЕРТАЄТЬСЯ !!!
  const knightSymbolStyle = {
    // transform: 'scaleY(-1)' - це CSS-властивість, яка перевертає елемент по вертикалі.
    // Значення '-1' означає інверсію по осі Y.
    // transform: 'scaleY(-1)', 
  };

  return (
    <div className={styles.sticmanKnight} style={{ ...sticmanCalculatedStyle, ...style }}>
      {/* Символ коня обгорнутий у <span>, до якого застосовується knightSymbolStyle */}
      <span style={knightSymbolStyle}> 
        {chessKnightSymbol}
      </span>
      {/* Можна додати для дебагу поточні координати, якщо хочеш */}
      {/* <span style={{fontSize: '10px', position: 'absolute', bottom: '0'}}>
        ({positionX},{level})
      </span> */}
    </div>
  );
};

export default Sticman;

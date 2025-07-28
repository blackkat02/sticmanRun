// Sticman.jsx
import React from 'react';
// import { useSpring, animated } from '@react-spring/web'; // Можемо прибрати animated, якщо немає анімацій
// Якщо немає анімацій, використовуємо просто div
import { animated } from '@react-spring/web'; // Залишаємо, якщо будемо додавати стрибки/падіння

import styles from './Sticman.module.css';

const Sticman = ({ positionX, positionY, level, cellSize, style }) => {
  const chessKnightSymbol = '♞';

  // !!! ВАЖЛИВО: Більше НЕ ВИКОРИСТОВУЄМО useSpring для left/bottom !!!
  // Позиція вже жорстко розраховується та передається через 'style' пропс.
  // Якщо будуть стрибки/падіння, тоді тут з'явиться useSpring для 'bottom'.
  // Наразі, це просто статичний компонент, який отримує координати.

  const sticmanBaseStyle = {
    position: 'absolute',
    zIndex: 5,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const knightSymbolStyle = {};

  return (
    // Використовуємо звичайний div, якщо немає анімації, або animated.div, якщо плануємо
    <div
      className={styles.sticmanKnight}
      style={{ ...sticmanBaseStyle, ...style }} // Просто застосовуємо стилі, передані з GameBoard
    >
      <span>
        {chessKnightSymbol}
      </span>
    </div>
  );
};

export default Sticman;
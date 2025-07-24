// Sticman.jsx
import React from 'react';
import styles from './Sticman.module.css'; // Імпортуємо CSS-модуль

const Sticman = ({ positionX, positionY, level }) => {
  const chessKnightSymbol = '♞'; 

  return (
    // Використовуємо клас з імпортованого модуля стилів
    <div className={styles.sticmanKnight}> 
      {chessKnightSymbol}
      {/* Можна додати для дебагу поточні координати, якщо хочеш */}
      {/* <span style={{fontSize: '10px', position: 'absolute', bottom: '0'}}>
        ({positionX},{level})
      </span> */}
    </div>
  );
};

export default Sticman; // Важливо: експортуємо за замовчуванням

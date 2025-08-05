import React from 'react';

const Sticman = ({ cellSize }) => {
  const chessKnightSymbol = '♞';
  return (
    <div
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        color: 'green',
        fontSize: '36px',
        lineHeight: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Z-index тут не потрібен, оскільки він є частиною клітинки,
        // а позиціонування відбувається на батьківському div.
      }}
    >
      <span>
        {chessKnightSymbol}
      </span>
    </div>
  );
};

export default Sticman;

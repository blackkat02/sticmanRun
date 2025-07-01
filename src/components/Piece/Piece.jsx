import React from 'react';
import styles from './Piece.module.css';
import getPieceSymbol from '../../utils/pieceSymbol'

const Piece = React.memo(({ type }) => {
  const symbol = getPieceSymbol(type);
  return (
    <span className={styles.piece}>
      {symbol}
    </span>
  );
});

export default React.memo(Piece); 
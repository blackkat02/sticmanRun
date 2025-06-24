import React from 'react';
import { useSelector } from 'react-redux';
import Square from '../Square/Square';
import Piece from '../Piece/Piece';
import styles from './ChessBoardView.module.css';
// import { initialPosition } from '../../redux/positionsSlice'; 
import { initialPosition } from '../../redux/positions'; 

const ChessBoardView = ({ showSquareId }) => {
  // Отримуємо стан фігур з Redux Store
  // Припустимо, що у нашому Redux Store є rootReducer, що включає chessSlice.reducer під ключем 'chess'
  // const pieces = useSelector(state => state.chess.pieces);

  const board = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      const squareId = `${files[j]}${ranks[i]}`;
      console.log(squareId)

      const piece = initialPosition.find(p => p.position === squareId);
      const pieceType = piece ? piece.name : null;
      console.log(pieceType); // 'wp', 'bp' або null

      board.push(
        <Square
          key={`${i}-${j}`}
          id={squareId}
          isLight={isLight}
          showSquareId={showSquareId}
          pieceType={pieceType}
        />
      );
    }
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.ranksColumn}>
        {ranks.map(rank => (
          <div key={rank} className={styles.rankLabel}>{rank}</div>
        ))}
      </div>

      <div className={styles.boardWrapper}>
        <div className={styles.chessBoard}>
          {board}
        </div>
        <div className={styles.filesRow}>
          {files.map(file => (
            <div key={file} className={styles.fileLabel}>{file}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoardView;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Square from '../Square/Square';
import styles from './ChessBoardView.module.css';
import { initialBoardPieces } from '../../redux/positions';

const ChessBoardView = ({ showSquareId }) => {
  // Отримуємо стан фігур з Redux Store
  // Припустимо, що у нашому Redux Store є rootReducer, що включає chessSlice.reducer під ключем 'chess'
  // const pieces = useSelector(state => state.chess.pieces);

  // const [showMovie, setShowMovie] = useState(false);
  const movie = {}
  
  // const handleShowMovie = () => {
  //   setShowSquareId(true);
  // };

  // const handleHideMovie = () => {
  //   setShowSquareId(false);
  // };

  const board = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const handleClick = (squareId) => {
    console.log(`Clicked on square: ${squareId}`);

    const piece = initialBoardPieces.find(p => p.position === squareId);
    if (piece) {
      console.log(`Piece on ${squareId}: ${piece.name}`);
      // movie = 
    } else {
      console.log(`${squareId} is empty.`);
    }
  };


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      const squareId = `${files[j]}${ranks[i]}`;

      const piece = initialBoardPieces.find(p => p.position === squareId);
      const pieceType = piece ? piece.name : null;

      board.push(
        <Square
          key={squareId}
          id={squareId}
          isLight={isLight}
          showSquareId={showSquareId}
          pieceType={pieceType}

          onClick={() => handleClick(squareId)}
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
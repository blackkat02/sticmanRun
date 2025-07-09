import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Square from '../Square/Square';
import styles from './ChessBoardView.module.css';
import { initialBoardPiecesObject } from '../../redux/positions';

const ChessBoardView = ({ showSquareId }) => {
  const getPieceAtSquareId = (squareId) => {
    const piece = initialBoardPiecesObject[squareId];
    console.log(`Checking square ${squareId}: ${piece ? piece : 'empty'}`);
    return piece ? piece : null;
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // `selectedSquare` is no longer directly used for visual highlight based on its own state.
  // We'll primarily use `clickedPieceRef.current` for that.
  // We still keep `selectedSquare` for `useCallback` dependency if needed, or if you plan
  // to use it for other state-driven visuals later (e.g., target square).
  const [selectedSquare, setSelectedSquare] = useState(null); // Keep it for now as it's in useCallback dependency

  // This ref will now explicitly control the highlight for the selected piece.
  const clickedPieceRef = useRef(null);

  const handleClick = useCallback((squareId) => {
    if (clickedPieceRef.current === null) {
      const pieceType = getPieceAtSquareId(squareId);

      if (pieceType) {
        clickedPieceRef.current = squareId;

        console.log(`First click: Piece ${pieceType} found at ${squareId}.`);
        console.log(`clickedPieceRef.current set to: ${clickedPieceRef.current} (should now be highlighted)`);
        console.log(`selectedSquare (useState) set to: ${selectedSquare}`); // Still logs previous state
      } else {
        console.log(`First click: ${squareId} is empty. No piece to select. Nothing highlighted.`);
      }
    }
    // --- SECOND CLICK LOGIC (a piece has already been selected via clickedPieceRef) ---
    else {
      const fromSquare = clickedPieceRef.current; // Source from ref
      const toSquare = squareId;                   // Target is current click
      setSelectedSquare(squareId);

      console.log(`Second click: Attempting move from ${fromSquare} to ${toSquare}.`);
      console.log(`Value from clickedPieceRef.current: ${clickedPieceRef.current}`);
      console.log(`Value from selectedSquare (useState): ${selectedSquare}`);

      const fromPieceType = getPieceAtSquareId(fromSquare);
      const toPieceType = getPieceAtSquareId(toSquare);

      console.log(`Move attempt: ${fromPieceType} from ${fromSquare} to ${toSquare} (target: ${toPieceType || 'empty'}).`);

      // Reset both the ref and the state after the move attempt
      clickedPieceRef.current = null;
      setSelectedSquare(null); // Clear any highlight
      console.log('Selection and ref cleared after second click.');
    }
  }, [selectedSquare]); // selectedSquare is still a dependency because we use it to trigger re-renders

  const boardSquares = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      const squareId = `${files[j]}${ranks[i]}`;

      const pieceType = getPieceAtSquareId(squareId);

      // --- CRUCIAL CHANGE HERE ---
      // `isSelected` now depends on `clickedPieceRef.current`
      const isSelected = clickedPieceRef.current === squareId;

      boardSquares.push(
        <Square
          key={squareId}
          id={squareId}
          isLight={isLight}
          showSquareId={showSquareId}
          pieceType={pieceType}
          isSelected={isSelected} // This prop now highlights the square from clickedPieceRef
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
          {boardSquares}
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

export default React.memo(ChessBoardView);
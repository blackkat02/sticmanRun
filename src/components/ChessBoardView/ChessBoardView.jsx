import React, { useState, useCallback } from 'react'; // Додали useState та useCallback
import { useSelector } from 'react-redux'; // Залишаємо, бо скоро будемо використовувати
import Square from '../Square/Square';
import styles from './ChessBoardView.module.css';
import { initialBoardPieces } from '../../redux/positions'; // Ваше початкове розташування фігур
// Якщо ви вже маєте функцію для створення матриці дошки, імпортуйте її
// import { createInitialBoard } from '../../utils/boardUtils'; // Або з chessSlice

const ChessBoardView = ({ showSquareId }) => {
  // Тимчасова імітація boardMatrix, поки не підключимо Redux
  // У майбутньому: const boardMatrix = useSelector(state => state.chess.board);
  const getPieceAtSquareId = (squareId) => {
    const piece = initialBoardPieces.find(p => p.position === squareId);
    return piece ? piece.name : null;
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // --- Крок 1: Додаємо стан для відстеження вибраної клітинки ---
  const [selectedSquare, setSelectedSquare] = useState(null); // Зберігає 'a2', 'e4' або null

  // --- Крок 2: Модифікуємо handleClick для обробки двох кліків ---
  const handleClick = useCallback((squareId) => {
    // console.log(`Clicked on square: ${squareId}`); // Для дебагу

    if (selectedSquare === null) {
      // Перший клік: вибираємо клітинку
      const pieceType = getPieceAtSquareId(squareId);
      if (pieceType) { // Клікаємо тільки якщо на клітинці є фігура
        setSelectedSquare(squareId); // Запам'ятовуємо ID обраної клітинки
        console.log(`First click: Selected piece ${pieceType} at ${squareId}`);
        // Тут ви можете додати логіку для підсвічування обраної клітинки
      } else {
        console.log(`First click: ${squareId} is empty. No piece to select.`);
      }
    } else {
      // Другий клік: є вже обрана клітинка, тепер це цільова
      const fromSquare = selectedSquare;
      const toSquare = squareId;

      console.log(`Second click: Trying to move from ${fromSquare} to ${toSquare}`);

      // --- Крок 3: Початкова логіка ходу ---
      // На цьому етапі ви можете просто вивести інформацію про хід.
      // Пізніше тут буде виклик валідації ходу та dispatch Redux-екшену.
      const fromPieceType = getPieceAtSquareId(fromSquare);
      const toPieceType = getPieceAtSquareId(toSquare);

      console.log(`Move attempt: ${fromPieceType} from ${fromSquare} to ${toSquare} (target: ${toPieceType || 'empty'})`);


      // --- Важливо: Скидаємо вибрану клітинку після другого кліку ---
      setSelectedSquare(null); // Після спроби ходу, скидаємо виділення
      // Тут також потрібно буде скинути будь-яке підсвічування легальних ходів
    }
  }, [selectedSquare]); // Залежність для useCallback: selectedSquare

  const boardSquares = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      const squareId = `${files[j]}${ranks[i]}`;

      const pieceType = getPieceAtSquareId(squareId);

      // Додаємо пропс `isSelected` для візуального відображення
      const isSelected = selectedSquare === squareId;

      boardSquares.push(
        <Square
          key={squareId}
          id={squareId}
          isLight={isLight}
          showSquareId={showSquareId}
          pieceType={pieceType}
          isSelected={isSelected} // Передаємо стан виділення
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
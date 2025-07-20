import React, { useState, useRef, useCallback } from 'react';
// import { useSelector } from 'react-redux'; // Redux поки не потрібен
import Square from '../Square/Square';
import styles from './ChessBoardView.module.css';
// Перейменовуємо для ясності, щоб не плутати з локальним станом
import { initialBoardPiecesObject as initialBoardState } from '../../redux/positions'; 

const ChessBoardView = ({ showSquareId }) => {
  // === Ключова зміна: boardPiecesObject тепер є локальним станом ===
  // Ініціалізуємо стан дошки копією початкового об'єкта.
  // Цей об'єкт буде змінюватися (імутабельно), і React буде його відстежувати.
  const [boardPiecesObject, setBoardPiecesObject] = useState(initialBoardState);

  console.log("Поточний стан дошки (useState):", boardPiecesObject); 

  // getPieceAtSquareId тепер читає з локального стану boardPiecesObject
  const getPieceAtSquareId = useCallback((squareId) => {
    const piece = boardPiecesObject[squareId]; 
    console.log(`Перевіряємо клітинку ${squareId}: ${piece ? piece : 'порожньо'}`);
    return piece ? piece : null;
  }, [boardPiecesObject]); // Залежність: функція оновиться, якщо boardPiecesObject зміниться

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  // selectedSquare використовується для візуального виділення першої клітинки
  const [selectedSquare, setSelectedSquare] = useState(null); 
  // clickedPieceRef зберігає ID клітинки-джерела першого кліку
  const clickedPieceRef = useRef(null);

  const handleClick = useCallback((squareId) => {
    // --- ПЕРШИЙ КЛІК: вибір фігури ---
    if (selectedSquare === null) { // Якщо раніше нічого не було вибрано
      const pieceType = getPieceAtSquareId(squareId); // Перевіряємо, чи є фігура на клітинці

      if (pieceType) { // Якщо фігура є
        setSelectedSquare(squareId); // Виділяємо клітинку візуально
        clickedPieceRef.current = squareId; // Зберігаємо клітинку в рефі як джерело ходу
        console.log(`Перший клік: Знайдено фігуру ${pieceType} на ${squareId}. Підсвічуємо.`);
      } else {
        console.log(`Перший клік: ${squareId} порожня. Нічого виділяти.`);
      }
    }
    // --- ДРУГИЙ КЛІК: спроба зробити хід ---
    else {
      const fromSquare = clickedPieceRef.current; // Клітинка, з якої робиться хід (з рефа)
      const toSquare = squareId;                 // Клітинка, куди робиться хід (другий клік)

      console.log(`Другий клік: Спроба ходу з ${fromSquare} на ${toSquare}.`);

      // Отримуємо фігуру, яку потрібно перемістити, з поточного стану дошки
      const pieceToMove = getPieceAtSquareId(fromSquare);

      if (pieceToMove) { // Перевіряємо, чи дійсно фігура була на початковій клітинці
        // === ІМУТАБЕЛЬНЕ ОНОВЛЕННЯ СТАНУ ДОШКИ ===
        // 1. Створюємо НОВУ копію поточного об'єкта стану дошки.
        //    Це КЛЮЧОВИЙ момент для того, щоб React побачив зміни.
        const newBoard = { ...boardPiecesObject };

        // 2. Видаляємо фігуру з початкової клітинки у НОВІЙ копії
        delete newBoard[fromSquare];

        // 3. Додаємо фігуру на цільову клітинку у НОВІЙ копії
        newBoard[toSquare] = pieceToMove;

        // 4. Оновлюємо стан React за допомогою функції-сеттера.
        //    Це примушує компонент перерендеритися з новими даними.
        setBoardPiecesObject(newBoard);
        console.log(`Хід виконано: ${pieceToMove} з ${fromSquare} на ${toSquare}.`);
        console.log("Новий стан дошки після ходу:", newBoard);
      } else {
        console.log(`На клітинці ${fromSquare} немає фігури для переміщення.`);
      }

      // Скидаємо виділення та реф після спроби ходу
      setSelectedSquare(null); // Прибираємо візуальне виділення
      clickedPieceRef.current = null; // Очищаємо реф
      console.log('Виділення та реф очищені після другого кліку.');
    }
  }, [selectedSquare, getPieceAtSquareId, boardPiecesObject]); // Залежності useCallback

  const boardSquares = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isLight = (i + j) % 2 === 0;
      const squareId = `${files[j]}${ranks[i]}`;

      // Отримуємо тип фігури з актуального стану дошки
      const pieceType = getPieceAtSquareId(squareId); 

      // isSelected контролює підсвічування клітинки, вибраної першим кліком
      const isSelected = selectedSquare === squareId;

      boardSquares.push(
        <Square
          key={squareId}
          id={squareId}
          isLight={isLight}
          showSquareId={showSquareId}
          pieceType={pieceType}
          isSelected={isSelected} // Цей пропс тепер керує підсвіткою
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
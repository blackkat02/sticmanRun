import React, { useState, useCallback } from 'react';
import { Chess } from 'chess.js'; // Бібліотека для логіки шахів
import ChessBoardView from './ChessBoardView'; // <-- Цей компонент відповідає за візуалізацію!

function ChessGameContainer() {
  const [game, setGame] = useState(new Chess()); // Стан гри (об'єкт chess.js)
  const [selectedSquare, setSelectedSquare] = useState(null); // Стан для обраної клітинки (UI-логіка)

  // Функція для обробки перетягування фігур або кліків на клітинках
  const handlePieceDrop = useCallback((sourceSquare, targetSquare) => {
    // Вся логіка ходу відбувається тут
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Приклад: завжди перетворювати в ферзя
      });

      if (move === null) {
        // Невірний хід, повертаємо false, щоб візуалізація відкотилась
        return false; 
      }

      // Якщо хід успішний, оновлюємо стан гри.
      // Важливо: створюємо новий екземпляр Chess для коректного оновлення стану в React.
      setGame(new Chess(game.fen())); 
      setSelectedSquare(null); // Скидаємо обрану клітинку
      
      // Додаткова логіка: перевірка на мат/шах/пат, зміна черги ходу тощо
      if (game.isGameOver()) {
        console.log("Гра закінчена!");
        // Додати тут логіку для відображення результату гри
      }

      return true; // Хід успішний
    } catch (e) {
      console.error("Помилка під час ходу:", e);
      return false; // Помилка, відкочуємо
    }
  }, [game]); // Залежність game

  const handleSquareClick = useCallback((square) => {
    // Приклад спрощеної логіки кліків: вибір фігури або спроба ходу
    if (selectedSquare) {
      // Якщо вже є обрана клітинка, спробувати зробити хід
      const moveSuccess = handlePieceDrop(selectedSquare, square);
      if (moveSuccess) {
        setSelectedSquare(null); // Скидаємо вибір після успішного ходу
      } else {
        // Якщо хід невірний, можливо, переобрати фігуру або скинути вибір
        setSelectedSquare(null); 
      }
    } else {
      // Якщо немає обраної клітинки, і на клітинці є фігура, вибрати її
      if (game.get(square)) {
        setSelectedSquare(square);
      }
    }
  }, [selectedSquare, game, handlePieceDrop]);


  return (
    // <div className="chess-game-wrapper">
    // Цей контейнер може мати мінімальний візуальний wrapper або бути повністю "пустим",
    // просто повертаючи візуальний компонент.
    // Тут логічний контейнер передає дані та колбеки візуальному компоненту.
    <ChessBoardView
      position={game.fen()} // Передаємо поточну позицію у форматі FEN
      onPieceDrop={handlePieceDrop} // Передаємо функцію обробки перетягування
      onSquareClick={handleSquareClick} // Передаємо функцію обробки кліків
      selectedSquare={selectedSquare} // Передаємо обрану клітинку для підсвічування
      // Можливо, інші пропси, як showLegalMoves, lastMove, etc.
    />
    // </div>
  );
}

export default ChessGameContainer;
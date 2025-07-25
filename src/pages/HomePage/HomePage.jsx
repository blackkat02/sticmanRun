// HomePage.jsx
import React, { useState, useEffect } from 'react'; // Імпортуємо useState та useEffect
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx'; // Переконайтеся, що шлях правильний і розширення .jsx

const HomePage = () => {
  // Стан для позиції гравця: { x: координата по горизонталі, level: рівень }
  // Починаємо з 0-ї клітинки на 0-му рівні
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 }); 

  // Розміри ігрової дошки для перевірки меж (повинно відповідати GameBoard.jsx)
  // Це константа тут, але в реальній грі її можна було б передавати або імпортувати
  const boardWidthInCells = 20; 

  // Використовуємо useEffect для додавання та видалення слухача подій клавіатури
  useEffect(() => {
    const handleKeyDown = (event) => {
      setPlayerPosition(prevPosition => {
        let newX = prevPosition.x;
        // Логіка руху: 'KeyD' для вперед (вправо), 'KeyA' для назад (вліво)
        // Використовуємо event.code для незалежності від розкладки мови
        if (event.code === 'KeyD') { // Фізична клавіша 'D'
          newX = prevPosition.x + 1;
        } else if (event.code === 'KeyA') { // Фізична клавіша 'A'
          newX = prevPosition.x - 1;
        }

        // Перевірка меж: гравець не повинен виходити за межі дошки
        newX = Math.max(0, Math.min(newX, boardWidthInCells - 1));

        // Якщо позиція змінилася, оновлюємо стан
        if (newX !== prevPosition.x) {
          console.log(`Гравець переміщено на: X=${newX}, Рівень=${prevPosition.level}`);
          return { ...prevPosition, x: newX };
        }
        return prevPosition; // Якщо позиція не змінилася, повертаємо попередній стан
      });
    };

    // Додаємо слухача подій до об'єкта window
    // Цей слухач буде реагувати на натискання клавіш у всьому вікні браузера
    window.addEventListener('keydown', handleKeyDown);

    // Функція очищення: видаляємо слухача подій при розмонтуванні компонента
    // Це важливо для запобігання витокам пам'яті
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boardWidthInCells]); // Залежність від boardWidthInCells, якщо вона може змінюватися

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Ігрове поле</h1>
      <p>Поточна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level}</p>
      {/* GameBoard отримує лише playerPosition */}
      <GameBoard 
        playerPosition={playerPosition} 
      />
    </div>
  );
};

export default HomePage;


// HomePage.jsx (СКОРИГОВАНА ВЕРСІЯ)
import React, { useState, useEffect, useRef } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const [movementCooldown, setMovementCooldown] = useState(1000);
  const lastMoveTimeRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentTime = Date.now();
      if (currentTime - lastMoveTimeRef.current < movementCooldown) {
        return;
      }
      setPlayerPosition(prevPosition => {
        let newX = prevPosition.x;
        let moved = false;
        if (event.code === 'KeyD') {
          newX = prevPosition.x + 1;
          moved = true;
        } else if (event.code === 'KeyA') {
          newX = prevPosition.x - 1;
          moved = true;
        }
        if (moved) {
          lastMoveTimeRef.current = currentTime;
          console.log(`Гравець переміщено на: X=${newX}, Рівень=${prevPosition.level + 1}`);
          console.log(`Клітинка: ${newX}-${prevPosition.level + 1}`);
          return { ...prevPosition, x: newX };
        }
        return prevPosition;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movementCooldown]);

  const currentCellName = `${playerPosition.x}-${playerPosition.level + 1}`;

  return (
    // !!! НОВИЙ ГОЛОВНИЙ КОНТЕЙНЕР - ТЕПЕР ВІН position: 'relative' !!!
    // Його висота може бути 100vh, щоб вміст займав весь екран.
    // overflow: hidden, щоб приховати прокрутку за межами вікна.
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* Контейнер для тексту - він залишається в поточному потоці */}
      {/* Ми можемо дати йому фіксовану висоту або просто дозволити йому займати місце, яке потрібно */}
      <div style={{ padding: '20px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}> {/* Додав стилі для кращого візуального розділення */}
        <h1>Безкінечне Ігрове Поле</h1>
        <p>
          Поточна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level + 1}
          <br />
          **Поле:** {currentCellName}
        </p>
        <p>
          **Затримка руху (мсек):** {movementCooldown} (налаштовується для 1-го рівня складності)
        </p>
      </div>

      {/* !!! КОНТЕЙНЕР ДЛЯ GAMEBOARD - ТЕПЕР ВІН НЕ position: absolute !!! */}
      {/* Він є дочірнім елементом головного relative контейнера. */}
      {/* Його позиція буде автоматично після текстового блоку. */}
      {/* Ми задамо йому ширину 100% і решту висоти, яка залишилася. */}
      <div style={{ position: 'relative', width: '100%', height: `calc(100vh - ${200}px)` /* Приблизна висота заголовка та параграфів, налаштуй */, overflow: 'hidden' }}>
        <GameBoard
          playerPosition={playerPosition}
        />
      </div>
    </div>
  );
};

export default HomePage;
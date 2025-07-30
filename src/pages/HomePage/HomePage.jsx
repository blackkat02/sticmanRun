// HomePage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const animationDuration = 1000;

  const actionQueueRef = useRef([]); // Черга очікуваних рухів
  const isAnimatingRef = useRef(false); // Чи активна зараз анімація
  const isKeyPressedRef = useRef({}); // Для відстеження, чи натиснута клавіша (для анти-спаму)

  // Функція для обробки наступної дії в черзі
  const processNextAction = useCallback(() => {
    if (actionQueueRef.current.length > 0 && !isAnimatingRef.current) {
      const nextAction = actionQueueRef.current.shift(); // Беремо першу дію з черги
      isAnimatingRef.current = true; // Встановлюємо, що анімація почалася

      console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Початок обробки дії з черги: ${nextAction.newLogicalX}`);

      setPlayerPosition(prevPosition => ({ ...prevPosition, x: nextAction.newLogicalX }));
    }
  }, []);

  // Callback, який GameBoard викликає, коли анімація завершилася
  const onAnimationEnd = useCallback(() => {
    console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Анімація завершена. Знімаю прапор анімації.`);
    isAnimatingRef.current = false; // Знімаємо прапор активної анімації
    processNextAction(); // Після завершення анімації, спробуй обробити наступну дію
  }, [processNextAction]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ігноруємо натискання, якщо це повторне натискання тієї ж клавіші (гравець тримає її затиснутою)
      // АБО якщо клавіша вже обробляється
      if (event.repeat || isKeyPressedRef.current[event.code]) {
        return;
      }

      let newLogicalX = playerPosition.x;
      let actionTriggered = false;

      if (event.code === 'KeyD') {
        newLogicalX = playerPosition.x + 1;
        actionTriggered = true;
      } else if (event.code === 'KeyA') {
        newLogicalX = playerPosition.x - 1;
        actionTriggered = true;
      }

      if (actionTriggered) {
        // Позначаємо, що ця клавіша зараз натиснута
        isKeyPressedRef.current[event.code] = true;

        console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Кнопка натиснута: ${event.code}. Додаю до черги: ${newLogicalX}.`);

        // Додаємо дію до черги
        actionQueueRef.current.push({ newLogicalX });

        // Спробуймо одразу обробити чергу (якщо анімація не йде)
        processNextAction();
      }
    };

    const handleKeyUp = (event) => {
      // Знімаємо прапор, коли клавіша відпущена
      isKeyPressedRef.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp); // Додаємо обробник для відпускання клавіші

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPosition, processNextAction]);

  const currentCellName = `${playerPosition.x}-${playerPosition.level + 1}`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ padding: '20px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <h1>Безкінечне Ігрове Поле</h1>
        <p>
          Поточна логічна позиція коня: X={playerPosition.x}, Рівень={playerPosition.level + 1}
          <br />
          **Поле:** {currentCellName}
        </p>
        <p>
          **Тривалість анімації (мсек):** {animationDuration}
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: `calc(100vh - ${200}px)` /* НАЛАШТУЙ ЦЮ ВИСОТУ ПІД СЕБЕ */, overflow: 'hidden' }}>
        <GameBoard
          playerPosition={playerPosition}
          animationDuration={animationDuration}
          onAnimationEnd={onAnimationEnd}
        />
      </div>
    </div>
  );
};

export default HomePage;
// HomePage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameBoard } from '../../components/GameBoard/GameBoard.jsx';

const HomePage = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, level: 0 });
  const animationDuration = 1000;

  const actionQueueRef = useRef([]); // Черга очікуваних рухів
  const isAnimatingRef = useRef(false); // Чи активна зараз анімація

  // Функція для обробки наступної дії в черзі
  const processNextAction = useCallback(() => {
    // Якщо черга не пуста і анімація не активна, беремо наступну дію
    if (actionQueueRef.current.length > 0 && !isAnimatingRef.current) {
      isAnimatingRef.current = true; // Встановлюємо, що анімація почалася
      const nextAction = actionQueueRef.current.shift(); // Беремо першу дію з черги

      console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Початок обробки дії з черги: ${nextAction.newLogicalX}`);

      setPlayerPosition(prevPosition => ({ ...prevPosition, x: nextAction.newLogicalX }));
    }
  }, []); // Пусті залежності, бо посилаємося тільки на useRef

  // Callback, який GameBoard викликає, коли анімація завершилася
  const onAnimationEnd = useCallback(() => {
    console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Анімація завершена. Знімаю прапор анімації.`);
    isAnimatingRef.current = false; // Знімаємо прапор активної анімації
    processNextAction(); // Після завершення анімації, спробуй обробити наступну дію
  }, [processNextAction]);

  useEffect(() => {
    // Цей useEffect тепер не залежить від playerPosition,
    // тому обробники handleKeyDown/handleKeyUp реєструються лише один раз
    const handleKeyDown = (event) => {
      // Ігноруємо натискання, якщо це повторне натискання тієї ж клавіші (гравець тримає її затиснутою)
      // `event.repeat` спрацьовує, якщо клавіша утримується, і це найнадійніший спосіб уникнути "спаму".
      if (event.repeat) {
        return;
      }
      
      let newLogicalX = playerPosition.x; // playerPosition буде актуальним на момент рендера
      let actionTriggered = false;

      if (event.code === 'KeyD') {
        newLogicalX = playerPosition.x + 1;
        actionTriggered = true;
      } else if (event.code === 'KeyA') {
        newLogicalX = playerPosition.x - 1;
        actionTriggered = true;
      }

      if (actionTriggered) {
        // Додаємо дію до черги
        actionQueueRef.current.push({ newLogicalX });

        console.log(`[${new Date().toLocaleTimeString('uk-UA', { hour12: false, second: '2-digit', fractionalSecondDigits: 3 })}] Кнопка натиснута: ${event.code}. Додаю до черги: ${newLogicalX}.`);

        // Спробуймо одразу обробити чергу (якщо анімація не йде)
        processNextAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition.x, processNextAction]); // Залишаємо playerPosition.x, щоб `handleKeyDown` мав актуальне значення

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
import React, { useState } from 'react'; // Імпортуємо useState
import ChessGameContainer from '../../components/ChessGameContainer/ChessGameContainer';
import Button from '../../components/Button/Button'; // Імпортуємо компонент Button
import styles from './HomePage.module.css'; // Переконайтеся, що у вас є HomePage.module.css для стилізації кнопок

const HomePage = () => {
  const [showSquareId, setShowSquareId] = useState(false); // Створюємо стан для відображення ID

  const handleShowId = () => {
    setShowSquareId(true);
  };

  const handleHideId = () => {
    setShowSquareId(false);
  };

  return (
    <div className={styles.homePageWrapper}>
      <h1>Шахи MVP</h1>

      <ChessGameContainer showSquareId={showSquareId} />

      <div className={styles.buttonGroup}>
        <Button
          onClick={handleShowId}
          id="show-id-button"
          className={styles.primaryButton}
        >
          Показати назву поля
        </Button>
        <Button
          onClick={handleHideId}
          id="hide-id-button"
          className={styles.secondaryButton}
        >
          Приховати назву поля
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
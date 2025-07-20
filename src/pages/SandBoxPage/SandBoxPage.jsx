import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { initialPosition } from '../../redux/positionsSlice'; 
import ChessBoardView from '../../components/ChessBoardView/ChessBoardView';
import Button from '../../components/Button/Button';
import styles from './SandBoxPage.module.css'; 

const SandBoxPage = () => {
  const [showSquareId, setShowSquareId] = useState(false);

  const handleShowId = () => {
    setShowSquareId(true);
  };

  const handleHideId = () => {
    setShowSquareId(false);
  };

  return (
    <div className={styles.homePageWrapper}>
      <h1>Chess MVP</h1>

      <ChessBoardView showSquareId={showSquareId} />

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

export default SandBoxPage;
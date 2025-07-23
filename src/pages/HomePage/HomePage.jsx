import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { GameBoard } from '../../components/GameBoard/GameBoard';
import styles from './HomePage.module.css'; 

const HomePage = () => {

  return (
    <div className={styles.homePageWrapper}>
      <h1>GameBoard</h1>

      <GameBoard />

    </div>
  );
};

export default HomePage;
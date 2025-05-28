import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ text = "Loading..." }) => (
  <div className={styles.wrapper}>
    <div className={styles.spinner}></div>
    <p className={styles.text}>{text}</p>
  </div>
);

export default Loader;
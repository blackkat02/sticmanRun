import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {

  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h3>You can find everything you want in our catalog</h3>
        <Link to="/campers">
          <button>
            View Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
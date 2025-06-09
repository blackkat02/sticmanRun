// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import HeroImage from '../../assets/HeroImage.png'; // <-- Імпортуємо фонове зображення

const HomePage = () => {
  return (
    <section>
      {/* Додаємо фонове зображення за допомогою inline style або CSS-класу */}
      <div 
        className={styles.container} 
        style={{ backgroundImage: `url(${HeroImage})` }} // <--- Встановлюємо фон
      >
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h3 className={styles.subtitle}>You can find everything you want in our catalog</h3>
        <Link to="/campers">
          <button className={styles.button}>
            View Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './HomePage.module.css';

// const HomePage = () => {

//   return (
//     <section>
//       <div className={styles.container}>
//         <h1 className={styles.title}>Campers of your dreams</h1>
//         <h3>You can find everything you want in our catalog</h3>
//         <Link to="/campers">
//           <button>
//             View Now
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default HomePage;
import React from 'react'; // Додаємо React, якщо ще не доданий
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Імпортуємо хуки Redux
import { addToFavorites, removeFromFavorites } from '../../redux/favoriteSlice'; // Імпортуємо екшени favoriteSlice
import { selectFavoriteItems } from '../../redux/store'; // Імпортуємо селектор з store.js
import styles from './CamperCard.module.css';

// Приклад іконки сердечка (замініть на вашу реальну іконку)
// import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
// import { ReactComponent as FilledHeartIcon } from '../../assets/icons/filled-heart.svg';

const CamperCard = ({ camper, location }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteItems); // Отримуємо масив ID обраних кемперів

  const {
    _id,
    name,
    price,
    rating,
    reviews = [],
    location: camperLocation,
    description,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
    // Припустимо, що ці властивості є безпосередньо на об'єкті camper
    // Якщо вони в details, вам потрібно буде звертатись через camper.details.AC
    AC, // Assuming direct property on camper
    bathroom, // Assuming direct property on camper
    kitchen, // Assuming direct property on camper
    TV, // Assuming direct property on camper
    radio, // Assuming direct property on camper
    refrigerator, // Assuming direct property on camper
    microwave, // Assuming direct property on camper
    gas, // Assuming direct property on camper
    water, // Assuming direct property on camper
    gallery = [],
  } = camper;

  // Перевіряємо, чи поточний кемпер є в обраних
  const isFavorite = favoriteItems.includes(_id);

  // Обробник для перемикання стану "обране"
  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Запобігаємо переходу за посиланням Link
    if (isFavorite) {
      dispatch(removeFromFavorites(_id));
    } else {
      dispatch(addToFavorites(_id));
    }
  };

  let vehicleTypeDisplay = '';
  switch (form) {
    case 'panelTruck':
      vehicleTypeDisplay = 'Фургон';
      break;
    case 'fullyIntegrated':
      vehicleTypeDisplay = 'Інтегрований';
      break;
    case 'alcove':
      vehicleTypeDisplay = 'Альков';
      break;
    default:
      vehicleTypeDisplay = form;
  }

  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <Link
          to={`/campers/${_id}`}
          state={{ from: `${location.pathname}${location.search}` }}
          className={styles.link}
        >
          {gallery.length > 0 && (
            <div className={styles.imageWrapper}>
              <img
                src={gallery[0].original || gallery[0].thumb}
                alt={`${name} thumbnail`}
                className={styles.camperImage}
              />
            </div>
          )}
        </Link>
        {/* Кнопка "Обране" */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {/* Замініть на ваші іконки: {isFavorite ? <FilledHeartIcon /> : <HeartIcon />} */}
          {/* Приклад з умовним рендерингом простих символів або placeholders */}
          {isFavorite ? '❤️' : '🤍'} 
        </button>
      </div>

      <div className={styles.infoWrapper}> {/* Додамо обгортку для кращого контролю стилів */}
        <div className={styles.header}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.priceAndRating}>
                <p className={styles.price}>${price}</p>
                <p className={styles.rating}><span className={styles.starIcon}>⭐️</span> {rating} ({reviews.length} відгуків)</p>
                <p className={styles.location}><span className={styles.mapPinIcon}>📍</span> {camperLocation}</p> {/* Замініть на іконку локації */}
            </div>
        </div>
        
        <p className={styles.descriptionText}>{description}</p>

        {/* Деталі обладнання */}
        <div className={styles.detailsList}>
          {/* Тут використовуємо AC, bathroom, kitchen, TV напряму з об'єкта camper */}
          {AC && <span className={styles.detailItem}>AC</span>}
          {transmission === 'automatic' && <span className={styles.detailItem}>Automatic</span>} {/* Transmission */}
          {kitchen && <span className={styles.detailItem}>Kitchen</span>}
          {TV && <span className={styles.detailItem}>TV</span>}
          {bathroom && <span className={styles.detailItem}>Bathroom</span>}
          {/* Додайте інші поля, якщо вони є у вашому об'єкті кемпера */}
          {/* Приклад використання `details` якщо воно все ж є і містить `beds` */}
          {camper.details?.beds && <span className={styles.detailItem}>{camper.details.beds} beds</span>}
          <span className={styles.detailItem}>{vehicleTypeDisplay}</span> {/* Тип ТЗ */}
        </div>
      </div>
    </li>
  );
};

export default CamperCard;


// import { Link } from 'react-router-dom';
// import styles from './CamperCard.module.css';

// const CamperCard = ({ camper, location }) => {
//   const {
//     _id, // Використовуйте _id, якщо це ID з MockAPI
//     name,
//     price,
//     rating,
//     reviews = [],
//     location: camperLocation,
//     description,
//     form, // Це поле тепер використовується для типу ТЗ
//     length,
//     width,
//     height,
//     tank,
//     consumption,
//     transmission,
//     engine,
//     // Обладнання тепер у details, але деякі дані є окремо (transmission, engine)
//     // AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water
//     details = {}, // Усі булеві поля для обладнання тут
//     gallery = [], // Додайте, якщо є галерея зображень
//   } = camper;

//   // Визначення типу транспортного засобу для відображення
//   let vehicleTypeDisplay = '';
//   switch (form) {
//     case 'panelTruck':
//       vehicleTypeDisplay = 'Фургон';
//       break;
//     case 'fullyIntegrated':
//       vehicleTypeDisplay = 'Інтегрований';
//       break;
//     case 'alcove':
//       vehicleTypeDisplay = 'Альков';
//       break;
//     default:
//       vehicleTypeDisplay = form; // На випадок невідомого типу
//   }

//   return (
//     <li className={styles.item}>
//       <div className={styles.imageContainer}>
//         <Link
//           to={`/campers/${_id}`}
//           state={{ from: `${location.pathname}${location.search}` }}
//           className={styles.link}
//         >
//           {gallery.length > 0 && (
//             <div className={styles.imageWrapper}>
//               <img
//                 src={gallery[0].original || gallery[0].thumb}
//                 alt={`${name} thumbnail`}
//                 className={styles.camperImage}
//               />
//             </div>
//           )}
//         </Link>
//       </div>

//       <h3>{name}</h3>
//       <p>Ціна: ${price}</p>
//       <p>Рейтинг: {rating} ({reviews.length} відгуків)</p>
//       <p>Локація: {camperLocation}</p>
//       <p className={styles.descriptionText}>{description}</p>
//       <p>Тип: {vehicleTypeDisplay}</p>
//       <p>Трансмісія: {transmission}</p>
//       <p>Двигун: {engine}</p>

//       {/* Деталі обладнання з об'єкта details */}
//       <div className={styles.detailsList}>
//         {details.kitchen && <span className={styles.detailItem}>Кухня</span>}
//         {details.airConditioner && <span className={styles.detailItem}>Кондиціонер</span>}
//         {details.bathroom && <span className={styles.detailItem}>Ванна</span>}
//         {details.beds && <span className={styles.detailItem}>{details.beds} ліжок</span>}
//         {details.TV && <span className={styles.detailItem}>TV</span>}
//         {details.radio && <span className={styles.detailItem}>Радіо</span>}
//         {details.refrigerator && <span className={styles.detailItem}>Холодильник</span>}
//         {details.microwave && <span className={styles.detailItem}>Мікрохвильовка</span>}
//         {details.gas && <span className={styles.detailItem}>Газ</span>}
//         {details.water && <span className={styles.detailItem}>Вода</span>}
//         {/* Примітка: 'automatic' у FilterBar відповідає camper.transmission,
//               тому ми не шукаємо його в details тут. */}
//       </div>
//       {/* <NavLink
//         to="/campers"

//       >
//         Show more
//       </NavLink> */}
//     </li >
//   );
// };

// export default CamperCard;


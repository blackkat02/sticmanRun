import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper, location }) => {
  const {
    _id, // Використовуйте _id, якщо це ID з MockAPI
    name,
    price,
    rating,
    reviews = [],
    location: camperLocation,
    description,
    form, // Це поле тепер використовується для типу ТЗ
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
    // Обладнання тепер у details, але деякі дані є окремо (transmission, engine)
    // AC, bathroom, kitchen, TV, radio, refrigerator, microwave, gas, water
    details = {}, // Усі булеві поля для обладнання тут
    gallery = [], // Додайте, якщо є галерея зображень
  } = camper;

  // Визначення типу транспортного засобу для відображення
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
      vehicleTypeDisplay = form; // На випадок невідомого типу
  }

  return (
    <li className={styles.item}>
      <Link 
        to={`/campers/${_id}`} // Використовуємо _id для маршрутизації
        state={{ 
          from: `${location.pathname}${location.search}`
        }}
        className={styles.link}
      >
        {/* Відображення зображення */}
        {gallery.length > 0 && (
          <img src={gallery[0].original || gallery[0].thumb} alt={name} className={styles.camperImage} />
        )}

        <h3>{name}</h3>
        <p>Ціна: ${price}</p>
        <p>Рейтинг: {rating} ({reviews.length} відгуків)</p>
        <p>Локація: {camperLocation}</p>
        <p className={styles.descriptionText}>{description}</p>
        <p>Тип: {vehicleTypeDisplay}</p>
        <p>Трансмісія: {transmission}</p>
        <p>Двигун: {engine}</p>
        
        {/* Деталі обладнання з об'єкта details */}
        <div className={styles.detailsList}>
          {details.kitchen && <span className={styles.detailItem}>Кухня</span>}
          {details.airConditioner && <span className={styles.detailItem}>Кондиціонер</span>}
          {details.bathroom && <span className={styles.detailItem}>Ванна</span>}
          {details.beds && <span className={styles.detailItem}>{details.beds} ліжок</span>}
          {details.TV && <span className={styles.detailItem}>TV</span>}
          {details.radio && <span className={styles.detailItem}>Радіо</span>}
          {details.refrigerator && <span className={styles.detailItem}>Холодильник</span>}
          {details.microwave && <span className={styles.detailItem}>Мікрохвильовка</span>}
          {details.gas && <span className={styles.detailItem}>Газ</span>}
          {details.water && <span className={styles.detailItem}>Вода</span>}
          {/* Примітка: 'automatic' у FilterBar відповідає camper.transmission,
              тому ми не шукаємо його в details тут. */}
        </div>
      </Link>
      {/* Кнопка "Show More" або інша дія */}
      {/* <button className={styles.showMoreButton}>Показати більше</button> */}
    </li>
  );
};

export default CamperCard;

// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styles from './CamperCard.module.css';

// const CamperCard = ({ camper }) => {
//   const {
//     name,
//     price,
//     rating,
//     location,
//     description,
//     transmission,
//     engine,
//     AC,
//     bathroom,
//     kitchen,
//     TV,
//     radio,
//     refrigerator,
//     microwave,
//     gas,
//     water,
//     gallery,
//     reviews
//   } = camper;

//   return (
//     <div className="camper-card">
//       <div className="camper-header">
//         <h2 className="camper-name">{name}</h2>
//         <div className="camper-price">€{price.toLocaleString()}</div>
//       </div>

//       <div className="camper-rating-location">
//         <span className="rating">★ {rating}</span>
//         <span className="location">{location}</span>
//       </div>

//       <p className="camper-description">{description}</p>

//       <div className="camper-thumbnail">
//         {gallery.length > 0 && (
//           <img 
//             src={gallery[0].thumb} 
//             alt={`${name} main view`} 
//             className="thumbnail-image"
//           />
//         )}
//       </div>
//       {/* <div className="camper-gallery">
//         {gallery.map((img, index) => (
//           <img 
//             key={index} 
//             src={img.thumb} 
//             alt={`${name} view ${index + 1}`} 
//             className="gallery-thumb"
//           />
//         ))}
//       </div> */}

//       <div className="camper-details">
//         <h3>Vehicle Details</h3>
//         <div className="details-grid">
//           <div className="detail-item">
//             <span className="detail-label">Transmission:</span>
//             <span className="detail-value">{transmission}</span>
//           </div>
//           <div className="detail-item">
//             <span className="detail-label">Engine:</span>
//             <span className="detail-value">{engine}</span>
//           </div>
//           {AC && <div className="feature">AC</div>}
//           {bathroom && <div className="feature">Bathroom</div>}
//           {kitchen && <div className="feature">Kitchen</div>}
//           {TV && <div className="feature">TV</div>}
//           {radio && <div className="feature">Radio</div>}
//           {refrigerator && <div className="feature">Refrigerator</div>}
//           {microwave && <div className="feature">Microwave</div>}
//           {gas && <div className="feature">Gas</div>}
//           {water && <div className="feature">Water</div>}
//         </div>
//       </div>

//       <NavLink 
//         to="/campers/:id" 
//         // className={({ isActive }) => 
//         //   isActive ? `${css.link} ${css.active}` : css.link
//         // }
//       >
//         Show more
//       </NavLink>

//       {/* <div className="camper-reviews">
//         <h3>Reviews</h3>
//         {reviews.map((review, index) => (
//           <div key={index} className="review">
//             <div className="review-header">
//               <span className="reviewer-name">{review.reviewer_name}</span>
//               <span className="reviewer-rating">★ {review.reviewer_rating}</span>
//             </div>
//             <p className="review-comment">{review.comment}</p>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// CamperCard.propTypes = {
//   camper: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//     location: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     transmission: PropTypes.string.isRequired,
//     engine: PropTypes.string.isRequired,
//     AC: PropTypes.bool,
//     bathroom: PropTypes.bool,
//     kitchen: PropTypes.bool,
//     TV: PropTypes.bool,
//     radio: PropTypes.bool,
//     refrigerator: PropTypes.bool,
//     microwave: PropTypes.bool,
//     gas: PropTypes.bool,
//     water: PropTypes.bool,
//     gallery: PropTypes.arrayOf(
//       PropTypes.shape({
//         thumb: PropTypes.string,
//         original: PropTypes.string
//       })
//     ).isRequired,
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         reviewer_name: PropTypes.string,
//         reviewer_rating: PropTypes.number,
//         comment: PropTypes.string
//       })
//     ).isRequired
//   }).isRequired
// };

// export default CamperCard;


// import { Link } from 'react-router-dom';
// import styles from './CamperCard.module.css';

// const CamperCard = ({ camper, location }) => {
//   const {
//     id,
//     name,
//     price,
//     rating,
//     reviews = [],
//     location: camperLocation,
//     description,
//     transmission,
//     engine,
//     details = {}
//   } = camper;

//   return (
//     <li className={styles.item}>
//       <Link 
//         to={`/campers/${id}`}
//         state={{ 
//           from: `${location.pathname}${location.search}`
//         }}
//         className={styles.link}
//       >
//         <h3>{name}</h3>
//         <p>Price: {price}</p>
//         <p>Rating: {rating} ({reviews.length} reviews)</p>
//         <p>Location: {camperLocation}</p>
//         <p>Description: {description}</p>
//         <p>Transmission: {transmission}</p>
//         <p>Engine: {engine}</p>
//         {details.kitchen && <p>Kitchen available</p>}
//         {details.AC && <p>Air conditioning available</p>}
//       </Link>
//     </li>
//   );
// };

// export default CamperCard;

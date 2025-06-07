import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const {
    name,
    price,
    rating,
    location,
    description,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    gallery,
    reviews
  } = camper;

  return (
    <div className="camper-card">
      <div className="camper-header">
        <h2 className="camper-name">{name}</h2>
        <div className="camper-price">€{price.toLocaleString()}</div>
      </div>

      <div className="camper-rating-location">
        <span className="rating">★ {rating}</span>
        <span className="location">{location}</span>
      </div>

      <p className="camper-description">{description}</p>

      <div className="camper-thumbnail">
        {gallery.length > 0 && (
          <img 
            src={gallery[0].thumb} 
            alt={`${name} main view`} 
            className="thumbnail-image"
          />
        )}
      </div>
      {/* <div className="camper-gallery">
        {gallery.map((img, index) => (
          <img 
            key={index} 
            src={img.thumb} 
            alt={`${name} view ${index + 1}`} 
            className="gallery-thumb"
          />
        ))}
      </div> */}

      <div className="camper-details">
        <h3>Vehicle Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Transmission:</span>
            <span className="detail-value">{transmission}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Engine:</span>
            <span className="detail-value">{engine}</span>
          </div>
          {AC && <div className="feature">AC</div>}
          {bathroom && <div className="feature">Bathroom</div>}
          {kitchen && <div className="feature">Kitchen</div>}
          {TV && <div className="feature">TV</div>}
          {radio && <div className="feature">Radio</div>}
          {refrigerator && <div className="feature">Refrigerator</div>}
          {microwave && <div className="feature">Microwave</div>}
          {gas && <div className="feature">Gas</div>}
          {water && <div className="feature">Water</div>}
        </div>
      </div>

      <NavLink 
        to="/" 
        // className={({ isActive }) => 
        //   isActive ? `${css.link} ${css.active}` : css.link
        // }
      >
        Show more
      </NavLink>

      {/* <div className="camper-reviews">
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="reviewer-name">{review.reviewer_name}</span>
              <span className="reviewer-rating">★ {review.reviewer_rating}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    engine: PropTypes.string.isRequired,
    AC: PropTypes.bool,
    bathroom: PropTypes.bool,
    kitchen: PropTypes.bool,
    TV: PropTypes.bool,
    radio: PropTypes.bool,
    refrigerator: PropTypes.bool,
    microwave: PropTypes.bool,
    gas: PropTypes.bool,
    water: PropTypes.bool,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        thumb: PropTypes.string,
        original: PropTypes.string
      })
    ).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string,
        reviewer_rating: PropTypes.number,
        comment: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default CamperCard;


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

import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ items = [], onImageClick }) => {
  if (!items.length) return null;

  return (
    <ul className={styles.galleryGrid}>
      {items.map((photo) => (
        <li key={photo.id} className={styles.item}>
          <ImageCard photo={photo} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
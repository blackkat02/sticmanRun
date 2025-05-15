import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items }) => {
  return (
    <div className={styles.galleryGrid}>
      {items.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default ImageGallery;
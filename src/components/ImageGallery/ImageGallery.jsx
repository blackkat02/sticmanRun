import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.emptyState}>
        {/* <img src="/empty-state-icon.svg" alt="No images found" /> */}
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryGrid}>
      {items.map((photo) => (
        <ImageCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default ImageGallery;
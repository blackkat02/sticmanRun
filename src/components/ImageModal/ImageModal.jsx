import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={image ? true : false}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <div className={styles.content}>
          <img 
            src={image.urls.regular} 
            alt={image.alt_description || 'Full size image'} 
            className={styles.image}
          />
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
          <div className={styles.meta}>
            <p className={styles.author}>Photo by {image.user.name}</p>
            {image.description && (
              <p className={styles.description}>{image.description}</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import fetchPhotosQuery from './api';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("cat");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [LoadMoreBTN, setLoadMoreBTN] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosQuery(query, page);
        setGallery(prev => page === 1 ? data.results : [...prev, ...data.results]);
        data.total_pages > page ? setLoadMoreBTN(true) : setLoadMoreBTN(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      <ImageGallery items={gallery} onImageClick={handleImageClick} />
      {gallery.length > 0 && !loading && LoadMoreBTN && <LoadMoreBtn onClick={handleLoadMore} />}
      {loading && <Loader loading={loading} />}
      <Toaster />
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default App;
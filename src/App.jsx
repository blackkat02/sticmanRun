import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import fetchPhotosQuery from './api';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("cat");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setPage(page + 1)
  }

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosQuery(query, page);
        console.log(`page: ${page}`)
        setGallery((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {!loading && error && <ErrorMessage />}
      {!loading && !error && <ImageGallery items={gallery} />}
      {loading && <Loader loading={loading} />}
      {(!loading && !error && gallery.length > 0) && <LoadMoreBtn onClick={handleLoadMore} />}
      <Toaster />
    </div>
  );
};

export default App;
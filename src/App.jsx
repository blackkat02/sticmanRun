import { useState, useEffect } from "react";
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import fetchPhotosQuery from './api';

const ACCESS_KEY = "HXUq5Sgk7OKpZxn_DNmskkaD7tgF_y0DqNPlO3iO0lw";

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("cat");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") return; // Додана перевірка на пустий рядок
    setQuery(searchQuery);
    setGallery([]); // Очищаємо галерею при новому пошуку
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPhotosQuery(query);
        setGallery(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>Error loading images</p>}
      {!loading && !error && gallery.length > 0 && <ImageGallery items={gallery} />}
      {/* <Loader loading={loading} /> */}
      {loading && <Loader loading={loading} />}
    </div>
  );
};

export default App;
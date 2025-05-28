import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
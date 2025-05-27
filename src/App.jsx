import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies">
          <Route index element={<MoviesPage />} />
          <Route path=":movieId" element={<MovieDetailsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
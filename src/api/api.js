import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'cbaa40943eb40a195f037250c0771ec8';

export const fetchTrendingDay = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data;
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos', // Додаткові дані
        language: 'uk-UA'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Помилка завантаження фільму:', error);
    throw error;
  }
};

// export const fetchMoviesById = async (query) => {
//   const response = await axios.get(
//     `/search/movie?api_key=${API_KEY}&query=${query}`
//   );
//   return response.data;
// };
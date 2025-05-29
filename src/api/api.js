import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'cbaa40943eb40a195f037250c0771ec8';

export const fetchTrendingDay = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesByQuery = async (query, page = 1) => {
  const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
  return response.data;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieReviews = async (movieId, page = 1) => {
  const response = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`);
  return response.data;
};

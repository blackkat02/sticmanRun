// import axios from "axios";

// axios.defaults.baseURL = "https://api.themoviedb.org/3";

// const ACCESS_KEY = "cbaa40943eb40a195f037250c0771ec8";
// const API_READ_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmFhNDA5NDNlYjQwYTE5NWYwMzcyNTBjMDc3MWVjOCIsIm5iZiI6MTc0ODAyODU3Mi41MDQ5OTk5LCJzdWIiOiI2ODMwY2M5Yzk5MGY0ODkyMDdhODYwZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zq1PUdHVvzXfbPPdONzB2ClluGEO75gwj8sRy5W9Csw";

// const options = {
//   headers: {
//     Authorization: `Bearer ${API_READ_TOKEN}`
//   }
// };

// const fetchTrendingDay = async () => {
//   try {
//     const response = await axios.get("/trending/movie/day?language=en-US", {
//       ...options,
//       params: {
//         api_key: ACCESS_KEY,
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Ошибка при получении данных:", error.response?.data?.errors || error.message);
//     throw error;
//   }
// };

// export default fetchTrendingDay;


import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'cbaa40943eb40a195f037250c0771ec8'; // Замініть на ваш ключ

// Іменовані експорти
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
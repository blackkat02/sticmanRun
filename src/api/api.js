import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const ACCESS_KEY = "cbaa40943eb40a195f037250c0771ec8";
const API_READ_TOKEN = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmFhNDA5NDNlYjQwYTE5NWYwMzcyNTBjMDc3MWVjOCIsIm5iZiI6MTc0ODAyODU3Mi41MDQ5OTk5LCJzdWIiOiI2ODMwY2M5Yzk5MGY0ODkyMDdhODYwZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zq1PUdHVvzXfbPPdONzB2ClluGEO75gwj8sRy5W9Csw

const options = {
  headers: {
    Authorization: `Bearer ${API_READ_TOKEN}`
  }
};

const fetchMoviesQuery = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/movie", {
      ...options,
      params: {
        api_key: ACCESS_KEY,
        query: query,
        per_page: 15,
        page: page
      }
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error.response?.data?.errors || error.message);
    throw error;
  }
};

export default fetchMoviesQuery;

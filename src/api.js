import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const ACCESS_KEY = "HXUq5Sgk7OKpZxn_DNmskkaD7tgF_y0DqNPlO3iO0lw"; // Виправлено ключ (видалили 1 на початку)

const fetchPhotosQuery = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        client_id: ACCESS_KEY,
        query: query,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error.response?.data?.errors || error.message); // Правильне логування помилки
    throw error;
  }
};

export default fetchPhotosQuery;
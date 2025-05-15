import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const ACCESS_KEY = "HXUq5Sgk7OKpZxn_DNmskkaD7tgF_y0DqNPlO3iO0lw";

const fetchPhotosQuery = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        client_id: ACCESS_KEY,
        query: query,
        per_page: 12,
        page: page,
      },
    });
    console.log(query)
    return response.data.results;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export default fetchPhotosQuery;
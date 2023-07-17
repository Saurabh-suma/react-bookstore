import axios from "axios";

export const getGenres = async () => {
  try {
    const response = await axios.get("/genres");
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getGenre = async (genreId) => {
  try {
    const response = await axios.get("/genres/" + genreId);
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

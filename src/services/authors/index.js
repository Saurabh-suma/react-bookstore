import axios from "axios";

export const getAuthors = async () => {
  try {
    const response = await axios.get("/authors");
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAuthor = async (authorId) => {
  try {
    const response = await axios.get("/authors/" + authorId);
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

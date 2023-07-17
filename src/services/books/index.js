import axios from "axios";

export const AddBooks = async () => {
  try {
    const response = await axios.get("/items");
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBook = async (bookId) => {
  try {
    const response = await axios.get("/items/" + bookId);
    return response?.data?.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

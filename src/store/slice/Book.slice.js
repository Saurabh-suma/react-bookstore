import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  book: null,
  errormsg: "",
  loader: false,
};

export const retriveBooks = createAsyncThunk(
  "Book/retriveBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/items");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retriveBook = createAsyncThunk(
  "Book/retriveBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/items/" + bookId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addUpdateBook = createAsyncThunk(
  "Book/addUpdateBook",
  async (book, { rejectWithValue }) => {
    try {
      if ("id" in book) {
        const response = await axios.put("/items/" + book.id, book);
        return response.data;
      } else {
        const response = await axios.post("/items", book);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const DeleteBook = createAsyncThunk(
  "Book/DeleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/items" + bookId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retriveBooks.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(retriveBooks.fulfilled, (state, action) => {
      state.loader = false;
      state.books = action.payload;
    });
    builder.addCase(retriveBooks.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(retriveBook.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(retriveBook.fulfilled, (state, action) => {
      state.loader = false;
      state.book = action.payload;
      state.errormsg = "";
    });
    builder.addCase(retriveBook.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });

    builder.addCase(DeleteBook.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(DeleteBook.fulfilled, (state, action) => {
      state.loader = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
      state.errormsg = "";
      state.book = null;
    });
    builder.addCase(DeleteBook.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });
  },
});

export default BookSlice.reducer;

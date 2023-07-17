import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authors: [],
  author: null,
  loader: false,
  errormsg: "",
};

export const retriveAuthors = createAsyncThunk(
  "Author/retriveAuthors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/authors");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retriveAuthor = createAsyncThunk(
  "Author/retriveAuthor",
  async (authorId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/authors/" + authorId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const addUpdateAuthor = createAsyncThunk(
  "Author/addUpdateAuthor",
  async (author, { rejectWithValue }) => {
    try {
      if ("id" in author) {
        const response = await axios.put("/authors/" + author.id, author);
        return response.data;
      } else {
        const response = await axios.post("/authors", author);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const DeleteAuthor = createAsyncThunk(
  "Author/DeleteAuthor",
  async (authorId, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/authors/" + authorId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const AuthorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retriveAuthors.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(retriveAuthors.fulfilled, (state, action) => {
      state.loader = false;
      state.authors = action.payload;
    });
    builder.addCase(retriveAuthors.rejected, (state, action) => {
      state.loader = false;
    });

    builder.addCase(retriveAuthor.pending, (state) => {
      state.loader = false;
    });
    builder.addCase(retriveAuthor.fulfilled, (state, action) => {
      state.loader = false;
      state.author = action.payload;
      state.errormsg = "";
    });
    builder.addCase(retriveAuthor.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });

    builder.addCase(addUpdateAuthor.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addUpdateAuthor.fulfilled, (state, action) => {
      state.loader = false;
      state.author = null;
      state.errormsg = "";
    });

    builder.addCase(addUpdateAuthor.rejected, (state, action) => {
      state.loader = false;

      state.errormsg = action.payload;
    });

    builder.addCase(DeleteAuthor.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(DeleteAuthor.fulfilled, (state, action) => {
      state.loader = false;
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload.id
      );
      state.author = null;
      state.errormsg = "";
    });
    builder.addCase(DeleteAuthor.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });
  },
});

export default AuthorSlice.reducer;

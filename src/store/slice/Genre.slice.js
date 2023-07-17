import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  genres: [],
  genre: null,
  loader: false,
  errormsg: "",
};

export const retriveGenres = createAsyncThunk(
  "Genre/retriveGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/genres");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retriveGenre = createAsyncThunk(
  "Genre/retriveGenre",
  async (genreId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/genres/" + genreId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const addUpdateGenre = createAsyncThunk(
  "Genre/addUpdateGenre",
  async (genre, { rejectWithValue }) => {
    try {
      if ("id" in genre) {
        const response = await axios.put("/genres/" + genre.id, genre);
        return response.data;
      } else {
        const response = await axios.post("/genres", genre);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const DeleteGenre = createAsyncThunk(
  "Genre/DeleteGenre",
  async (genreId, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/genre/" + genreId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.detail);
    }
  }
);

export const GenreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retriveGenres.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(retriveGenres.fulfilled, (state, action) => {
      state.loader = false;
      state.genres = action.payload;
    });
    builder.addCase(retriveGenres.rejected, (state, action) => {
      state.loader = false;
    });

    builder.addCase(retriveGenre.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(retriveGenre.fulfilled, (state, action) => {
      state.loader = false;
      state.genre = action.payload;
      state.errormsg = "";
    });
    builder.addCase(retriveGenre.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });

    builder.addCase(addUpdateGenre.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(addUpdateGenre.fulfilled, (state, action) => {
      state.loader = false;
      state.genre = null;
      state.errormsg = "";
    });
    builder.addCase(addUpdateGenre.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });

    builder.addCase(DeleteGenre.pending, (state) => {
      state.loader = false;
    });
    builder.addCase(DeleteGenre.fulfilled, (state, action) => {
      state.loader = false;
      state.genres = state.genres.filter(
        (genre) => genre.id !== action.payload.id
      );
      state.genre = null;
      state.errormsg = "";
    });
    builder.addCase(DeleteGenre.rejected, (state, action) => {
      state.loader = false;
      state.errormsg = action.payload;
    });
  },
});

export default GenreSlice.reducer;

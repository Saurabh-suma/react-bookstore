import { configureStore } from "@reduxjs/toolkit";

import AuthorReducer from "./slice/Author.slice";
import GenreReducer from "./slice/Genre.slice";
import BookReducer from "./slice/Book.slice";

const store = configureStore({
  reducer: {
    author: AuthorReducer,
    genre: GenreReducer,
    book: BookReducer,
  },
});

export default store;

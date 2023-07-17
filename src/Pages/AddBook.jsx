import React, { useEffect, useState } from "react";
import { Container, Grid, Select } from "@mui/material";
import axios from "axios";
import FormCard from "../components/FormCard";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthors } from "../services/authors";
import { getGenres } from "../services/genres";
import { getBook } from "../services/books";

import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { retriveBook } from "../store/slice/Book.slice";
import { useDispatch } from "react-redux";

const AddBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [genreId, setGenreId] = useState("");

  const getRequiredData = async () => {
    const records = await getAuthors();
    const records1 = await getGenres();
    setAuthors([...records]);
    setGenres([...records1]);
  };

  const AddBooks = async (e) => {
    e.preventDefault();
    try {
      const book = {
        title,
        author_id: authorId,
        genre_id: genreId,
        price,
      };
      if (bookId) {
        await axios.put("/items/" + bookId, book);
      } else {
        await axios.post("/items", book);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  useEffect(() => {
    if (bookId) {
      dispatch(retriveBook(bookId));
    }
    // eslint-disable-next-line
  }, [bookId]);

  useEffect(() => {
    if (bookId) {
      (async () => {
        const book = await getBook(bookId);
        setTimeout(() => {
          setTitle(book.title);
          setPrice(book.price);
          setAuthorId(book.author_id);
          setGenreId(book.genre_id);
        }, 0);
      })();
    }
  }, [bookId]);

  return (
    <section className="add-books">
      <Grid item container sx={{ mt: 4 }} textAlign="center">
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="inherit"
        >
          Back
        </Button>
      </Grid>
      <FormCard title={bookId ? "Update Book" : "Add Book"}>
        <form onSubmit={AddBooks}>
          <Container
            sx={{
              width: "60ch",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="standard"
              label="Title"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Author</InputLabel>
              <Select
                label="Authors"
                variant="standard"
                value={authorId}
                required
                onChange={(e) => setAuthorId(e.target.value)}
              >
                {authors.map((author) => (
                  <MenuItem value={author.id} key={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Genre</InputLabel>
              <Select
                label="Genre"
                variant="standard"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
              >
                {genres.map((genre) => (
                  <MenuItem value={genre.id} key={genre.id}>
                    {genre.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Box
              m={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button type="submit" variant="contained">
                {bookId ? "Update Book" : "Add Book"}
              </Button>
            </Box>
          </Container>
        </form>
      </FormCard>
    </section>
  );
};

export default AddBook;

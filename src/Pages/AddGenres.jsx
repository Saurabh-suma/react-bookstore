import React, { useEffect, useState } from "react";
import FormCard from "../components/FormCard";
import { Box, Button, TextField, Grid, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateGenre, retriveGenre } from "../store/slice/Genre.slice";
import Loader from "../components/Loader";

const AddGenres = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genreId } = useParams();
  const { genre, loader, errormsg } = useSelector((state) => state.genre);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const getError = (key) => {
    if (errors?.detail) {
      const msgObj = errors.detail.find((item) => item.loc[1] === key);

      if (msgObj) {
        return msgObj.msg;
      }
    }
  };

  const AddGenre = async (e) => {
    e.preventDefault();

    setTitle("");
    setDescription("");

    try {
      setErrors({});

      const genre = {
        title,
        description,
      };
      if (genreId) {
        dispatch(addUpdateGenre({ ...genre, id: genreId }));
      } else {
        dispatch(addUpdateGenre(genre));
      }
      navigate("/genres");
    } catch (error) {
      console.error(error);
      setErrors(error?.response?.data);
    }
  };

  useEffect(() => {
    if (genreId) {
      dispatch(retriveGenre(genreId));
    }
    // eslint-disable-next-line
  }, [genreId]);

  useEffect(() => {
    if (genre != null) {
      setTitle(genre.title);
      setDescription(genre.description);
    }
  }, [genre]);

  return (
    <section className="add-genre">
      <Grid
        item
        container
        sx={{ mt: 4 }}
        textAlign="center
      "
      >
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="inherit"
        >
          Back
        </Button>
        <h1>{errormsg}</h1>
      </Grid>
      <FormCard title={genreId ? "Update Genre" : "Add Genre"}>
        <form onSubmit={AddGenre}>
          <Container sx={{ width: "60ch", justifyContent: "center" }}>
            <TextField
              variant="standard"
              label="Genre Title"
              fullWidth
              margin="normal"
              value={title}
              error={getError("title")}
              helperText={getError("title")}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              error={getError("description")}
              helperText={getError("description")}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Box
              m={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ mt: 2 }}
              >
                {genreId ? "Update Genre" : "Add Genre"}
              </Button>
            </Box>
          </Container>
        </form>
      </FormCard>
      <Loader open={loader} />
    </section>
  );
};

export default AddGenres;

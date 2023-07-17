import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Container, Grid } from "@mui/material";

import FormCard from "../components/FormCard";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthor } from "../services/authors";
import { addUpdateAuthor, retriveAuthor } from "../store/slice/Author.slice";
import { useDispatch } from "react-redux";

export const AddAuthor = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
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

  const AddAuthors = async (e) => {
    e.preventDefault();

    setName("");
    setDescription("");

    try {
      setErrors({});
      const author = {
        name,
        description,
      };
      if (authorId) {
        dispatch(addUpdateAuthor({ ...author, id: authorId }));
      } else {
        dispatch(addUpdateAuthor(author));
      }
      navigate("/authors");
    } catch (error) {
      setErrors(error?.response?.data);
    }
  };

  useEffect(() => {
    if (authorId) {
      dispatch(retriveAuthor(authorId));
    }
    // eslint-disable-next-line
  }, [authorId]);

  useEffect(() => {
    if (authorId) {
      const fetchauthor = async () => {
        const author = await getAuthor(authorId);
        console.log(author);
        if (author) {
          setName(author.name);
          setDescription(author.description);
        }
      };
      fetchauthor();
    }
  }, [authorId]);

  return (
    <section className="add-author">
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
      </Grid>
      <FormCard
        title={authorId ? "Update Author" : "Add Author"}
        sx={{ backgroundColor: "skyblue" }}
      >
        <form onSubmit={AddAuthors}>
          <Container sx={{ width: "60ch", justifyContent: "center" }}>
            <TextField
              variant="standard"
              label="Author Name"
              fullWidth
              margin="normal"
              value={name}
              error={getError("name")}
              helperText={getError("name")}
              onChange={(e) => setName(e.target.value)}
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
                {authorId ? "Update Author" : "Add Author"}
              </Button>
            </Box>
          </Container>
        </form>
      </FormCard>
    </section>
  );
};

export default AddAuthor;

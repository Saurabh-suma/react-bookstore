import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Box, Grid, IconButton, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "../components/Loader";
import { DeleteAuthor, retriveAuthors } from "../store/slice/Author.slice";
import { useDispatch, useSelector } from "react-redux";

export const Authors = () => {
  const dispatch = useDispatch();
  const { authors, loader } = useSelector((state) => state.author);

  const [search, setSearch] = useState("");
  const [filteredauthor, setFilteredAuthors] = useState([]);

  const deleteAuthor = async (id) => {
    if (window.confirm("Sure You Want To Delete This")) {
      try {
        await dispatch(DeleteAuthor(id));
        await dispatch(retriveAuthors());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const copy = authors.filter((author) =>
      author.name.toLowerCase().match(search.toLowerCase())
    );
    setFilteredAuthors([...copy]);
  }, [search, authors]);

  useEffect(() => {
    dispatch(retriveAuthors());
    // eslint-disable-next-line
  }, []);

  return (
    <section className="authors">
      <Grid container rowGap={4} sx={{ mt: 2 }} textAlign="center">
        <Grid item xs={12}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box textAlign="center">
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              component={NavLink}
              to="/authors/create"
            >
              Add Author
            </Button>
          </Box>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "skyblue" }}>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
              {filteredauthor.map((author) => (
                <TableRow
                  key={author.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{author.id}</TableCell>
                  <TableCell align="center">{author.name}</TableCell>
                  <TableCell align="center">{author.description}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={NavLink}
                      to={`/viewauthor/${author.id}`}
                    >
                      <VisibilityIcon color="primary" />
                    </IconButton>

                    <IconButton
                      component={NavLink}
                      to={`/authors/create/${author.id}`}
                    >
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => deleteAuthor(author.id)}>
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Loader open={loader} />
      </Grid>
    </section>
  );
};

export default Authors;

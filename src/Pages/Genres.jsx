import React, { useEffect, useState } from "react";
import { Button, Box, Grid, IconButton, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Loader from "../components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { retriveGenres } from "../store/slice/Genre.slice";
import { useDispatch, useSelector } from "react-redux";

const Genres = () => {
  const dispatch = useDispatch();
  const { genres, loader } = useSelector((state) => state.genre);

  const [search, setSearch] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);

  const deletegenres = async (id) => {
    if (window.confirm("Sure You Want To Delete This")) {
      const response = await axios.patch("/genres/" + id);
      try {
        if (response.data.status) {
          dispatch(retriveGenres());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const copy = genres.filter((genre) =>
      genre.title.toLowerCase().match(search.toLowerCase())
    );
    setFilteredGenres([...copy]);
  }, [search, genres]);

  useEffect(() => {
    dispatch(retriveGenres());
    // eslint-disable-next-line
  }, []);

  return (
    <section className="Genres">
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
              to="/genres/create"
            >
              Add Genres
            </Button>
          </Box>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "skyblue" }}>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Create_At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
              {filteredGenres.map((genre) => (
                <TableRow
                  key={genre.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{genre.id}</TableCell>
                  <TableCell align="center">{genre.title}</TableCell>
                  <TableCell align="center">{genre.description}</TableCell>
                  <TableCell align="center">{genre.created_at}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={NavLink}
                      to={`/viewgenre/${genre.id}`}
                    >
                      <VisibilityIcon color="primary" />
                    </IconButton>

                    <IconButton
                      component={NavLink}
                      to={`/genres/create/${genre.id}`}
                    >
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => deletegenres(genre.id)}>
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

export default Genres;

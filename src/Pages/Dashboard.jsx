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
import axios from "axios";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { retriveBooks } from "../store/slice/Book.slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loader, books } = useSelector((state) => state.book);

  const [search, setSearch] = useState("");
  const [filteredBoooks, setFilteredBooks] = useState([]);

  const deleteBook = async (id) => {
    if (window.confirm("Sure You Want To Delete This")) {
      try {
        const response = await axios.patch("/items/" + id);
        if (response.data.status) {
          dispatch(retriveBooks());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const copy = books.filter((book) =>
      book.title.toLowerCase().match(search.toLocaleLowerCase())
    );
    setFilteredBooks([...copy]);
  }, [search, books]);

  useEffect(() => {
    dispatch(retriveBooks());
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
              to="/create"
            >
              Add Books
            </Button>
          </Box>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "skyblue" }}>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Created-At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
              {filteredBoooks.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{book.id}</TableCell>
                  <TableCell align="center">{book.title}</TableCell>
                  <TableCell align="center">₹{book.price}</TableCell>
                  <TableCell align="center">{book.created_at}</TableCell>

                  <TableCell align="center">
                    <IconButton component={NavLink} to={`/viewbook/${book.id}`}>
                      <VisibilityIcon color="primary" />
                    </IconButton>

                    <IconButton component={NavLink} to={`/create/${book.id}`}>
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => deleteBook(book.id)}>
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

export default Dashboard;

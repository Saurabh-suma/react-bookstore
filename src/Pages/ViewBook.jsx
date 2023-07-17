import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../services/books";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";

const ViewBook = () => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchbook = async () => {
      const fetchedbook = await getBook(bookId);

      setBook(fetchedbook);
    };
    fetchbook();
  }, [bookId]);

  if (!book) {
    return <></>;
  }

  return (
    <section>
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
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "skyblue" }}>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
            <TableCell align="center">{book.id}</TableCell>
            <TableCell align="center">{book.title}</TableCell>
            <TableCell align="center">₹{book.price}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ViewBook;

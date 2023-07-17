import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre } from "../services/genres";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";

const ViewGenres = () => {
  const [genre, setGenre] = useState({});
  const { genreId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchgenre = async () => {
      const fetchedgenre = await getGenre(genreId);

      setGenre(fetchedgenre);
    };
    fetchgenre();
  }, [genreId]);

  if (!genre) {
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
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
            <TableCell align="center">{genre.id}</TableCell>
            <TableCell align="center">{genre.title}</TableCell>
            <TableCell align="center">{genre.description}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ViewGenres;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { getAuthor } from "../services/authors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewAuthor = () => {
  const [author, setAuthor] = useState({});
  const { authorId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchauthor = async () => {
      const fetchedauthor = await getAuthor(authorId);
      setAuthor(fetchedauthor);
    };
    fetchauthor();
  }, [authorId]);

  if (!author) {
    return <>Loading.....!!!!</>;
  }
  return (
    <section>
      <Grid item container sx={{ mt: 4 }} textAlign="center">
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "	#f0f8ff" }}>
            <TableCell align="center">{author.id}</TableCell>
            <TableCell align="center">{author.name}</TableCell>
            <TableCell align="center">{author.description}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ViewAuthor;

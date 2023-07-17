import React, { useState } from "react";
import FormCard from "../components/FormCard";
import axios from "axios";
import { Button, Box, FormControl, Grid, TextField } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const CreateUser = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    if (password.length <= 6) {
      alert("Password should be more than 6 characters.");
      return;
    }

    setTimeout(() => {
      setVisible(true);
    }, 3000);
    setVisible(false);

    try {
      const response = await axios.post("/register", {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Register">
      <FormCard title="Register Here">
        <form onSubmit={CreateUser}>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl variant="standard">
              <TextField
                id="input-with-icon-adornment"
                margin="normal"
                size="small"
                fullWidth
                label="Username"
                variant="standard"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              variant="standard"
              sx={{ mt: 2 }}
              justifyContent="center"
            >
              <TextField
                id="input-with-icon-adornment"
                margin="normal"
                size="small"
                fullWidth
                label="Password"
                type="password"
                variant="standard"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            {visible ? (
              <Button variant="contained" size="medium" type="submit">
                Register
              </Button>
            ) : (
              <Box
                sx={{
                  color: "blue",
                  mt: 1,
                  fontSize: 17,
                  fontStyle: "italic",
                  border: 2,
                  borderColor: "green",
                }}
              >
                <p>
                  Congratulations, your account has &nbsp; <br></br> &nbsp;
                  &nbsp; &nbsp;been successfully created..!!
                </p>
              </Box>
            )}
          </Box>
        </form>
      </FormCard>
    </div>
  );
};

export default Register;

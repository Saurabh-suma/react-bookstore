import { Button, Box, FormControl, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FormCard from "../components/FormCard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const UserLogin = async (e) => {
    e.preventDefault();

    try {
      setErrors({});
      const response = await axios.post("/login", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data);
      navigate("/");
    } catch (error) {
      setErrors(error?.response?.data);
    }
  };

  return (
    <div className="Login">
      <FormCard title="Login Here">
        <form onSubmit={UserLogin}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl variant="standard">
              <TextField
                id="input-with-icon-adornment"
                margin="normal"
                size="small"
                fullWidth
                label="Username"
                variant="standard"
                error={errors?.email}
                helperText={errors?.email}
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
                error={errors?.password}
                helperText={errors?.password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" size="medium" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </FormCard>
    </div>
  );
};

export default Login;

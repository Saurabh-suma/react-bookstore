import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const NavBar = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton sx={{ size: "12" }}>
            <AddShoppingCartIcon color="white" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink
              component={NavLink}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Book Store
            </NavLink>
          </Typography>

          {token ? (
            <div>
              <Button component={NavLink} to="/authors" color="inherit">
                Authors
              </Button>

              <Button component={NavLink} to="/genres" color="inherit">
                Genres
              </Button>

              <Button color="inherit" onClick={Logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button component={NavLink} to="/register" color="inherit">
                Register
              </Button>

              <Button component={NavLink} to="/login" color="inherit">
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default NavBar;

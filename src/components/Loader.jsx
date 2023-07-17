import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loader = (props) => {
  const { open } = props;
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;

import { CardContent, CardHeader, Grid, Card } from "@mui/material";
import React from "react";

const FormCard = (props) => {
  const { title, children } = props;
  return (
    <Grid
      container
      justifyContent="centrer"
      alignItems="center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Grid item xs={12} md={8} lg={40}>
        <Card>
          <CardHeader
            title={title}
            sx={{ textAlign: "center", color: "blue" }}
          />
          <CardContent>{children}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FormCard;

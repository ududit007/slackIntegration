import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import Theme from "./Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: Theme.palette.common.blue,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h5">Slack Integration</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

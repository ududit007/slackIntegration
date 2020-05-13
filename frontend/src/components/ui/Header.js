import React from "react";
import { makeStyles, AppBar, Toolbar } from "@material-ui/core";
import Theme from "./Theme";
import { Grid, Typography, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { uiConst } from "../../config/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: Theme.palette.common.black,
    margin: 0,
  },
  icon: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "1em",
      float: "left",
      height: "4em",
      width: "15em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.5em",
      height: "3em",
      width: "12em",
      display: "block",
      margin: "auto",
    },
  },
  toolbar: {
    width: "100%",
    padding: "0",
  },
  header: {
    marginTop: "5px",
    marginLeft: "10px",
    color: Theme.palette.common.white,
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      textAlign: "center",
      marginLeft: 0,
    },
  },
  signButton: {
    marginTop: "5px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: "0",
      marginBottom: "0",
    },
  },
  buttons: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root} style={{ margin: 0 }}>
        <CssBaseline />
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant="h3" className={classes.header}>
                Slackyy
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} component={"a"}>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.signButton}>
              {props.showSignIn ? (
                <Button className={classes.buttons}>
                  <a
                    target="_top"
                    href= {uiConst.slackAuthUrl}
                  >
                    <img
                      alt="login with slack"
                      src={uiConst.siginInImageUrl}
                    />
                  </a>
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

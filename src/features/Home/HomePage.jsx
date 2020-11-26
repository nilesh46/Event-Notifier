import { Container, Grid, Hidden, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";
import NavBar from "../NavBar/navbarComponent";
import AuthenticationPanel from "../Panels/AuthenticationPanel";

const styles = {
  root: {},
  Bg: {
    height: "100vh",
    background:
      'url("./assets/HomePage/BGImage.png") no-repeat center center /cover',
  },
  darkOverlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    height: "inherit",
  },
  authPanel: {
    margin: "5rem",
  },
};

class HomePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.Bg}>
          <div className={classes.darkOverlay}>
            <NavBar />
            <Container maxWidth="lg">
              {/* Content */}
              <Grid container spacing={2}>
                <Hidden smDown>
                  <Grid item sm>
                    Left Col
                  </Grid>
                </Hidden>
                <Grid item lg>
                  <div className={classes.authPanel}>
                    <AuthenticationPanel />
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);

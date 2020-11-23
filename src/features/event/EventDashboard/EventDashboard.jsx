import { Grid, makeStyles } from "@material-ui/core";
import React, { Component } from "react";
import EventList from "../EventList/EventList";

class EventDashboard extends Component {
  render() {
    const classes = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={8}>
            <EventList />
          </Grid>
          <Grid item sm={4}>
            Right
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EventDashboard;

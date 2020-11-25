import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardMedia, Grid, IconButton, withStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import EventAttendee from "./EventAttendee";

const styles = {
  root: {
    minWidth: 275,
    flexGrow: 1,
    padding: 15,
    margin: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    margin: "0.7rem",
    borderRadius: "0.7rem",
  },
};

class EventListItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root} variant="outlined">
        <Grid container spacing={1}>
          {/* Event Details */}
          <Grid item md>
            <CardContent>
              <div className={classes.title} color="textSecondary">
                {/* Date and Time of the event */}
                <Grid container direction="row" alignItems="center">
                  <ScheduleIcon fontSize="small" /> Today , 1:00 PM |{" "}
                  <RoomIcon fontSize="small" />
                  Latur
                </Grid>
              </div>
              <Typography variant="h5" component="h2">
                Event Name
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Hosted by HostName
              </Typography>
              <Typography variant="body2" component="p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore, eum?
              </Typography>
            </CardContent>

            {/* Attendees Avatars */}
            <EventAttendee />
          </Grid>

          {/* Event Image */}
          <Grid item md xs={12}>
            <CardMedia
              className={classes.media}
              image="https://source.unsplash.com/random"
              title="image name"
            ></CardMedia>
          </Grid>
        </Grid>

        {/* Event Action Buttons */}
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(EventListItem);

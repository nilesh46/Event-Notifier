import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

class EventAttendee extends Component {
  render() {
    return (
      <AvatarGroup max={4} style={{ paddingLeft: "10px" }}>
        <Avatar
          alt="Remy Sharp"
          src="https://source.unsplash.com/300x500/?person"
        />
        <Avatar
          alt="Travis Howard"
          src="https://source.unsplash.com/300x500/?person"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://source.unsplash.com/300x500/?person"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://source.unsplash.com/300x500/?person"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://source.unsplash.com/300x500/?person"
        />
      </AvatarGroup>
    );
  }
}

export default EventAttendee;

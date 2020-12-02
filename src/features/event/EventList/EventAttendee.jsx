import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

class EventAttendee extends Component {
	render() {
		const { attendees } = this.props;
		return (
			<AvatarGroup max={4} style={{ paddingLeft: "10px" }}>
				{attendees &&
					Object.values(attendees).map((attendee, index) => (
						<Avatar
							alt="Remy Sharp"
							key={index}
							src={attendee.photoURL}
						/>
					))}
			</AvatarGroup>
		);
	}
}

export default EventAttendee;

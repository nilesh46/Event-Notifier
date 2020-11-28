import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

class EventAttendee extends Component {
	render() {
		const { attendees } = this.props;
		return (
			<AvatarGroup max={4} style={{ paddingLeft: "10px" }}>
				{attendees &&
					attendees.map((attendee) => (
						<Avatar
							alt="Remy Sharp"
							key={attendee.id}
							src={attendee.photoURL}
						/>
					))}
			</AvatarGroup>
		);
	}
}

export default EventAttendee;

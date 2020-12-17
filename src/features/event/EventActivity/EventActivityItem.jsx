import React from "react";
import {
	Avatar,
	Link,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@material-ui/core";
import { formatDistance } from "date-fns";

const EventActivityItem = ({ activity }) => {
	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt={activity.hostedBy} src={activity.hostPhotoURL} />
			</ListItemAvatar>
			<ListItemText
				primary={
					<>
						{activity.type === "newEvent"
							? "New Event!"
							: "Event Updated!"}{" "}
						<Link href={`profile/${activity.hostUid}`}>
							{activity.hostedBy}
						</Link>{" "}
						{activity.type === "newEvent"
							? "is hosting"
							: "has updated"}{" "}
						<Link href={`events/${activity.eventId}`}>
							{activity.title}
						</Link>
					</>
				}
				secondary={
					<span>
						{formatDistance(
							activity.timestamp && activity.timestamp.toDate(),
							Date.now()
						)}{" "}
						ago
					</span>
				}
			></ListItemText>
		</ListItem>
	);
};

export default EventActivityItem;

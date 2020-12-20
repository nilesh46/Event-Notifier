import React from "react";
import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { formatDistance } from "date-fns";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	linksSec: {
		textDecoration: "none",
		color: "#f50057",
	},
}));

const EventActivityItem = ({ activity }) => {
	const classes = useStyles();
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar alt={activity.hostedBy} src={activity.hostPhotoURL} />
			</ListItemAvatar>
			<ListItemText
				primary={
					<>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{activity.type === "newEvent"
								? "New Event!"
								: activity.type === "updatedEvent"
								? "Event Updated!"
								: "Event Deleted!"}{" "}
							<strong>
								<Link
									to={`/profile/${activity.hostUid}`}
									className={classes.linksSec}
								>
									{activity.hostedBy}
								</Link>
							</strong>{" "}
							{activity.type === "newEvent"
								? "is hosting"
								: activity.type === "updatedEvent"
								? "has updated"
								: "has deleted"}{" "}
							<strong>
								<Link
									to={`/events/${activity.eventId}`}
									className={classes.linksSec}
								>
									{activity.title}
								</Link>
							</strong>
						</Typography>
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

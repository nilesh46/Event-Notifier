import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Paper, Typography } from "@material-ui/core";
import EventActivityItem from "./EventActivityItem";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "100rem",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
	paper: {
		margin: "2rem",
	},
	heading: {
		marginLeft: "1.5rem",
	},
}));

const EventActivity = ({ activities }) => {
	const classes = useStyles();

	return (
		<Paper
			elevation={1}
			className={classes.paper}
			style={{ position: "fixed" }}
		>
			<List className={classes.root}>
				<Typography
					variant="h6"
					color="textSecondary"
					className={classes.heading}
				>
					Recent Activity
				</Typography>
				<Divider />
				{activities &&
					activities.map((activity) => (
						<EventActivityItem
							key={activity.id}
							activity={activity}
						/>
					))}
			</List>
		</Paper>
	);
};

export default EventActivity;

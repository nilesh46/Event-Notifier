import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Box, Divider, Paper, Typography } from "@material-ui/core";
import EventActivityItem from "./EventActivityItem";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "2rem",
		"@media (min-width:960px)": {
			position: "fixed",
		},
	},
	inline: {
		display: "inline",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
	},
	heading: {
		marginLeft: "1.5rem",
	},
}));

const EventActivity = ({ activities }) => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Paper elevation={1} className={classes.paper}>
				<List>
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
		</Box>
	);
};

export default EventActivity;

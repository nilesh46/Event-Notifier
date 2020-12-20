import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {
	Collapse,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Ballot } from "@material-ui/icons";
import EventActivityItem from "./EventActivityItem";
import indigo from "@material-ui/core/colors/indigo";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "1rem",
	},
	listItem: {
		color: theme.palette.getContrastText(indigo[500]),
		backgroundColor: indigo[500],
		width: "100%",
		"&:hover": {
			backgroundColor: indigo[600],
		},
	},
}));

const EventActivity = ({ activities }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List className={classes.root}>
			<ListItem button onClick={handleClick} className={classes.listItem}>
				<ListItemIcon>
					<Ballot fontSize="large" style={{ color: "#FFF" }} />
				</ListItemIcon>
				<ListItemText>
					<Typography component="h1" variant="h6">
						<strong>Recent Activity</strong>
					</Typography>
				</ListItemText>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			<Collapse in={open} timeout="auto" unmountOnExit>
				{activities &&
					activities.map((activity) => (
						<EventActivityItem
							key={activity.id}
							activity={activity}
						/>
					))}
			</Collapse>
		</List>
	);
};

export default EventActivity;

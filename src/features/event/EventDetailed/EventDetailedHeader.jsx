import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { deepOrange } from "@material-ui/core/colors";
import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const styles = (theme) => ({
	root: {
		marginTop: "1rem",
		marginBottom: "1rem",
		backgroundColor: "#F5F5F5",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	avatar: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	btn: {
		marginLeft: "0.3rem",
		marginRight: "0.3rem",
	},
});

class EventDetailedHeader extends Component {
	render() {
		const { classes } = this.props;
		const { event } = this.props;
		return (
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar
							alt="Host Name"
							src={event.hostPhotoURL}
							className={classes.avatar}
						></Avatar>
					}
					title={event.title}
					subheader={`${
						event.date &&
						format(event.date.toDate(), "EEEE do, LLL")
					} at ${format(event.date.toDate(), "h:mm a")}`}
				/>
				<CardMedia
					className={classes.media}
					image="https://source.unsplash.com/1600x900/?gaming"
					title="Image Title"
				/>
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Hosted By <strong>{event.hostedBy}</strong>
					</Typography>
					<Box
						display="flex"
						justifyContent="space-between"
						mt="0.5rem"
					>
						<Box>
							<Button
								variant="contained"
								size="small"
								className={classes.btn}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								size="small"
								color="primary"
								className={classes.btn}
							>
								Join
							</Button>
						</Box>
						<Box>
							<Button
								variant="outlined"
								size="small"
								color="secondary"
								className={classes.btn}
								component={Link}
								to={`/manage/${event.id}`}
							>
								Manage
							</Button>
						</Box>
					</Box>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(EventDetailedHeader);

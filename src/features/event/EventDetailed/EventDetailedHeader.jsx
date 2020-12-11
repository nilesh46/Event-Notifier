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
import { cancelJoiningEvent, joinEvent } from "../../../redux/actions";
import { connect } from "react-redux";
import noImage from "../../../Assets/noImage.svg";
import { openModal } from "../../../redux/actions";

const styles = (theme) => ({
	root: {
		marginTop: "1rem",
		marginBottom: "1rem",
		backgroundColor: "#F5F5F5",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		cursor: "pointer",
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
	openImageOnFullScreen = (photo) => {
		const { openModal } = this.props;
		openModal("ImageModal", { photo });
	};

	render() {
		const {
			classes,
			event,
			isGoing,
			isHost,
			joinEvent,
			cancelJoiningEvent,
		} = this.props;

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
					image={event.photoURL || noImage}
					title="Image Title"
					onClick={() =>
						this.openImageOnFullScreen({
							url: event.photoURL,
							name: event.title,
						})
					}
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
						{!isHost && (
							<Box>
								{isGoing && (
									<Button
										variant="contained"
										size="small"
										className={classes.btn}
										onClick={() => {
											cancelJoiningEvent(event);
										}}
									>
										Cancel My Seat
									</Button>
								)}
								{!isGoing && (
									<Button
										variant="contained"
										size="small"
										color="primary"
										className={classes.btn}
										onClick={() => {
											joinEvent(event);
										}}
									>
										Join This Event
									</Button>
								)}
							</Box>
						)}
						{isHost && (
							<Box>
								<Button
									variant="outlined"
									size="small"
									color="secondary"
									className={classes.btn}
									component={Link}
									to={`/manage/${event.id}`}
								>
									Manage This Event
								</Button>
							</Box>
						)}
						{isHost && (
							<Box>
								<Button
									variant="outlined"
									size="small"
									color="secondary"
									className={classes.btn}
									component={Link}
									to={`/setPhoto/${event.id}`}
								>
									Set Photo
								</Button>
							</Box>
						)}
					</Box>
				</CardContent>
			</Card>
		);
	}
}

const actions = {
	joinEvent,
	cancelJoiningEvent,
	openModal,
};

export default connect(null, actions)(withStyles(styles)(EventDetailedHeader));

import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
	Box,
	CardMedia,
	Divider,
	Grid,
	IconButton,
	withStyles,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import EventAttendee from "./EventAttendee";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, deleteEvent } from "../../../redux/actions";
import { format } from "date-fns";
import noImage from "../../../Assets/noImage.svg";

const styles = {
	root: {
		minWidth: "15rem",
		maxWidth: "50rem",
		padding: 15,
		margin: 20,
	},

	pos: {
		marginBottom: "1.5rem",
		marginLeft: "1rem",
	},

	heading: {
		fontSize: "1.1rem",
		marginLeft: "1rem",
	},
	media: {
		height: 0,
		paddingTop: "56.25%",
		margin: "0.7rem",
		borderRadius: "0.7rem",
		marginBottom: "1rem",
	},
	large: {
		height: "4.5rem",
		width: "4.5rem",
	},
	linksPri: {
		textDecoration: "none",
		color: "#2196f3",
	},
};

class EventListItem extends Component {
	handleDeleteEvent = () => {
		const { event, deleteEvent, openModal } = this.props;
		openModal("AlertModal", {
			title: "Delete this Event ?",
			description:
				"Deleting this event from here will remove it completely from your account. All the current attendees will be removed and will get notifications of so.",
			agreeBtnText: "Delete",
			disagreeBtnText: "Cancel",
			action: () => {
				deleteEvent(event.id);
			},
		});
	};

	handleShare = () => {
		const { event, openModal } = this.props;
		openModal("SocialShareModal", {
			event: event,
			url: window.location.href,
		});
	};

	render() {
		const { classes } = this.props;
		const { event } = this.props;

		return (
			<Card className={classes.root} variant="outlined">
				{/* Event Image */}
				<Grid item md xs={12}>
					<CardMedia
						className={classes.media}
						image={event.photoURL || noImage}
						title="image name"
					></CardMedia>
				</Grid>
				<Grid container spacing={1}>
					{/* Event Details */}

					<Grid item md>
						<CardContent>
							<Grid
								container
								direction="column"
								alignItems="flex-start"
							>
								<Grid item>
									<Box display="flex" alignItems="center">
										<Box>
											<Link
												to={`/profile/${event.hostUid}`}
											>
												<Avatar
													alt="Remy Sharp"
													src={event.hostPhotoURL}
													className={classes.large}
												/>
											</Link>
										</Box>
										<Box ml="1rem">
											<Typography
												variant="body1"
												color="textPrimary"
											>
												{event.title}
											</Typography>

											<Typography
												variant="body2"
												color="textSecondary"
											>
												Hosted by{" "}
												<Link
													to={`/profile/${event.hostUid}`}
													className={classes.linksPri}
												>
													{" "}
													{event.hostedBy}
												</Link>
											</Typography>
										</Box>
									</Box>
								</Grid>

								<Box>
									{/* Date and Time of the event */}
									<Box
										display="flex"
										alignItems="center"
										my="0.5rem"
									>
										<ScheduleIcon fontSize="small" />

										<Box mx="0.5rem">
											<Typography color="textSecondary">
												{format(
													event.date.toDate(),
													"EEEE do, LLL"
												)}{" "}
												at{" "}
												{format(
													event.date.toDate(),
													"h:mm a"
												)}
											</Typography>
										</Box>
									</Box>
									<Divider />
									{/* Location of the event */}
									<Box
										display="flex"
										alignItems="center"
										my="0.5rem"
									>
										<RoomIcon fontSize="small" />
										{!event.location && (
											<Box mx="0.5rem">
												<Typography color="textSecondary">
													{event.AddressLine1}
												</Typography>
											</Box>
										)}
										{event.location && (
											<Box mx="0.5rem">
												<Typography color="textSecondary">
													{event.location.placeName}
												</Typography>
											</Box>
										)}
									</Box>
								</Box>
							</Grid>
							<Typography variant="body2" component="p">
								{event.description}
							</Typography>
						</CardContent>

						{/* Attendees Avatars */}
						<EventAttendee attendees={event.attendees} />
					</Grid>
				</Grid>

				{/* Event Action Buttons */}
				<CardActions>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share" onClick={this.handleShare}>
						<ShareIcon />
					</IconButton>
					<Button
						size="small"
						component={Link}
						to={`/events/${event.id}`}
					>
						View
					</Button>
					<Button
						size="small"
						color="secondary"
						onClick={this.handleDeleteEvent}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		);
	}
}

const ComponentWithStyles = withStyles(styles)(EventListItem);
const actions = {
	openModal,
	deleteEvent,
};

export default connect(null, actions)(ComponentWithStyles);

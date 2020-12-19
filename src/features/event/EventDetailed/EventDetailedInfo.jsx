import {
	Box,
	Button,
	Collapse,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	Paper,
	Typography,
	withStyles,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import React, { Component } from "react";
import Mapbox from "../../Maps/Mapbox";
import HttpIcon from "@material-ui/icons/Http";
import { format } from "date-fns";

const style = (theme) => ({
	root: {
		backgroundColor: "",
	},
	btn: {
		marginLeft: "0.3rem",
		marginRight: "0.3rem",
	},
	dib: {
		display: "inline-block",
	},
	map: {
		height: "40vh",
		width: "90%",
		margin: "auto",
	},
});

class EventDetailedInfo extends Component {
	state = { openMap: false };

	handleMapBtnClick = () => {
		this.setState({ openMap: !this.state.openMap });
	};

	render() {
		const { classes } = this.props;
		const { event } = this.props;
		const { openMap } = this.state;
		return (
			<List className={classes.root}>
				<ListItem>
					<ListItemIcon>
						<InfoOutlinedIcon color="disabled" />
					</ListItemIcon>
					<Typography
						variant="body1"
						color="textPrimary"
						component={"div"}
					>
						Description of the event
						<Typography variant="body2" color="textSecondary">
							{event.description}
						</Typography>
					</Typography>
				</ListItem>
				<Divider />
				{event.onlineEventSwitch && (event.link1 || event.link2) && (
					<div>
						<ListItem>
							<ListItemIcon>
								<HttpIcon color="disabled" />
							</ListItemIcon>
							<Typography
								variant="body1"
								color="textPrimary"
								component={"div"}
							>
								Links
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{event.link1 && (
										<Box mb="0.5rem">
											LiveStream URL :{" "}
											<a
												href={event.link1}
												target="_blank"
												rel="noreferrer"
											>
												{event.link1}
											</a>
										</Box>
									)}
									<Divider />
									{event.link2 && (
										<Box mt="0.5rem">
											Webinar URL :{" "}
											<a
												href={event.link2}
												target="_blank"
												rel="noreferrer"
											>
												{event.link2}
											</a>
										</Box>
									)}
								</Typography>
							</Typography>
						</ListItem>

						<Divider />
					</div>
				)}
				<ListItem>
					<ListItemIcon>
						<EventOutlinedIcon color="disabled" />
					</ListItemIcon>
					<Typography
						variant="body1"
						color="textPrimary"
						component={"div"}
					>
						Event Date and Timing
						<Typography variant="body2" color="textSecondary">
							<strong>Date</strong> :{" "}
							{format(event.date.toDate(), "EEEE do, LLL, yyyy")}{" "}
							<br /> <strong>Timing</strong> :
							{format(event.date.toDate(), "h:mm a")}
						</Typography>
					</Typography>
				</ListItem>

				<Divider />
				<ListItem>
					<ListItemIcon>
						<CategoryOutlinedIcon color="disabled" />
					</ListItemIcon>
					<Typography
						variant="body1"
						color="textPrimary"
						component={"div"}
					>
						{event.category}
					</Typography>
				</ListItem>

				<Divider />
				<ListItem>
					<ListItemIcon>
						<LocationOnOutlinedIcon color="disabled" />
					</ListItemIcon>
					<Box
						display="flex"
						justifyContent="space-between"
						style={{ width: "100%" }}
					>
						<Box style={{ width: "50%" }}>
							<Typography
								variant="body1"
								color="textPrimary"
								component={"div"}
							>
								Event Venue
								{event.mapSwitch && event.location && (
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{event.location.placeName}
									</Typography>
								)}
								{!event.mapSwitch && (
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{event.AddressLine1}
										<br />
										{event.AddressLine2}
									</Typography>
								)}
							</Typography>
						</Box>
						{event.mapSwitch && event.location && (
							<Box>
								<Button
									variant="outlined"
									size="small"
									color="secondary"
									onClick={this.handleMapBtnClick}
									className={classes.btn}
								>
									{!openMap ? "View Map" : "Hide Map"}
								</Button>
							</Box>
						)}
					</Box>
				</ListItem>
				<Collapse in={this.state.openMap} timeout="auto" unmountOnExit>
					<Box className={classes.map}>
						<Paper
							elevation={3}
							style={{ height: "100%", width: "100%" }}
						>
							{event.location && (
								<Mapbox
									lng={event.location.center[0]}
									lat={event.location.center[1]}
									zoom="12"
								/>
							)}
						</Paper>
					</Box>
				</Collapse>
			</List>
		);
	}
}
export default withStyles(style)(EventDetailedInfo);

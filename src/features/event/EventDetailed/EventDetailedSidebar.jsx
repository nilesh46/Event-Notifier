import {
	Avatar,
	Box,
	Chip,
	Collapse,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	withStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import React, { Component } from "react";
import indigo from "@material-ui/core/colors/indigo";

const style = (theme) => ({
	root: {
		marginTop: "1rem",
		marginBottom: "1rem",
	},
	attendee: {
		color: theme.palette.getContrastText(indigo[500]),
		backgroundColor: indigo[500],
		width: "100%",
		"&:hover": {
			backgroundColor: indigo[600],
		},
	},
});

class EventDetailedSidebar extends Component {
	state = { open: false };

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};
	render() {
		const { classes, attendees } = this.props;
		const host = attendees.find((a) => a.host);

		return (
			<List className={classes.root}>
				<ListItem
					button
					onClick={this.handleClick}
					className={classes.attendee}
				>
					<ListItemIcon>
						<GroupIcon style={{ color: "#FFF" }} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="body1">
							<strong>{attendees && attendees.length}</strong>
							{attendees && attendees.length === 1
								? " Person is "
								: " People are "}
							Going
						</Typography>
					</ListItemText>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<Box style={{ height: "40vh", overflowY: "auto" }}>
						<List component="div" disablePadding>
							{
								<div key={host.id}>
									<ListItem button className={classes.nested}>
										<ListItemIcon>
											<Avatar
												alt={host.displayName}
												src={host.photoURL}
											/>
										</ListItemIcon>
										<ListItemText>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												<strong>
													{host.displayName}
												</strong>
											</Typography>
										</ListItemText>

										<Chip label="HOST" color="secondary" />
									</ListItem>

									<Divider />
								</div>
							}
							{attendees.map((attendee) => {
								if (!attendee.host)
									return (
										<div key={attendee.id}>
											<ListItem
												button
												className={classes.nested}
											>
												<ListItemIcon>
													<Avatar
														alt={
															attendee.displayName
														}
														src={attendee.photoURL}
													/>
												</ListItemIcon>
												<ListItemText>
													<Typography
														variant="body2"
														color="textSecondary"
													>
														<strong>
															{
																attendee.displayName
															}
														</strong>
													</Typography>
												</ListItemText>
											</ListItem>

											<Divider />
										</div>
									);
								return <></>;
							})}
						</List>
					</Box>
				</Collapse>
			</List>
		);
	}
}

export default withStyles(style)(EventDetailedSidebar);

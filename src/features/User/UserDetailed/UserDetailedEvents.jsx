import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EventsGridList from "../../Menus/EventsGridList";
import { Paper } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
};

const Styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
});

const events = [
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
	{
		img: "https://source.unsplash.com/random",
		title: "event",
		hostedBy: "Username",
	},
];

class UserDetailedEvents extends Component {
	state = { value: 0 };

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	render() {
		const { classes } = this.props;

		return (
			<Box mb="1rem">
				<Paper elevation={2}>
					<Box py="1rem" pl="1rem">
						<Box mb="1rem" display="flex" alignItems="center">
							<EventNoteIcon fontSize="large" />
							<Typography variant="body1">
								<b>Events</b>
							</Typography>
						</Box>
						<div className={classes.root}>
							<Box>
								<Tabs
									orientation="vertical"
									variant="scrollable"
									value={this.state.value}
									onChange={this.handleChange}
									aria-label="Vertical tabs example"
									className={classes.tabs}
								>
									<Tab label="All Events" {...a11yProps(0)} />
									<Tab
										label="Past Events"
										{...a11yProps(1)}
									/>
									<Tab
										label="Future Events"
										{...a11yProps(2)}
									/>
									<Tab
										label="Events Hosted"
										{...a11yProps(3)}
									/>
								</Tabs>
							</Box>
							<TabPanel value={this.state.value} index={0}>
								<EventsGridList
									events={events}
									header="All Events"
								/>
							</TabPanel>
							<TabPanel value={this.state.value} index={1}>
								<EventsGridList
									events={events}
									header="Past Events"
								/>
							</TabPanel>
							<TabPanel value={this.state.value} index={2}>
								<EventsGridList
									events={events}
									header="Future Events"
								/>
							</TabPanel>
							<TabPanel value={this.state.value} index={3}>
								<EventsGridList
									events={events}
									header="Events Hosted"
								/>
							</TabPanel>
						</div>
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default withStyles(Styles)(UserDetailedEvents);

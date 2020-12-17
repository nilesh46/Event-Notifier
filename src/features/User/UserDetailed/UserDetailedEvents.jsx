import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EventsGridList from "../../Menus/EventsGridList";
import { Paper } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { getUserEvents } from "../../../redux/actions";
import { connect } from "react-redux";

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
			width="100%"
		>
			{value === index && <Box px={3}>{children}</Box>}
		</Box>
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
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		width: "100%",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
});

class UserDetailedEvents extends Component {
	state = { value: 0 };

	componentDidMount() {
		const { getUserEvents, user } = this.props;
		getUserEvents(user.uid);
	}

	handleChange = (event, newValue) => {
		const { getUserEvents, user } = this.props;
		this.setState({ value: newValue });
		getUserEvents(user.uid, newValue);
	};

	render() {
		const { classes, events, loading } = this.props;

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
						<Box className={classes.root}>
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
							<Box flexGrow="1">
								<TabPanel value={this.state.value} index={0}>
									<EventsGridList
										events={events}
										header="All Events"
										loading={loading}
									/>
								</TabPanel>

								<TabPanel value={this.state.value} index={1}>
									<EventsGridList
										events={events}
										header="Past Events"
										loading={loading}
									/>
								</TabPanel>
								<TabPanel value={this.state.value} index={2}>
									<EventsGridList
										events={events}
										header="Future Events"
										loading={loading}
									/>
								</TabPanel>
								<TabPanel value={this.state.value} index={3}>
									<EventsGridList
										events={events}
										header="Events Hosted"
										loading={loading}
									/>
								</TabPanel>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
		);
	}
}

const actions = {
	getUserEvents,
};

const mapStateToProps = (state) => {
	return { events: state.events, loading: state.async.loading };
};

export default connect(
	mapStateToProps,
	actions
)(withStyles(Styles)(UserDetailedEvents));

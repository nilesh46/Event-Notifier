import { Grid, makeStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import { createEvent, updateEvent } from "../../../redux/actions";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { firestoreConnect } from "react-redux-firebase";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class EventDashboard extends Component {
	render() {
		const classes = makeStyles((theme) => ({
			root: {
				flexGrow: 1,
			},
		}));

		const { events, loading } = this.props;

		if (loading) {
			return <LoadingComponent />;
		}
		return (
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item md={8} xs={12}>
						<EventList events={events} />
					</Grid>
					<Grid item md={4} xs={12}>
						<h1>Recent Activity</h1>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	events: state.firestore.ordered.events,
	loading: state.async.loading,
});

const actions = {
	createEvent,
	updateEvent,
};

EventDashboard = firestoreConnect([
	{
		collection: "events",
	},
])(EventDashboard);

export default connect(
	mapStateToProps,
	actions
)(withStyles(style)(EventDashboard));

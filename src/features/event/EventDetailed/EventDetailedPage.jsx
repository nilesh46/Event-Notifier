import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

const EventDetailedPage = ({ event }) => {
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12}>
					<EventDetailedHeader event={event} />
					<EventDetailedInfo event={event} />
				</Grid>
				<Grid item md xs={12}>
					<EventDetailedSidebar attendees={event.attendees} />
				</Grid>
				<Grid item md={8} xs={12}>
					<EventDetailedChat />
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	// If there is no event for specific event id, then it will show nothing instead of an error
	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0];
	}

	return {
		event,
	};
};

export default connect(mapStateToProps)(EventDetailedPage);

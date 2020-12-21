import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect, getFirebase, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { createDataTree } from "../../../App/Util/helpers";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedPageSkeleton from "./EventDetailedPageSkeleton";
import EventDetailedSidebar from "./EventDetailedSidebar";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class EventDetailedPage extends Component {
	state = { event: null, unsubscribe: null };

	componentDidMount = () => {
		const eventId = this.props.match.params.id;
		const firestore = getFirebase().firestore();

		const unsubscribe = firestore
			.collection("events")
			.doc(eventId)
			.onSnapshot((doc) => {
				this.setState({ event: { id: eventId, ...doc.data() } });
			});

		this.setState({ unsubscribe });
	};

	componentWillUnmount = () => {
		this.state.unsubscribe();
	};

	render() {
		const { event } = this.state;
		const { auth, eventChat } = this.props;
		const attendees =
			event && event.attendees && Object.values(event.attendees);
		const isHost = event && event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some((a) => a.id === auth.uid);
		const eventChatTree = eventChat && createDataTree(eventChat);

		return (
			<>
				{event === null && <EventDetailedPageSkeleton />}
				{event === undefined && (
					<Box textAlign="center" my="3rem">
						<Typography component="h1" variant="h5">
							Please check your url or go back and try again
						</Typography>
					</Box>
				)}
				{event && (
					<div>
						<Grid container spacing={3}>
							<Grid item md={8} xs={12}>
								<EventDetailedHeader
									event={event}
									isHost={isHost}
									isGoing={isGoing}
								/>
								<EventDetailedInfo event={event} />
							</Grid>
							<Grid item md xs={12}>
								<EventDetailedSidebar attendees={attendees} />
							</Grid>
							<Grid item md={8} xs={12}>
								<EventDetailedChat
									eventId={event.id}
									eventChat={eventChatTree}
									userId={auth.uid}
								/>
							</Grid>
						</Grid>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth,
		eventChat:
			!isEmpty(state.firebase.data.event_chat) &&
			state.firebase.data.event_chat[ownProps.match.params.id] &&
			Object.values(
				state.firebase.data.event_chat[ownProps.match.params.id]
			),
	};
};

export default compose(
	connect(mapStateToProps),
	firebaseConnect((props) => [`event_chat/${props.match.params.id}`])
)(withStyles(style)(EventDetailedPage));

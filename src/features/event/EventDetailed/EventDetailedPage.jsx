import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

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
		const { auth } = this.props;

		const attendees =
			event && event.attendees && Object.values(event.attendees);
		const isHost = event && event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

		return (
			<>
				{event === null && <LoadingComponent />}
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
								<EventDetailedChat />
							</Grid>
						</Grid>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(EventDetailedPage);

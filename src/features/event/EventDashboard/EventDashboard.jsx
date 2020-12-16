import { Grid, makeStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../../../redux/actions";
import { firestoreConnect } from "react-redux-firebase";
import EventListItemSkeleton from "../EventList/EventListItemSkeleton";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class EventDashboard extends Component {
	state = {
		moreEvents: false,
		loadingInitial: true,
		loadedEvents: [],
	};

	async componentDidMount() {
		const { getEventsForDashboard } = this.props;
		const next = await getEventsForDashboard();

		if (next && next.docs && next.docs.length > 0) {
			this.setState({
				moreEvents: true,
				loadingInitial: false,
			});
		}
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.events !== prevProps.events) {
			this.setState({
				loadedEvents: [
					...this.state.loadedEvents,
					...this.props.events,
				],
			});
		}
	};

	getNextEvents = async () => {
		const { events, getEventsForDashboard } = this.props;
		let lastEvent = events && events[events.length - 1];
		const next = await getEventsForDashboard(lastEvent);
		if (next && next.docs && next.docs.length < 1) {
			this.setState({
				moreEvents: false,
			});
		}
	};

	render() {
		const classes = makeStyles((theme) => ({
			root: {
				flexGrow: 1,
			},
		}));

		const { loading } = this.props;
		const { loadedEvents, moreEvents } = this.state;

		if (this.state.loadingInitial) {
			return (
				<>
					{[...new Array(5)].map((obj, index) => {
						return <EventListItemSkeleton key={index} />;
					})}
				</>
			);
		}
		return (
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item md={8} xs={12}>
						<EventList
							events={loadedEvents}
							getNextEvents={this.getNextEvents}
							moreEvents={moreEvents}
							loading={loading}
						/>
						{loading &&
							[...new Array(1)].map((obj, index) => {
								return <EventListItemSkeleton key={index} />;
							})}
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
	events: state.events,
	loading: state.async.loading,
});

const actions = {
	getEventsForDashboard,
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

import { Grid, makeStyles, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../../../redux/actions";
import { firestoreConnect } from "react-redux-firebase";
import EventListItemSkeleton from "../EventList/EventListItemSkeleton";
import EventActivity from "../EventActivity/EventActivity";

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
			});
		}
		this.setState({ loadingInitial: false });
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

		const { loading, activities } = this.props;
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
				<Grid container spacing={2}>
					<Grid item lg={7} md={8} xs={12}>
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

					<Grid item lg={5} md={4} xs={12}>
						<EventActivity activities={activities} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

const query = [
	{
		collection: "activity",
		orderBy: ["timestamp", "desc"],
		limit: 5,
	},
];

const mapStateToProps = (state) => ({
	events: state.events,
	loading: state.async.loading,
	activities: state.firestore.ordered.activity,
});

const actions = {
	getEventsForDashboard,
};

EventDashboard = firestoreConnect(query)(EventDashboard);

export default connect(
	mapStateToProps,
	actions
)(withStyles(style)(EventDashboard));

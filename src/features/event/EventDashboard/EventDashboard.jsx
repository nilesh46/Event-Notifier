import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../../../redux/actions";
import { getFirebase } from "react-redux-firebase";
import EventListItemSkeleton from "../EventList/EventListItemSkeleton";
import EventActivity from "../EventActivity/EventActivity";
import EventFilterForm from "../Event Filters/EventFilterForm";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	grid: {
		"@media (max-width:960px)": {
			flexDirection: "column-reverse",
		},
	},
	stickyItem: {
		// "@media (min-width:960px)": {
		// 	position: "fixed",
		// 	height: "max-content",
		// 	top: "5rem",
		// 	right: "2rem",
		// },
	},
};

class EventDashboard extends Component {
	state = {
		moreEvents: false,
		loadingInitial: true,
		loadedEvents: [],
		fromDate: null,
		orderBy: null,
		unsubscribe: null,
		activities: [],
	};

	getEventsAtTheStart = async (date, sort) => {
		this.setState({ loadedEvents: [] });
		const { getEventsForDashboard } = this.props;
		const next = await getEventsForDashboard(null, date, sort);

		if (next && next.docs && next.docs.length > 0) {
			this.setState({
				moreEvents: true,
			});
		}
		this.setState({ loadingInitial: false });
	};

	getEventActivity = () => {
		const firestore = getFirebase().firestore();

		const unsubscribe = firestore
			.collection("activity")
			.orderBy("timestamp", "desc")
			.onSnapshot((querySnap) => {
				let arr = [];
				querySnap.forEach(function (doc) {
					arr.push({ id: doc.id, ...doc.data() });
				});
				this.setState({ activities: arr });
			});

		this.setState({ unsubscribe });
	};

	componentDidMount() {
		this.getEventActivity();
		this.getEventsAtTheStart();
	}

	componentWillUnmount = () => {
		this.state.unsubscribe();
	};

	componentDidUpdate = (prevProps) => {
		if (this.props.events !== prevProps.events) {
			let setIds = new Set();
			let events = [];
			let buffer = [...this.state.loadedEvents, ...this.props.events];
			for (let index = 0; index < this.state.loadedEvents.length; index++)
				setIds.add(this.state.loadedEvents[index].id);

			for (let index = 0; index < this.props.events.length; index++)
				setIds.add(this.props.events[index].id);

			setIds.forEach((id) => {
				for (let index = 0; index < buffer.length; index++)
					if (buffer[index].id === id) {
						events.push(buffer[index]);
						break;
					}
			});

			this.setState({
				loadedEvents: events,
			});
		}
	};

	getNextEvents = async () => {
		const { events, getEventsForDashboard } = this.props;
		let lastEvent = events && events[events.length - 1];
		const next = await getEventsForDashboard(
			lastEvent,
			this.state.fromDate,
			this.state.orderBy
		);
		if (next && next.docs && next.docs.length < 1) {
			this.setState({
				moreEvents: false,
			});
		}
	};

	render() {
		const { classes, loading } = this.props;
		const { loadedEvents, moreEvents, activities } = this.state;

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
				<Grid container spacing={2} className={classes.grid}>
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

					<Grid
						item
						lg={5}
						md={4}
						xs={12}
						className={classes.stickyItem}
					>
						<EventFilterForm
							changeFilter={async (date, sort) => {
								this.setState({
									fromDate: date,
									orderBy: sort,
								});
								this.getEventsAtTheStart(date, sort);
							}}
						/>
						<EventActivity activities={activities} />
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

export default connect(
	mapStateToProps,
	actions
)(withStyles(style)(EventDashboard));

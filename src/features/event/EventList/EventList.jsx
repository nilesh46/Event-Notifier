import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";
import EventListItemSkeleton from "./EventListItemSkeleton";

class EventList extends Component {
	render() {
		const { events } = this.props;

		return (
			<Fragment>
				{!events &&
					[...new Array(5)].map((obj, index) => {
						return <EventListItemSkeleton key={index} />;
					})}
				{events &&
					events.map((event) => (
						<EventListItem key={event.id} event={event} />
					))}
			</Fragment>
		);
	}
}

export default EventList;

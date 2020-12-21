import { Box } from "@material-ui/core";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import EventListItem from "./EventListItem";

class EventList extends Component {
	render() {
		const { events, getNextEvents, moreEvents, loading } = this.props;

		return (
			<Box py="inherit">
				{events && events.length !== 0 && (
					<InfiniteScroll
						pageStart={0}
						loadMore={getNextEvents}
						hasMore={!loading && moreEvents}
						initialLoad={false}
						threshold={0}
					>
						{events.map((event) => (
							<EventListItem key={event.id} event={event} />
						))}
					</InfiniteScroll>
				)}
			</Box>
		);
	}
}

export default EventList;

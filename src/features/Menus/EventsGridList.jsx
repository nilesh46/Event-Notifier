import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import noImage from "../../Assets/noImage.svg";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: "100%",
		height: 200,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

const EventsGridList = ({ header, events, loading }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList cellHeight={180} className={classes.gridList}>
				<GridListTile
					key="Subheader"
					cols={2}
					style={{ height: "auto" }}
				>
					<ListSubheader component="div">{header}</ListSubheader>
				</GridListTile>
				{loading &&
					[...new Array(3)].map((obj, index) => (
						<GridListTile key={index} cols={2}>
							<Skeleton
								animation="wave"
								variant="rect"
								width="100%"
								height={100}
							/>
						</GridListTile>
					))}
				{!loading &&
					events.map((event) => (
						<GridListTile key={event.id} cols={2}>
							<img
								src={event.photoURL || noImage}
								alt={event.title}
							/>

							<GridListTileBar
								title={event.title}
								subtitle={<span>by: {event.hostedBy}</span>}
								actionIcon={
									<Link to={`/events/${event.id}`}>
										<IconButton
											aria-label={`info about ${event.title}`}
											className={classes.icon}
										>
											<InfoIcon />
										</IconButton>
									</Link>
								}
							/>
						</GridListTile>
					))}
			</GridList>
		</div>
	);
};

export default EventsGridList;

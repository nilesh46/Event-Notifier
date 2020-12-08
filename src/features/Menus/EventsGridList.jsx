import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const EventsGridList = ({ header, events }) => {
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
				{events.map((event) => (
					<GridListTile key={event.img} cols={2}>
						<img src={event.img} alt={event.title} />
						<GridListTileBar
							title={event.title}
							subtitle={<span>by: {event.hostedBy}</span>}
							actionIcon={
								<IconButton
									aria-label={`info about ${event.title}`}
									className={classes.icon}
								>
									<InfoIcon />
								</IconButton>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
};

export default EventsGridList;

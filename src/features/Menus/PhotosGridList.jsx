import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { openModal } from "../../redux/actions";
import { connect } from "react-redux";

const styles = (theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
		borderRadius: "10px",
	},
	gridList: {
		width: "100%",
		height: 450,
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)",
	},
	titleBar: {
		background:
			"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
			"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	},
	icon: {
		color: "white",
	},
	photoStyle: {
		width: "100%",
		height: "100%",
		overflowX: "auto",
	},
});

class PhotosGridList extends Component {
	openImageOnFullScreen = (photo) => {
		const { openModal } = this.props;
		openModal("ImageModal", { photo });
	};

	render() {
		const { classes, photos } = this.props;
		return (
			<div className={classes.root}>
				<GridList
					cellHeight={200}
					spacing={1}
					className={classes.gridList}
				>
					{photos.map((photo) => (
						<GridListTile key={photo.photoId} cols={2} rows={1.5}>
							<img
								src={photo.url}
								alt={photo.name}
								className={classes.photoStyle}
								onClick={() => {
									this.openImageOnFullScreen(photo);
								}}
								role="button"
							/>

							<GridListTileBar
								title={photo.title}
								titlePosition="top"
								actionIcon={
									<IconButton
										aria-label={`star ${photo.name}`}
										className={classes.icon}
									>
										<StarBorderIcon />
									</IconButton>
								}
								actionPosition="left"
								className={classes.titleBar}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

const actions = {
	openModal,
};

export default connect(null, actions)(withStyles(styles)(PhotosGridList));

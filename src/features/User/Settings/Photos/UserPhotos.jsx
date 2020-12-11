import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	Chip,
	Divider,
	Grid,
	makeStyles,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "../../../../redux/actions";

const openImageOnFullScreen = (photo, openModal) => {
	openModal("ImageModal", { photo });
};

const useStyles = makeStyles((theme) => ({
	root: {},
	media: {
		height: 0,
		paddingTop: "56.25%",
	},
}));

const UserPhotos = ({
	photos,
	profile,
	handleDeletePhoto,
	handleSetMainPhoto,
	openModal,
}) => {
	let filteredPhotos;
	if (photos) {
		filteredPhotos = photos.filter((photo) => {
			return photo.url !== profile.photoURL;
		});
	}
	const classes = useStyles();
	return (
		<Fragment>
			<Grid direction="row" container spacing={3}>
				<Grid item xs={12} md={3}>
					<Card className={classes.root}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={profile.photoURL}
								title="Profile Photo"
								onClick={() =>
									openImageOnFullScreen(
										{
											url: profile.photoURL,
											name: "profilePhoto",
										},
										openModal
									)
								}
							/>
						</CardActionArea>
						<CardActions>
							<Chip label="Profile Pic" color="primary" />
						</CardActions>
					</Card>
				</Grid>
				{photos &&
					filteredPhotos.map((photo) => {
						return (
							<Grid item key={photo.id} xs={12} md={3}>
								<Card className={classes.root} key={photo.id}>
									<CardActionArea>
										<CardMedia
											className={classes.media}
											image={photo.url}
											onClick={() =>
												openImageOnFullScreen(
													photo,
													openModal
												)
											}
											title="My Photo"
										/>
									</CardActionArea>
									<CardActions>
										<Grid
											direction="row"
											container
											alignItems="center"
										>
											<Grid item>
												<Button
													size="small"
													color="primary"
													onClick={() =>
														handleSetMainPhoto(
															photo.url
														)
													}
												>
													Main Photo
												</Button>
											</Grid>
											<Divider
												orientation="vertical"
												flexItem
											/>
											<Grid item>
												<Button
													size="small"
													color="secondary"
													onClick={() =>
														handleDeletePhoto(
															photo.id,
															photo.name
														)
													}
												>
													Delete
												</Button>
											</Grid>
										</Grid>
									</CardActions>
								</Card>
							</Grid>
						);
					})}
			</Grid>
		</Fragment>
	);
};

const actions = {
	openModal,
};

export default connect(null, actions)(UserPhotos);

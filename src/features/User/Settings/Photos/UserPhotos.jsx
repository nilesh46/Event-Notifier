import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	makeStyles,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { openModal } from "../../../../redux/actions";
import UserPhotosSkelton from "./UserPhotosSkeleton";

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
	loading,
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
								component="span"
							/>
						</CardActionArea>
						<CardActions>
							<Chip label="Profile Pic" color="primary" />
						</CardActions>
					</Card>
				</Grid>
				{!photos && <UserPhotosSkelton />}
				{photos &&
					filteredPhotos.map((photo) => {
						return (
							<Grid item key={photo.id} xs={12} md={3}>
								<Card className={classes.root}>
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
											component="span"
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
													{!loading && (
														<span>Delete</span>
													)}
													{loading && (
														<CircularProgress
															color="inherit"
															size="2rem"
														/>
													)}
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

const mapStateToProps = (state) => {
	return { loading: state.async.loading };
};

export default connect(mapStateToProps, actions)(UserPhotos);

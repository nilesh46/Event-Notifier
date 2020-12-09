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

const useStyles = makeStyles((theme) => ({
	root: {
		width: 200,
	},
	media: {
		height: 200,
	},
}));

const UserPhotos = ({
	photos,
	profile,
	handleDeletePhoto,
	handleSetMainPhoto,
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
				<Grid item>
					<Card className={classes.root}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image={profile.photoURL}
								title="Profile Photo"
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
							<Grid item key={photo.id}>
								<Card className={classes.root} key={photo.id}>
									<CardActionArea>
										<CardMedia
											className={classes.media}
											image={photo.url}
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

export default UserPhotos;

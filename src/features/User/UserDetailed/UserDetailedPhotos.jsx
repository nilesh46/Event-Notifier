import { Box, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import PhotosGridList from "../../Menus/PhotosGridList";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import { getFirebase } from "react-redux-firebase";
import { Skeleton } from "@material-ui/lab";

class UserDetailedPhotos extends Component {
	state = { photos: null, unsubscribe: null };

	async componentDidMount() {
		const { user } = this.props;
		const firestore = getFirebase().firestore();
		try {
			const unsubscribe = await firestore
				.collection("users")
				.doc(`${user.uid}`)
				.collection("photos")
				.onSnapshot((querySnap) => {
					let arr = [];
					querySnap.forEach(function (doc) {
						arr.push({ photoId: doc.id, ...doc.data() });
					});
					this.setState({ photos: arr });
				});

			this.setState({ unsubscribe });
		} catch (error) {}
	}

	componentWillUnmount = () => {
		this.state.unsubscribe();
	};

	render() {
		const photos = this.state.photos;
		return (
			<Box style={{ maxWidth: 800 }}>
				<Paper elevation={2}>
					<Box p="1rem">
						<Box mb="1rem" display="flex" alignItems="center">
							<PhotoAlbumIcon fontSize="large" />
							<Typography variant="body1">
								<b>Gallery</b>
							</Typography>
						</Box>
						{photos === null && (
							<Skeleton animation="wave" height={300} />
						)}
						{photos && <PhotosGridList photos={photos} />}
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default UserDetailedPhotos;

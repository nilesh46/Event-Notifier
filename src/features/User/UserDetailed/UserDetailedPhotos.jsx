import { Box, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import PhotosGridList from "../../Menus/PhotosGridList";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import { getFirebase } from "react-redux-firebase";
import LoadingComponent from "../../../App/Layout/LoadingComponent";

class UserDetailedPhotos extends Component {
	state = { photos: null };

	componentDidMount = () => {
		const { user } = this.props;
		const firestore = getFirebase().firestore();
		firestore
			.collection("users")
			.doc(`${user.id}`)
			.collection("photos")
			.get()
			.then((querySnapshot) => {
				let arr = [];
				querySnapshot.forEach(function (doc) {
					arr.push({ photoId: doc.id, ...doc.data() });
				});
				this.setState({ photos: arr });
			})
			.catch((err) => console.log(err));
	};

	render() {
		const photos = this.state.photos;
		return (
			<Box>
				<Paper elevation={2}>
					<Box p="1rem">
						<Box mb="1rem" display="flex" alignItems="center">
							<PhotoAlbumIcon fontSize="large" />
							<Typography variant="body1">
								<b>About User Displayname</b>
							</Typography>
						</Box>
						{photos === null && <LoadingComponent />}
						{photos && <PhotosGridList photos={photos} />}
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default UserDetailedPhotos;

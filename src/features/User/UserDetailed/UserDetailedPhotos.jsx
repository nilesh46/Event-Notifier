import { Box, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import PhotosGridList from "../../Menus/PhotosGridList";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";

const photos = [
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: true,
	},
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: false,
	},
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: false,
	},
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: false,
	},
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: false,
	},
	{
		img: "https://source.unsplash.com/random",
		title: "photo",
		featured: true,
	},
];

class UserDetailedPhotos extends Component {
	render() {
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
						<PhotosGridList photos={photos} />
					</Box>
				</Paper>
			</Box>
		);
	}
}

export default UserDetailedPhotos;

import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { getFirebase } from "react-redux-firebase";
import UserDeatailedSidebar from "./UserDeatailedSidebar";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPageSkeleton from "./UserDetailedPageSkeleton";
import UserDetailedPhotos from "./UserDetailedPhotos";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class UserDetailedPage extends Component {
	state = { user: null, unsubscribe: null };

	componentDidMount = () => {
		const userId = this.props.match.params.id;
		const firestore = getFirebase().firestore();

		const unsubscribe = firestore
			.collection("users")
			.doc(userId)
			.onSnapshot((doc) => {
				this.setState({ user: { id: userId, ...doc.data() } });
			});

		this.setState({ unsubscribe });
	};

	componentWillUnmount = () => {
		this.state.unsubscribe();
	};

	render() {
		const { user } = this.state;
		return (
			<>
				{user === null && <UserDetailedPageSkeleton />}
				{user === undefined && (
					<Box textAlign="center" my="3rem">
						<Typography component="h1" variant="h5">
							Please check your url or go back and try again
						</Typography>
					</Box>
				)}
				{user && (
					<Grid container spacing={3}>
						<Grid item md={8} xs={12}>
							<UserDetailedHeader user={user} />
							<UserDetailedAbout user={user} />
						</Grid>
						<Grid item md xs={12}>
							<UserDeatailedSidebar />
						</Grid>
						<Grid item md={8} xs={12}>
							<UserDetailedPhotos user={user} />
						</Grid>
						<Grid item md={8} xs={12}>
							<UserDetailedEvents />
						</Grid>
					</Grid>
				)}
			</>
		);
	}
}

export default withStyles(style)(UserDetailedPage);

import { Grid } from "@material-ui/core";
import React from "react";
import UserDeatailedSidebar from "./UserDeatailedSidebar";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";

const UserDetailedPage = () => {
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item md={8} xs={12}>
					<UserDetailedHeader />
					<UserDetailedAbout />
				</Grid>
				<Grid item md xs={12}>
					<UserDeatailedSidebar />
				</Grid>
				<Grid item md={8} xs={12}>
					<UserDetailedPhotos />
				</Grid>
				<Grid item md={8} xs={12}>
					<UserDetailedEvents />
				</Grid>
			</Grid>
		</div>
	);
};

export default UserDetailedPage;

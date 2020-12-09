import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import UserDeatailedSidebar from "./UserDeatailedSidebar";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class UserDetailedPage extends Component {
	render() {
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
	}
}

export default withStyles(style)(UserDetailedPage);

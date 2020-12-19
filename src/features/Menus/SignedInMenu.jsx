import React, { Fragment } from "react";
import MainButton from "../../Buttons/MainButton";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import MenuButton from "../NavBar/MenuButton";
import { Box, Hidden, Typography } from "@material-ui/core";
import SideDrawer from "./SideDrawer";
import { Grid } from "@material-ui/core";
import MenuWithLogout from "../NavBar/MenuWithLogout";
import SettingsIcon from "@material-ui/icons/Settings";

class SignedInMenu extends React.Component {
	drawerList = () => {
		const { auth, profile } = this.props;
		return (
			<Fragment>
				{/* Notification */}
				<div>
					<Grid container alignItems="center" direction="row">
						<IconButton
							color="inherit"
							classes={this.props.classes.IconButton}
						>
							<NotificationsNoneRoundedIcon fontSize="small" />

							<Hidden mdUp>
								<Box
									display="flex"
									alignItems="center"
									ml="1.1rem"
								>
									<Typography variant="body2">
										Notifications
									</Typography>
								</Box>
							</Hidden>
						</IconButton>
					</Grid>
				</div>

				{/* First Menu */}
				<MenuButton
					iconType={AddRoundedIcon}
					items={[
						{
							name: "Create Event",
							link: "/createEvent",
						},
						{
							name: "Browse Events",
							link: "/events",
						},
						{
							name: "My Events",
							link: "/createEvent",
						},
					]}
					menuName="Events"
				/>

				<MenuButton
					iconType={SettingsIcon}
					items={[
						{
							name: "Basic Details",
							link: "/settings/basic",
						},
						{
							name: "About Me",
							link: "/settings/about",
						},
						{
							name: "My Photos",
							link: "/settings/photos",
						},
						{
							name: "Account",
							link: "/settings/account",
						},
					]}
					menuName="Settings"
				/>

				{/* Events Menu */}
				<MenuWithLogout auth={auth} profile={profile} />
			</Fragment>
		);
	};

	render() {
		return (
			<Fragment>
				<MainButton buttonTitle="Create Event" link="/createEvent" />
				<Hidden smDown>{this.drawerList()}</Hidden>
				<Hidden mdUp>
					<SideDrawer drawerList={this.drawerList} />
				</Hidden>
			</Fragment>
		);
	}
}

export default SignedInMenu;

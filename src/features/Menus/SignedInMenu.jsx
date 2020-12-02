import React, { Fragment } from "react";
import MainButton from "../../Buttons/MainButton";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import MenuButton from "../NavBar/MenuButton";
import { Box, Hidden, Typography } from "@material-ui/core";
import SideDrawer from "./SideDrawer";

class SignedInMenu extends React.Component {
	drawerList = () => {
		return (
			<Fragment>
				{/* Notification */}
				<IconButton
					color="inherit"
					classes={this.props.classes.IconButton}
				>
					<NotificationsNoneRoundedIcon fontSize="small" />
					<Hidden mdUp>
						<Box display="flex" alignItems="center">
							<Typography variant="body2" color="textSecondary">
								Notifications
							</Typography>
						</Box>
					</Hidden>
				</IconButton>

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

				{/* Events Menu */}
				<MenuButton
					iconType={AccountCircle}
					items={[
						{
							name: "Profile",
							link: "/createEvent",
						},
						{
							name: "Help",
							link: "/createEvent",
						},
						{
							name: "Settings",
							link: "/settings",
						},
						{
							name: "Logout",
							link: "/",
						},
					]}
					menuName="Username"
				/>
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

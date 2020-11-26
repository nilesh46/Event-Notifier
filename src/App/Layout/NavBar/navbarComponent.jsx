import React from "react";
import { withStyles } from "@material-ui/styles";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import MenuButton from "./MenuButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import MainButton from "../../../Buttons/MainButton";

const styles = {
	root: {
		width: "100%",
	},
	title: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	logo: {
		maxWidth: 60,
	},
	margin: {
		marginLeft: 20,
	},
};

class MenuAppBar extends React.Component {
	state = {
		anchorEl: null,
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static" style={{ background: "#2E3B55" }}>
					<Toolbar>
						{/* Logo */}
						<img
							src="assets/Logo.png"
							alt="Logo"
							className={classes.logo}
						/>
						<Typography
							type="title"
							variant="h6"
							color="inherit"
							className={(classes.flex, classes.title)}
						>
							Ev-Net
							<MainButton buttonTitle="Create Event" />
						</Typography>

						{/* Notification */}
						<IconButton
							color="inherit"
							classNAme={classes.IconButton}
						>
							<NotificationsNoneRoundedIcon fontSize="small" />
						</IconButton>

						{/* First Menu */}
						<MenuButton
							iconType={AddRoundedIcon}
							items={[
								"Create Event",
								"Browse Events",
								"My Events",
							]}
						/>

						{/* Second Menu */}
						<MenuButton
							iconType={AccountCircle}
							items={["Profile", "Help", "Settings", "Logout"]}
						/>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MenuAppBar);

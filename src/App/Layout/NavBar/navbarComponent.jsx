import React, { Fragment } from "react";
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
import { Link } from "react-router-dom";

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
    typo: {
        color: "inherit",
        textDecoration: 'none'
    }
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
                        <Link to="/">
                            <img
                                src="assets/Logo.png"
                                alt="Logo"
                                className={classes.logo}
                            />
                        </Link>
						<Typography
							type="title"
							variant="h6"
							color="inherit"
							className={(classes.flex, classes.title)}
                        >
                            <Link to="/" className={classes.typo}>
                                Ev-Net
                            </Link>
                            <MainButton buttonTitle="Create Event" link="/createEvent"/>
						</Typography>

						{/* Notification */}
						<IconButton color="inherit" className={classes.IconButton}>
							<NotificationsNoneRoundedIcon fontSize="small" />
						</IconButton>

						{/* First Menu */}
						<MenuButton
							iconType={AddRoundedIcon}
                            items={
                                [
                                    {
                                        name: "Create Event",
                                        link: "/createEvent"
                                    },
                                    {
                                        name: "Browse Events",
                                        link: "/events"
                                    },
                                    {
                                        name: "My Events",
                                        link: "/createEvent"
                                    }
                                ]
                            }
						/>

						{/* Second Menu */}
						<MenuButton
							iconType={AccountCircle}
                            items={
                                [
                                    {
                                        name: "Profile",
                                        link: "/createEvent"
                                    },
                                    {
                                        name: "Help",
                                        link: "/createEvent"
                                    },
                                    {
                                        name: "Settings",
                                        link: "/settings"
                                    },
                                    {
                                        name: "Logout",
                                        link: "/createEvent"
                                    },
                                ]
                            }
						/>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MenuAppBar);

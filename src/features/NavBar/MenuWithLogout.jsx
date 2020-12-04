import React from "react";
import { Box, Menu, MenuItem, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { getFirebase } from "react-redux-firebase";

class MenuWithLogout extends React.Component {
	state = {
		anchorEl: null,
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleLogout = () => {
		const firebase = getFirebase();
		firebase.auth().signOut();
	};

	BtnText = (text) => {
		return (
			<Typography variant="body2" color="inherit">
				{text}
			</Typography>
		);
	};

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const Wrapper = this.props.iconType;

		const { auth } = this.props;

		return (
			<Box>
				<Grid container direction="row" alignItems="center">
					<IconButton
						aria-owns={open ? "menu-appbar" : null}
						aria-haspopup="true"
						onClick={this.handleMenu}
						color="inherit"
					>
						{<Wrapper />}
					</IconButton>
					{auth.email && this.BtnText(auth.email)}
				</Grid>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						horizontal: "center",
						vertical: "top",
					}}
					open={open}
					keepMounted
					getContentAnchorEl={null}
					onClose={this.handleClose}
				>
					<MenuItem
						onClick={this.handleClose}
						component={Link}
						to="/settings/about"
					>
						Profile
					</MenuItem>
					<Divider light />

					<MenuItem
						onClick={this.handleClose}
						component={Link}
						to="/events"
					>
						Help
					</MenuItem>
					<Divider light />

					<MenuItem
						onClick={this.handleClose}
						component={Link}
						to="/settings"
					>
						Settings
					</MenuItem>
					<Divider light />

					<MenuItem
						component={Link}
						to="/"
						onClick={this.handleLogout}
					>
						Logout
					</MenuItem>
				</Menu>
			</Box>
		);
	}
}

export default MenuWithLogout;

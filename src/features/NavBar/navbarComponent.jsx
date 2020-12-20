import React from "react";
import { withStyles } from "@material-ui/styles";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import mainLogo from "../../Assets/Logo.svg";

const styles = (theme) => ({
	root: {
		width: "100%",
	},
	title: {
		flexGrow: 1,
		marginLeft: 10,
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
		textDecoration: "none",
		"@media (max-width:960px)": {
			fontSize: "1.5rem",
		},
		"@media (max-width:355px)": {
			fontSize: "1rem",
		},
	},
});

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
		const { auth, profile } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;
		const showSignedInMenu =
			authenticated && window.location.pathname !== "/";

		return (
			<div className={classes.root} id="back-to-top-anchor">
				<AppBar style={{ background: "#2E3B55" }}>
					<Toolbar>
						{/* Logo */}
						<Link to="/events">
							<img
								src={mainLogo}
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
							<Link to="/events" className={classes.typo}>
								Ev-Net
							</Link>
						</Typography>

						{showSignedInMenu ? (
							<SignedInMenu
								classes={classes}
								auth={auth}
								profile={profile}
							/>
						) : (
							<SignedOutMenu
								onClick={() =>
									this.setState({ authenticated: true })
								}
							/>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

export default withFirebase(
	connect(mapStateToProps)(withStyles(styles)(MenuAppBar))
);

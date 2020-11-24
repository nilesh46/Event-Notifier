import React from "react";
import { withStyles } from "@material-ui/styles";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

const styles = {
	root: {
        width: "100%",
	},
	title: {
        flexGrow: 1,
        marginLeft:10,
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
        authenticated: false,
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
                        <Link to="/events">
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
                            <Link to="/events" className={classes.typo}>
                                Ev-Net
                            </Link>
						</Typography>

                        {
                            this.state.authenticated
                                ?
                                <SignedInMenu classes={classes} />
                                :
                                <SignedOutMenu />
                        }
                           
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MenuAppBar);

import { Box, Button, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { getFirebase } from "react-redux-firebase";

const style = (theme) => ({
	root: {
		backgroundColor: "white",
		borderTop: "1px dotted #333",
		paddingTop: "2px",
	},
});

const FacebookButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
		"&:hover": {
			backgroundColor: blue[700],
		},
		flex: 1,
	},
}))(Button);

const GoogleButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(grey[100]),
		backgroundColor: grey[50],
		"&:hover": {
			backgroundColor: grey[300],
		},
		flex: 1,
	},
}))(Button);

const GithubButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(grey[300]),
		backgroundColor: grey[350],
		"&:hover": {
			backgroundColor: grey[500],
		},
		flex: 1,
	},
}))(Button);

class OAuthPanel extends Component {
	render() {
		const { classes } = this.props;
		const { socialLogin } = this.props;
		const firebase = getFirebase();
		return (
			<div className={classes.root}>
				<Box
					display="flex"
					flexWrap="wrap"
					justifyContent="center"
					alignItems="center"
				>
					<GoogleButton
						variant="contained"
						onClick={() => socialLogin({ firebase }, "google")}
					>
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="center"
							alignItems="center"
						>
							<img src="./assets/icons/google.svg" alt="google" />
							<Typography>
								<strong>Google</strong>
							</Typography>
						</Box>
					</GoogleButton>

					<FacebookButton
						variant="contained"
						onClick={() => socialLogin({ firebase }, "facebook")}
					>
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="center"
							alignItems="center"
						>
							<img
								src="./assets/icons/facebook.svg"
								alt="facebook"
							/>
							<Typography>
								<strong>Facebook</strong>
							</Typography>
						</Box>
					</FacebookButton>

					<GithubButton
						variant="contained"
						onClick={() => socialLogin({ firebase }, "github")}
					>
						<Box
							display="flex"
							flexWrap="wrap"
							justifyContent="center"
							alignItems="center"
						>
							<img src="./assets/icons/github.svg" alt="github" />
							<Typography>
								<strong>GitHub</strong>
							</Typography>
						</Box>
					</GithubButton>
				</Box>
			</div>
		);
	}
}

export default withStyles(style)(OAuthPanel);

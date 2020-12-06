import { Box, ButtonBase, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { getFirebase } from "react-redux-firebase";
import emailSentBG from "../../Assets/emailSent.jpg";

const style = (theme) => ({
	root: {
		height: "100vh",
		background: `url(${emailSentBG}) no-repeat center center /cover`,
		color: "#FFF",
	},
	darkOverlay: {
		backgroundColor: "rgba(0,0,0,0.3)",
		height: "inherit",
	},
	resendLink: {
		color: "#2196f3",
	},
});

class EmailVerificationPage extends Component {
	state = { sends: -1 };

	sendVerificationMail = () => {
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		user.sendEmailVerification()
			.then((e) => {
				this.setState({ sends: this.state.sends + 1 });
			})
			.catch((error) => {});
	};

	handleResendClick = () => {
		this.sendVerificationMail();
	};

	componentDidMount = () => {
		this.sendVerificationMail();
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.darkOverlay}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						<Box my="2rem" textAlign="center">
							<Typography variant="h4">
								Thank you for Connecting with us
							</Typography>
							<Typography variant="body1">
								<br />A verification mail has been sent to your
								email account. Please check your inbox to
								verify.
							</Typography>
							<Typography variant="body2">
								<br />
								Didn't Recieved verification mail{" "}
								<ButtonBase
									className={classes.replyBtn}
									onClick={this.handleResendClick}
								>
									<span className={classes.resendLink}>
										Click Here
									</span>
								</ButtonBase>{" "}
								to resend verification mail
								<br />
								{this.state.sends > 0 && (
									<span>!! Resend mail Successfull !!</span>
								)}
								<br />
								If You have verified your account. Please reload
								the page to continue.
							</Typography>
						</Box>
					</Box>
				</div>
			</div>
		);
	}
}

export default withStyles(style)(EmailVerificationPage);

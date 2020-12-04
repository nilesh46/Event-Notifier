import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, withStyles } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import TextInput from "../event/EventForm/FormInputs/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { getFirebase } from "react-redux-firebase";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";

const styles = (theme) => ({
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	paper: {
		marginTop: theme.spacing(0),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class SignInPanel extends Component {
	state = {
		err: null,
		resetStatus: false,
	};

	sendPasswordResetLink = (creds) => {
		const firebase = getFirebase();
		const auth = firebase.auth();
		const emailAddress = creds.email;

		this.checkEmailInDatabase(auth, emailAddress);
	};

	resetPassword = (auth, emailAddress) => {
		auth.sendPasswordResetEmail(emailAddress)
			.then(() => {
				this.setState({ resetStatus: true });
			})
			.catch((error) => {});
	};

	async checkEmailInDatabase(auth, emailAddress) {
		try {
			const result = await auth.fetchSignInMethodsForEmail(emailAddress);
			if (result.length === 0) {
				this.setState({
					err:
						"The email address you have entered is not registered with this app",
				});
			} else {
				if (result[0] === "password") {
					this.resetPassword(auth, emailAddress);
				} else {
					this.setState({
						err: `App is registered using ${
							result[0].split(".")[0]
						} authentication. Please use your ${
							result[0].split(".")[0]
						} account auth button to sign in`,
					});
					this.resetPassword(auth, emailAddress);
				}
			}
		} catch (error) {}
	}

	onFormSubmit = (values) => {
		const creds = { ...values };
		this.sendPasswordResetLink(creds);
	};

	render() {
		const { classes, invalid, submitting, pristine } = this.props;

		const { err } = this.state;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					style={{ height: "100vh" }}
				>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Reset Password
						</Typography>

						{!this.state.resetStatus && (
							<form
								className={classes.form}
								onSubmit={this.props.handleSubmit(
									this.onFormSubmit
								)}
								autoComplete="off"
							>
								<Field
									name="email"
									component={TextInput}
									label="Email Address*"
									autoComplete="email"
								/>

								{err && (
									<Box my="1rem">
										<Alert severity="error">{err}</Alert>
									</Box>
								)}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
									disabled={invalid || submitting || pristine}
								>
									Reset Password
								</Button>
							</form>
						)}
						{this.state.resetStatus && (
							<Box textAlign="center" my="1rem">
								<Typography variant="body1">
									Password reset link has been sent to your
									registered email address.
								</Typography>
							</Box>
						)}
						<Link to="/" variant="body2">
							Go Back
						</Link>
					</div>
				</Box>
			</Container>
		);
	}
}

const validate = combineValidators({
	email: isRequired({ message: "Please enter a valid Email ID" }),
});

const SignInForm = reduxForm({ form: "ResetPasswordForm", validate })(
	SignInPanel
);

export default withStyles(styles)(SignInForm);

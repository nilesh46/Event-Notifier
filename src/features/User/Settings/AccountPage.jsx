import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, withStyles } from "@material-ui/core";
import { Field, reduxForm, reset } from "redux-form";
import PasswordInput from "../../event/EventForm/FormInputs/PasswordInput";
import {
	combineValidators,
	isRequired,
	matchesField,
	composeValidators,
} from "revalidate";
import { getFirebase } from "react-redux-firebase";
import { Alert } from "@material-ui/lab";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import facebookLogo from "../../../Assets/Icons/facebook.svg";
import googleLogo from "../../../Assets/Icons/google.svg";
import githubLogo from "../../../Assets/Icons/github.svg";

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

class AccountPage extends Component {
	state = {
		err: null,
	};

	changePassword = (newPassword) => {
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;

		user.updatePassword(newPassword)
			.then(() => {
				this.setState({ err: null });
				const { dispatch } = this.props;
				dispatch(reset("ChangePasswordForm"));
				toastr.success("Success!!! ", "Password has been updated");
			})
			.catch((error) => {
				this.setState({ err: error.message });
			});
	};

	onFormSubmit = (values) => {
		this.changePassword(values.password);
	};

	render() {
		const {
			classes,
			invalid,
			submitting,
			pristine,
			providerId,
		} = this.props;

		const { err } = this.state;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{providerId && providerId === "password" && (
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Update Pasword
						</Typography>

						<form
							className={classes.form}
							onSubmit={this.props.handleSubmit(
								this.onFormSubmit
							)}
							autoComplete="off"
						>
							<Field
								name="password"
								component={PasswordInput}
								label="Password*"
							/>
							<Field
								name="confirmPassword"
								component={PasswordInput}
								label="Confirm Password*"
							/>

							{err && <Alert severity="error">{err}</Alert>}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={invalid || submitting || pristine}
							>
								Update Password
							</Button>
						</form>
					</div>
				)}
				{providerId && providerId === "facebook.com" && (
					<div>
						<Typography component="h1" variant="h5" color="primary">
							Facebook Account
						</Typography>
						<Box mb="1rem">
							<Typography variant="body1">
								Please visit facebook to update your account
								settings
							</Typography>
						</Box>
						<FacebookButton
							variant="contained"
							onClick={() => {
								window.open(
									"https://www.facebook.com/",
									"_blank"
								);
							}}
						>
							<Box
								display="flex"
								flexWrap="wrap"
								justifyContent="center"
								alignItems="center"
							>
								<img src={facebookLogo} alt="facebook" />
								<Typography>
									<strong>Facebook</strong>
								</Typography>
							</Box>
						</FacebookButton>
					</div>
				)}
				{providerId && providerId === "google.com" && (
					<div>
						<Typography
							component="h1"
							variant="h5"
							color="secondary"
						>
							Google Account
						</Typography>
						<Box mb="1rem">
							<Typography variant="body1">
								Please visit google to update your account
								settings
							</Typography>
						</Box>
						<GoogleButton
							variant="contained"
							onClick={() => {
								window.open(
									"https://www.google.com/",
									"_blank"
								);
							}}
						>
							<Box
								display="flex"
								flexWrap="wrap"
								justifyContent="center"
								alignItems="center"
							>
								<img src={googleLogo} alt="google" />
								<Typography>
									<strong>Google</strong>
								</Typography>
							</Box>
						</GoogleButton>
					</div>
				)}
				{providerId && providerId === "github.com" && (
					<div>
						<Typography
							component="h1"
							variant="h5"
							color="secondary"
						>
							GitHub Account
						</Typography>
						<Box mb="1rem">
							<Typography variant="body1">
								Please visit github to update your account
								settings
							</Typography>
						</Box>
						<GithubButton
							variant="contained"
							onClick={() => {
								window.open(
									"https://www.github.com/",
									"_blank"
								);
							}}
						>
							<Box
								display="flex"
								flexWrap="wrap"
								justifyContent="center"
								alignItems="center"
							>
								<img src={githubLogo} alt="google" />
								<Typography>
									<strong>GitHub</strong>
								</Typography>
							</Box>
						</GithubButton>
					</div>
				)}
			</Container>
		);
	}
}

const validate = combineValidators({
	password: isRequired({ message: "Please enter your password" }),
	confirmPassword: composeValidators(
		isRequired({ message: "Please confirm your password" }),
		matchesField("password")({ message: "Password do not match" })
	)(),
});

const ChangePasswordForm = reduxForm({ form: "ChangePasswordForm", validate })(
	withStyles(styles)(AccountPage)
);

const mapStateToProps = (state) => {
	return { providerId: state.firebase.auth.providerData[0].providerId };
};

export default connect(mapStateToProps)(ChangePasswordForm);

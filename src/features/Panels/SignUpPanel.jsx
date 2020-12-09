import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, ButtonBase, IconButton } from "@material-ui/core";
import {
	combineValidators,
	composeValidators,
	createValidator,
	isRequired,
	matchesField,
} from "revalidate";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../event/EventForm/FormInputs/TextInput";
import PasswordInput from "../event/EventForm/FormInputs/PasswordInput";
import { openModal, registerUser } from "../../redux/actions";
import { getFirebase } from "react-redux-firebase";
import { Alert } from "@material-ui/lab";
import InfoIcon from "@material-ui/icons/Info";

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

class SignUpPanel extends Component {
	state = {
		err: null,
	};

	onFormSubmit = (values) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();

		// Filtering out the confirm password key
		const notAllowed = ["confirmPassword"];
		const creds = Object.keys(values)
			.filter((key) => !notAllowed.includes(key))
			.reduce((obj, key) => {
				return {
					...obj,
					[key]: values[key],
				};
			}, {});

		this.props
			.registerUser({ firebase, firestore }, creds)
			.catch((error) => this.setState({ err: error.errors._error }));
	};

	showPasswordInfo = () => {
		const { openModal } = this.props;
		const title = "Password Rules";
		const description =
			"For security of your account we ensure strong password pratices by user";
		const list = [
			"1.Password should contain one uppercase letter",
			"2.Password should contain one lowercase letter",
			"3.Password should contain one symbol",
			"4.Password should contain one digit",
			"5.Password should be min of 8 characters",
		];
		openModal("InfoModal", { title, description, list });
	};

	showEmailInfo = () => {
		const { openModal } = this.props;
		const title = "Email Rules";
		const description =
			"For stopping spam users we are currently allowing some major email domains to be supported by our system. If you want to add some email domain you can request our support team so";
		const list = [
			"1.@gmail.com",
			"2.@outlook.com",
			"3.@yahoo.com",
			"4.@hotmail.com",
		];
		openModal("InfoModal", { title, description, list });
	};

	render() {
		const {
			classes,
			invalid,
			submitting,
			pristine,
			handleChange,
		} = this.props;

		const { err } = this.state;

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form
						className={classes.form}
						onSubmit={this.props.handleSubmit(this.onFormSubmit)}
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Field
									name="firstName"
									component={TextInput}
									label="First Name*"
									autoComplete="name"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Field
									name="lastName"
									component={TextInput}
									label="Last Name*"
									autoComplete="name"
								/>
							</Grid>
							<Grid item xs={12}>
								<Box display="flex" alignItems="center">
									<Field
										name="email"
										component={TextInput}
										label="Email Address*"
										autoComplete="email"
									/>
									<Box ml="0.5rem">
										<IconButton
											onClick={this.showEmailInfo}
											size="small"
										>
											<InfoIcon />
										</IconButton>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Box display="flex" alignItems="center">
									<Field
										name="password"
										component={PasswordInput}
										label="Password*"
									/>
									<Box ml="0.5rem">
										<IconButton
											onClick={this.showPasswordInfo}
											size="small"
										>
											<InfoIcon />
										</IconButton>
									</Box>
								</Box>
								<Field
									name="confirmPassword"
									component={PasswordInput}
									label="Confirm Password*"
								/>
							</Grid>
						</Grid>
						{err && <Alert severity="error">{err}</Alert>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={invalid || submitting || pristine}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<ButtonBase
									className={classes.replyBtn}
									onClick={(e) => {
										handleChange(e, 1);
									}}
								>
									<Typography variant="body2" color="primary">
										Already have an account? Sign In
									</Typography>
								</ButtonBase>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}
const actions = {
	registerUser,
	openModal,
};

const passwordValidator = createValidator(
	(message) => (value) => {
		const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		if (!re.test(value))
			return "Please ensure your password is strong enough";
	},
	"Invalid Password"
);

const emailValidator = createValidator(
	(message) => (value) => {
		const list = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
		const domain = value.split("@")[1];

		if (list.indexOf(domain) === -1)
			return "Please ensure your email domain is in our list of supported domains";
	},
	"Invalid email"
);

const validate = combineValidators({
	firstName: isRequired({ message: "Please enter your First Name" }),
	lastName: isRequired({ message: "Please enter your Last Name" }),
	email: composeValidators(
		isRequired({ message: "Please enter a valid Email ID" }),
		emailValidator
	)(),
	password: composeValidators(
		isRequired({ message: "Please enter password" }),
		passwordValidator
	)(),
	confirmPassword: composeValidators(
		isRequired({ message: "Please confirm your password" }),
		matchesField("password")({ message: "Password do not match" })
	)(),
});

const SignUpForm = reduxForm({ form: "SignUpForm", validate })(SignUpPanel);

export default connect(
	null,
	actions
)(withStyles(styles, { withTheme: true })(SignUpForm));

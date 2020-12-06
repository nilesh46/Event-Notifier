import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ButtonBase, withStyles } from "@material-ui/core";
import { login } from "../../redux/actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../event/EventForm/FormInputs/TextInput";
import PasswordInput from "../event/EventForm/FormInputs/PasswordInput";
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
	};

	onFormSubmit = (values) => {
		const firebase = getFirebase();
		const creds = { ...values };
		this.props
			.login({ firebase }, creds)
			.catch((error) => this.setState({ err: error.errors._error }));
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
						Sign in
					</Typography>

					<form
						className={classes.form}
						onSubmit={this.props.handleSubmit(this.onFormSubmit)}
						autoComplete="off"
					>
						<Field
							name="email"
							component={TextInput}
							label="Email Address*"
							autoComplete="email"
						/>

						<Field
							name="password"
							component={PasswordInput}
							label="Password*"
						/>
						{/* <FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/> */}
						{err && <Alert severity="error">{err}</Alert>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={invalid || submitting || pristine}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/resetPassword" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<ButtonBase
									className={classes.replyBtn}
									onClick={(e) => {
										handleChange(e, 0);
									}}
								>
									<Typography variant="body2" color="primary">
										Don't have an account? Sign Up
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
	login,
};

const validate = combineValidators({
	email: isRequired({ message: "Please enter a valid Email ID" }),
	password: isRequired({ message: "Please enter your password" }),
});

const SignInForm = reduxForm({ form: "SignInForm", validate })(SignInPanel);

export default connect(null, actions)(withStyles(styles)(SignInForm));

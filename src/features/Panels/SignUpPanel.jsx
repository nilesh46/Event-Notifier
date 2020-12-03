import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ButtonBase } from "@material-ui/core";
import { combineValidators, isRequired } from "revalidate";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../event/EventForm/FormInputs/TextInput";
import PasswordInput from "../event/EventForm/FormInputs/PasswordInput";

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
	onFormSubmit = (values) => {
		const creds = { ...values };
		console.log(creds);
	};

	render() {
		const {
			classes,
			invalid,
			submitting,
			pristine,
			handleChange,
		} = this.props;

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
								<Field
									name="email"
									component={TextInput}
									label="Email Address*"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									name="password"
									component={PasswordInput}
								/>
							</Grid>
						</Grid>
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
const actions = {};

const validate = combineValidators({
	firstName: isRequired({ message: "Please enter your First Name" }),
	lastName: isRequired({ message: "Please enter your Last Name" }),
	email: isRequired({ message: "Please enter a valid Email ID" }),
	password: isRequired({ message: "Please enter your password" }),
});

const SignUpForm = reduxForm({ form: "SignUpForm", validate })(SignUpPanel);

export default connect(
	null,
	actions
)(withStyles(styles, { withTheme: true })(SignUpForm));

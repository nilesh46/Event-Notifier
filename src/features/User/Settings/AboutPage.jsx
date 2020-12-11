import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Avatar, Button, Typography, withStyles } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/EventForm/FormInputs/TextInput";
import TextArea from "../../event/EventForm/FormInputs/TextArea";
import MultipleSelectInput from "../../event/EventForm/FormInputs/MultipleSelectInput";
import RadioInput from "../../event/EventForm/FormInputs/RadioInput";
import { connect } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { Alert } from "@material-ui/lab";
import { toastr } from "react-redux-toastr";

const styles = (theme) => ({
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	paper: {
		marginTop: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(2),
	},
	field: {
		margin: "1rem 0",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class AboutPage extends React.Component {
	state = {
		err: null,
	};

	updateBasicDetails = (values) => {
		const { reset, auth } = this.props;
		const firebase = getFirebase();
		const { createdAt, lastLoginAt } = auth;

		firebase
			.firestore()
			.collection("users")
			.doc(auth.uid)
			.update({ createdAt, lastLoginAt, ...values })
			.then(() => {
				this.setState({ err: null });
				reset();
				toastr.success("Success!!! ", "Profile has been updated");
			})
			.catch((error) => {
				this.setState({ err: error.message });
			});
	};

	onFormSubmit = (values) => {
		this.updateBasicDetails(values);
	};
	render() {
		const { classes } = this.props;
		const { err } = this.state;
		const statusRadio = [
			{ label: `Single 😔` },
			{ label: `Relationship 😎` },
			{ label: `Married 😓` },
		];

		const interest = [
			{ key: "drinks", text: "Drinks", value: "drinks" },
			{ key: "culture", text: "Culture", value: "culture" },
			{ key: "film", text: "Film", value: "film" },
			{ key: "food", text: "Food", value: "food" },
			{ key: "music", text: "Music", value: "music" },
			{ key: "travel", text: "Travel", value: "travel" },
		];

		return (
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<InfoIcon />
					</Avatar>
					<Typography component="h1" variant="h4">
						About Me
					</Typography>

					<form
						className={classes.form}
						onSubmit={this.props.handleSubmit(this.onFormSubmit)}
						autoComplete="off"
					>
						<Typography component="h1" variant="h5">
							Complete your profile to get most out of this site
						</Typography>
						<br />
						<Field
							name="status"
							component={RadioInput}
							options={statusRadio}
							default1="Single 😔"
							label="Tell us about your status"
						/>
						<br />
						<Field
							name="aboutDesc"
							component={TextArea}
							rows="4"
							options={statusRadio}
							label="Tell us about yourself"
							className={classes.field}
						/>
						<Field
							name="interests"
							component={MultipleSelectInput}
							label="Interests"
							className={classes.field}
							interest={interest}
							multiple
						/>
						<Field
							name="occupation"
							component={TextInput}
							label="Occupation"
							className={classes.field}
						/>
						<Field
							name="country"
							component={TextInput}
							label="Country of Origin"
							className={classes.field}
						/>
						{err && <Alert severity="error">{err}</Alert>}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							// disabled={invalid || submitting || pristine}
						>
							Update Profile
						</Button>
					</form>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialValues: state.firebase.profile,
		auth: state.firebase.auth,
	};
};

const AboutMeDetailsForm = reduxForm({
	form: "AboutMeDetailsForm",
	enableReinitialize: true,
	destroyOnUnmount: false,
})(withStyles(styles)(AboutPage));

export default connect(mapStateToProps, null)(AboutMeDetailsForm);

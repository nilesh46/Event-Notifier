import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Avatar, Button, Typography, withStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../event/EventForm/FormInputs/TextInput";
import DateInput from "../../event/EventForm/FormInputs/DateInput";
import RadioInput from "../../event/EventForm/FormInputs/RadioInput";
import { connect } from "react-redux";
import { addYears } from "date-fns";
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

class BasicPage extends React.Component {
	state = {
		err: null,
	};

	updateBasicDetails = (values) => {
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		firebase
			.firestore()
			.collection("users")
			.doc(user.uid)
			.update({ ...values })
			.then(() => {
				this.setState({ err: null });
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
		const genderRadio = [
			{ label: "male" },
			{ label: "female" },
			{ label: "other" },
		];

		return (
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<AccountCircleIcon />
					</Avatar>
					<Typography component="h1" variant="h4">
						Basic Details
					</Typography>

					<form
						className={classes.form}
						onSubmit={this.props.handleSubmit(this.onFormSubmit)}
						autoComplete="off"
					>
						<Field
							name="displayName"
							component={TextInput}
							label="Full Name"
							className={classes.field}
						/>
						<Field
							name="gender"
							component={RadioInput}
							options={genderRadio}
							default1="male"
							label="Gender"
						/>
						<br />
						<Field
							name="dob"
							component={DateInput}
							label="Date of Birth"
							mindate={"01/01/1970"}
							maxdate={new Date()}
							fullView={true}
							className={classes.field}
							maxDate={addYears(new Date(), -18)}
						/>
						<Field
							name="homeTown"
							component={TextInput}
							label="Home Town"
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
	};
};

const BasicDetailsForm = reduxForm({
	form: "BasicDetailsForm",
	enableReinitialize: true,
	destroyOnUnmount: false,
})(withStyles(styles)(BasicPage));

export default connect(mapStateToProps, null)(BasicDetailsForm);

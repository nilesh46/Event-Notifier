import React, { Fragment } from "react";
import { Button, Typography } from "@material-ui/core/";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../../../redux/actions";
import {
	combineValidators,
	composeValidators,
	isRequired,
	hasLengthGreaterThan,
} from "revalidate";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import TextInput from "./FormInputs/TextInput";
import TextArea from "./FormInputs/TextArea";
import SelectInput from "./FormInputs/SelectInput";
import DateInput from "./FormInputs/DateInput";
import TimeInput from "./FormInputs/TimeInput";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			marginBottom: theme.spacing(2),
		},
	},
	typo: {
		color: "#ad1457",
		fontSize: "2rem",
		fontWeight: 500,
		marginTop: "1rem",
		marginBottom: ".5rem",
	},
	btn: {
		marginLeft: "0.3rem",
		marginRight: "0.3rem",
	},
	dib: {
		display: "inline-block",
	},
	marg: {
		margin: ".5rem",
	},
});

class EventForm extends React.Component {
	onFormSubmit = (values) => {
		if (this.props.initialValues.id) {
			this.props.updateEvent(values);
			this.props.history.push(`/events/${this.props.initialValues.id}`);
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: "/assets/user.png",
				hostedBy: "test",
			};
			this.props.createEvent(newEvent);
			this.props.history.push(`/events/${newEvent.id}`);
		}
	};

	render() {
		const { classes } = this.props;
		const {
			initialValues,
			history,
			invalid,
			submitting,
			pristine,
		} = this.props;

		const category = [
			{
				key: "empty",
				text: "",
				value: "",
			},
			{
				key: "Seminar or Talk",
				text: "Seminar or Talk",
				value: "Seminar or Talk",
			},
			{
				key: "Tournament",
				text: "Tournament",
				value: "Tournament",
			},
			{
				key: "Webinar",
				text: "Webinar",
				value: "Webinar",
			},
			{ key: "Attraction", text: "Attraction", value: "Attraction" },
			{
				key: "Camp,Trip, or Retreat",
				text: "Camp, Trip, or Retreat",
				value: "Camp, Trip, or Retreat",
			},
			{
				key: "Class, Training, or Workshop",
				text: "Class, Training, or Workshop",
				value: "Class, Training, or Workshop",
			},
			{
				key: "Concert or Performance",
				text: "Concert or Performance",
				value: "Concert or Performance",
			},
			{
				key: "Festival or Fair",
				text: "Festival or Fair",
				value: "Festival or Fair",
			},
			{
				key: "Game or Competition",
				text: "Game or Competition",
				value: "Game or Competition",
			},
			{
				key: "Meeting",
				text: "Meeting",
				value: "Meeting",
			},
			{
				key: "Party or Social Gathering",
				text: "Party or Social Gathering",
				value: "Party or Social Gathering",
			},
			{
				key: "Culture",
				text: "Culture",
				value: "Culture",
			},
			{
				key: "Others",
				text: "Others",
				value: "Others",
			},
		];

		return (
			<Fragment>
				<form
					onSubmit={this.props.handleSubmit(this.onFormSubmit)}
					autoComplete="off"
					className={classes.root}
				>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							<Typography className={classes.typo}>
								EVENT BASIC DETAILS
							</Typography>
							<div>
								<label>Enter Event Title : </label>
								<Field
									name="title"
									component={TextInput}
									label="Event Title"
								/>
							</div>
							<div>
								<label>Select Event Category : </label>
								<br />
								<Field
									name="category"
									component={SelectInput}
									options={category}
									label="Event Category"
								/>
							</div>
							<div>
								<label>Enter Event Description : </label>
								<Field
									name="description"
									component={TextArea}
									rows="3"
									label="Event Description"
								/>
							</div>
							<br />
							<Typography className={classes.typo}>
								EVENT LOCATION DETAILS
							</Typography>
							<div>
								<label>Enter City : </label>
								<Field
									name="city"
									component={TextInput}
									label="Event City"
								/>
							</div>
							<div>
								<label>Enter Venue : </label>
								<Field
									name="venue"
									component={TextInput}
									label="Event Venue"
								/>
							</div>
							<br />
							<Typography className={classes.typo}>
								EVENT TIMING
							</Typography>
							<div>
								<label>Event Starts : </label>
								<br />
								<Field
									name="startDate"
									component={DateInput}
									label="Event Start Date"
								/>
								<Field
									name="startTime"
									component={TimeInput}
									label="Starting Time"
								/>
							</div>
							<br />
							<div>
								<label>Event Ends : </label>
								<br />
								<Field
									name="endDate"
									component={DateInput}
									label="Event End Date"
								/>
								<Field
									name="endTime"
									component={TimeInput}
									label="Ending Time"
								/>
							</div>
						</Grid>
						<Grid item>
							<Typography className={classes.typo}>
								ONLINE EVENT
							</Typography>
							<div>
								<label>Enter LiveStream URL : </label>
								<Field
									name="link1"
									component={TextInput}
									label="LiveStream URL"
								/>
							</div>
							<div>
								<label>Enter Webinar URL : </label>
								<Field
									name="link2"
									component={TextInput}
									label="Webinar URL"
								/>
							</div>
						</Grid>
					</Grid>
					<br />
					<Button
						type="submit"
						color="primary"
						disabled={invalid || submitting || pristine}
					>
						Submit
					</Button>
					<Button
						type="button"
						color="secondary"
						onClick={
							initialValues.id
								? () =>
										history.push(
											`/events/${initialValues.id}`
										)
								: () => history.push("/events")
						}
					>
						Cancel
					</Button>
				</form>
			</Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter((event) => event.id === eventId)[0];
	}

	return {
		initialValues: event,
	};
};

const actions = {
	createEvent,
	updateEvent,
};

const validate = combineValidators({
	title: isRequired({ message: "Please give your event a name" }),
	city: isRequired({ message: "The Event City is required" }),
	venue: isRequired({ message: "The Venue is required" }),
	category: isRequired({ message: "The Event Category is required" }),
	description: composeValidators(
		isRequired({ message: "The Event Description is required" }),
		hasLengthGreaterThan(4)({
			message: "Event Desciption must be at least 5 characters",
		})
	)(),
	startDate: isRequired({ message: "Event Starting Date is required" }),
	endDate: isRequired({ message: "Event Ending Date is required" }),
	startTime: isRequired({ message: "Event Starting Time is required" }),
	endTime: isRequired({ message: "Event Ending Date is required" }),
});

export default connect(
	mapStateToProps,
	actions
)(reduxForm({ form: "EventForm", validate })(withStyles(styles)(EventForm)));

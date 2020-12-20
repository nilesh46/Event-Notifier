import React from "react";
import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from "@material-ui/core/";
import { connect } from "react-redux";
import { createEvent, updateEvent, openModal } from "../../../redux/actions";
import {
	combineValidators,
	composeValidators,
	isRequired,
	hasLengthGreaterThan,
} from "revalidate";
import {
	reduxForm,
	Field,
	change,
	formValueSelector,
	initialize,
} from "redux-form";
import TextInput from "./FormInputs/TextInput";
import TextArea from "./FormInputs/TextArea";
import SelectInput from "./FormInputs/SelectInput";
import DateInput from "./FormInputs/DateInput";
import TimeInput from "./FormInputs/TimeInput";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import GeoDecoder from "../../Maps/GeoDecoder";
import SwitchInput from "./FormInputs/SwitchInput";
import { getFirebase } from "react-redux-firebase";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import EventPhoto from "./EventPhoto";

const styles = (theme) => ({
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
	mainBg: {
		backgroundColor: grey["50"],
		marginTop: "2rem",
		marginBottom: "2rem",
		padding: "2rem",
	},
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			marginBottom: theme.spacing(2),
		},
	},
	marg: {
		margin: ".5rem",
	},
});

class EventForm extends React.Component {
	async fetchEvent(eventId) {
		const firestore = getFirebase().firestore();
		const event = await firestore
			.collection("events")
			.doc(eventId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return doc.data();
				} else {
				}
			})
			.catch((error) => {});
		return event;
	}

	async componentDidMount() {
		const { dispatch, match } = this.props;
		const eventId = match.params.id;
		if (eventId) {
			const event = await this.fetchEvent(eventId);
			dispatch(initialize("EventForm", { id: eventId, ...event }));
		}

		dispatch(change("EventForm", "onlineEventSwitch", false));
		dispatch(change("EventForm", "mapSwitch", true));
	}

	onFormSubmit = async (values) => {
		const { openModal, updateEvent, createEvent } = this.props;
		const eventId = values.id;
		delete values.id;

		if (eventId) {
			openModal("AlertModal", {
				title: `Update ${values.title} ?`,
				description:
					"Updating this event will make the rquested the changes and will notify to all your current attendees",
				agreeBtnText: "Update",
				disagreeBtnText: "Cancel",
				actionName: "Updating Event",
				action: () => {
					updateEvent(values, eventId);
				},
			});
		} else {
			openModal("AlertModal", {
				title: `Create ${values.title} ?`,
				description: "Way to create your event in EvNet",
				agreeBtnText: "Create",
				disagreeBtnText: "Cancel",
				actionName: "Creating Event",
				action: () => {
					createEvent(values);
				},
			});
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
			onlineEventSwitch,
			mapSwitch,
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
			<>
				{!initialValues && <LoadingComponent />}
				{initialValues && (
					<Container maxWidth="md">
						<Paper className={classes.mainBg} elevation={3}>
							<Box textAlign="center" mb="2rem">
								<Typography component="h1" variant="h4">
									<i>
										<u>EVENT FORM</u>
									</i>
								</Typography>
							</Box>
							<form
								onSubmit={this.props.handleSubmit(
									this.onFormSubmit
								)}
								autoComplete="off"
								className={classes.root}
							>
								<Box>
									<Grid container spacing={2}>
										<Grid item sm={2}>
											<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
												height="100%"
											>
												<Typography
													component="h1"
													variant="h5"
													color="secondary"
												>
													BASIC DETAILS
												</Typography>
											</Box>
										</Grid>

										<Grid item sm style={{ width: "100%" }}>
											<Field
												name="title"
												component={TextInput}
												label="Event Title *"
											/>

											<Field
												name="category"
												component={SelectInput}
												options={category}
												label="Event Category *"
											/>

											<Field
												name="description"
												component={TextArea}
												rows="3"
												label="Event Description *"
											/>
										</Grid>
									</Grid>
									<Divider className={classes.marg} />
								</Box>
								<Box>
									<Grid container spacing={2}>
										<Grid item sm={2}>
											<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
												height="100%"
											>
												<Typography
													component="h1"
													variant="h5"
													color="secondary"
												>
													Options
												</Typography>
											</Box>
										</Grid>
										<Grid item sm={10}>
											<Field
												name="onlineEventSwitch"
												component={SwitchInput}
												label="Online event"
											/>
											<Field
												name="mapSwitch"
												component={SwitchInput}
												label="Use map"
											/>
										</Grid>
									</Grid>
									<Divider className={classes.marg} />
								</Box>

								{/* Location using mapbox and geocoder */}
								{mapSwitch && (
									<Box>
										<Grid container spacing={2}>
											<Grid item sm={2}>
												<Box
													display="flex"
													justifyContent="center"
													alignItems="center"
													height="100%"
												>
													<Typography
														component="h1"
														variant="h5"
														color="secondary"
													>
														LOCATION DETAILS
													</Typography>
												</Box>
											</Grid>
											<Grid
												item
												sm={10}
												style={{ width: "100%" }}
											>
												{!this.props.initialValues
													.location && (
													<Field
														name="location"
														component={GeoDecoder}
														change={change}
														dispatch={
															this.props.dispatch
														}
													/>
												)}
												{this.props.initialValues
													.location && (
													<Field
														name="location"
														component={GeoDecoder}
														change={change}
														dispatch={
															this.props.dispatch
														}
														location={
															this.props
																.initialValues
																.location
														}
													/>
												)}
											</Grid>
										</Grid>

										<Divider className={classes.marg} />
									</Box>
								)}

								{/* location using custom text fields */}
								{!mapSwitch && (
									<Box>
										<Grid container spacing={2}>
											<Grid item sm={2}>
												<Box
													display="flex"
													justifyContent="center"
													alignItems="center"
													height="100%"
												>
													<Typography
														component="h1"
														variant="h5"
														color="secondary"
													>
														LOCATION DETAILS
													</Typography>
												</Box>
											</Grid>
											<Grid
												item
												sm={10}
												style={{ width: "100%" }}
											>
												<Field
													name="AddressLine1"
													component={TextInput}
													label="Address Line 1*"
												/>

												<Field
													name="AddressLine2"
													component={TextInput}
													label="Address Line 2"
												/>
											</Grid>
										</Grid>

										<Divider className={classes.marg} />
									</Box>
								)}

								{/* online event */}
								{onlineEventSwitch && (
									<Box>
										<Grid container spacing={2}>
											<Grid item sm={2}>
												<Box
													display="flex"
													justifyContent="center"
													alignItems="center"
													height="100%"
												>
													<Typography
														component="h1"
														variant="h5"
														color="secondary"
													>
														ONLINE EVENT
													</Typography>
												</Box>
											</Grid>
											<Grid item sm={10}>
												<Field
													name="link1"
													component={TextInput}
													label="LiveStream URL"
												/>

												<Field
													name="link2"
													component={TextInput}
													label="Webinar URL"
												/>
											</Grid>
										</Grid>
										<Divider className={classes.marg} />
									</Box>
								)}

								<Box>
									<Grid container spacing={2}>
										<Grid item sm={2}>
											<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
												height="100%"
											>
												<Typography
													component="h1"
													variant="h5"
													color="secondary"
												>
													DATE {"&"} TIME
												</Typography>
											</Box>
										</Grid>
										<Grid item sm={10}>
											<Field
												name="date"
												component={DateInput}
												label="Event Date *"
												mindate={new Date()}
												fullView={false}
											/>
											<Field
												name="time"
												component={TimeInput}
												label="Time *"
											/>
										</Grid>
									</Grid>
								</Box>

								<Divider className={classes.marg} />
								<EventPhoto />
								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
									m="1rem"
								>
									<Box mx="0.5rem">
										<Button
											variant="contained"
											type="submit"
											color="primary"
											disabled={
												invalid ||
												submitting ||
												pristine
											}
										>
											Submit
										</Button>
									</Box>
									<Box mx="0.5rem">
										<Button
											variant="contained"
											type="button"
											color="secondary"
											onClick={
												initialValues.id
													? () =>
															history.push(
																`/events/${initialValues.id}`
															)
													: () =>
															history.push(
																"/events"
															)
											}
										>
											Cancel
										</Button>
									</Box>
								</Box>
							</form>
						</Paper>
					</Container>
				)}
			</>
		);
	}
}

// for getting current form values from global state
const selector = formValueSelector("EventForm");

const mapStateToProps = (state, ownProps) => {
	let values = {};

	if (state.form.EventForm) {
		values = state.form.EventForm.values;
	}

	return {
		initialValues: values,
		onlineEventSwitch: selector(state, "onlineEventSwitch"),
		mapSwitch: selector(state, "mapSwitch"),
	};
};

const actions = {
	createEvent,
	updateEvent,
	openModal,
};

const validate = combineValidators({
	title: isRequired({ message: "Please give your event a name" }),
	category: isRequired({ message: "The Event Category is required" }),
	description: composeValidators(
		isRequired({ message: "The Event Description is required" }),
		hasLengthGreaterThan(4)({
			message: "Event Description must be at least 5 characters",
		})
	)(),
	date: isRequired({ message: "Event Date is required" }),
	time: isRequired({ message: "Event Time is required" }),
	AddressLine1: isRequired({ message: " Location Address is required" }),
});

const eventForm = reduxForm({
	form: "EventForm",
	validate,
})(EventForm);

export default connect(mapStateToProps, actions)(withStyles(styles)(eventForm));

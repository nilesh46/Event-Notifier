import { Button, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { openModal } from "../../redux/actions";

class testComponent extends Component {
	handleOpenModal = () => {
		console.log("test");
		this.props.openModal("AlertModal", { data: "test data" });
	};

	handleClick = () => {
		let gapi = window.gapi;
		gapi.load("client:auth2", () => {
			console.log("loaded");

			gapi.client.init({
				apiKey: "AIzaSyB4urMGosMPih9tWRug0wIunbHhnXLS4Lg",
				clientId:
					"194221353848-dtofbj4303s0nio20j1vbf5e9sbhppj4.apps.googleusercontent.com",
				discoveryDocs: [
					"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
				],
				scope: "https://www.googleapis.com/auth/calendar.events",
			});

			gapi.client.load("calendar", "v3", () => console.log(gapi));

			gapi.auth2
				.getAuthInstance()
				.signIn()
				.then(() => {
					let event = {
						summary: "Google I/O 2015",
						location: "800 Howard St., San Francisco, CA 94103",
						description:
							"A chance to hear more about Google's developer products.",
						start: {
							dateTime: "2020-12-24T09:00:00-07:00",
							// timeZone: "Asia/Kolkata",
						},
						end: {
							dateTime: "2020-12-24T17:00:00-07:00",
							// timeZone: "Asia/Kolkata",
						},
						attendees: [
							{ email: "lpage@example.com" },
							{ email: "sbrin@example.com" },
						],
						reminders: {
							useDefault: false,
							overrides: [
								{ method: "email", minutes: 24 * 60 },
								{ method: "popup", minutes: 10 },
							],
						},
					};

					var request = gapi.client.calendar.events.insert({
						calendarId: "primary",
						resource: event,
					});
					console.log(event);
					request.execute(function (event) {
						//window.open(event.htmlLink);
						console.log("success");
					});

					gapi.auth2.getAuthInstance().signOut();
				});
		});
	};

	render() {
		const { data, loading } = this.props;
		return (
			<div>
				This is for testing
				<div>Test Value: {data}</div>
				<Button variant="contained" color="primary">
					{loading && <CircularProgress size={20} />}
					{!loading && "Test Action"}
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={this.handleOpenModal}
				>
					open modal
				</Button>
				<Button onClick={this.handleClick}>Add Event</Button>
			</div>
		);
	}
}

const actions = { openModal };
const mapStateToProps = (state) => {
	return {
		data: state.test.data,
		loading: state.async.loading,
	};
};

export default connect(mapStateToProps, actions)(testComponent);

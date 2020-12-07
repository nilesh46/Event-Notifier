import { fetchSampleData } from "../../App/Data/mockApi";
import {
	TEST_ACTION,
	DELETE_EVENT,
	OPEN_MODAL,
	CLOSE_MODAL,
	ASYNC_ACTION_START,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_ERROR,
	FETCH_EVENTS,
} from "./types";
import { toastr } from "react-redux-toastr";
import history from "../../history";
import { SubmissionError } from "redux-form";
import { createNewEvent } from "../../App/Util/helpers";
import userPNG from "../../Assets/user.png";
import { getFirebase } from "react-redux-firebase";

// Test Actions
export const testAction = () => {
	return {
		type: TEST_ACTION,
	};
};

export const testActionAsync = () => {
	return async (dispatch) => {
		dispatch(asyncActionStart());
		await delay(1000);
		dispatch(testAction());
		dispatch(asyncActionFinish());
	};
};

// Events Actions
export const createEvent = (event) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();

		const user = firebase.auth().currentUser;
		// const photoURL = getState().firebase.profile.photoURL;
		const photoURL = user.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			let createdEvent = await firestore
				.collection("events")
				.add(newEvent);

			await firestore
				.collection("event_attendee")
				.doc(`${createdEvent.id}_${user.uid}`)
				.set({
					eventId: createdEvent.id,
					userUid: user.uid,
					eventDate: event.date,
					host: true,
					category: event.category,
				});

			toastr.success("Success!!! ", "Event has been created");
			return createdEvent;
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const updateEvent = (event, eventId) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();

		try {
			await firestore.collection("events").doc(`${eventId}`).set(event);
			toastr.success("Success!!! ", "Event has been updated");
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const joinEvent = (event) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = firebase.auth().currentUser;
		// const photoURL = getState().firebase.profile.photoURL;
		const photoURL = user.photoURL;

		const newAttendee = {
			id: user.uid,
			going: true,
			joinDate: new Date(),
			photoURL: photoURL || userPNG,
			displayName: user.displayName,
			host: false,
		};

		try {
			await firestore
				.collection("events")
				.doc(`${event.id}`)
				.update({ [`attendees.${user.uid}`]: newAttendee });

			await firestore
				.collection("event_attendee")
				.doc(`${event.id}_${user.uid}`)
				.set({
					eventId: event.id,
					userUid: user.uid,
					eventDate: event.date,
					host: false,
					category: event.category,
				});

			toastr.success("Success!!! ", "You successfully joined the event");
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const cancelJoiningEvent = (event) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = firebase.auth().currentUser;

		try {
			await firestore
				.collection("events")
				.doc(`${event.id}`)
				.update({
					[`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete(),
				});

			await firestore
				.collection("event_attendee")
				.doc(`${event.id}_${user.uid}`)
				.delete();

			toastr.success(
				"Success!!! ",
				"You have removed yourself from the event"
			);
		} catch (error) {
			console.log(error);
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const deleteEvent = (eventId) => {
	return {
		type: DELETE_EVENT,
		payload: {
			eventId,
		},
	};
};

export const loadEvents = () => {
	return async (dispatch) => {
		try {
			dispatch(asyncActionStart());
			const events = await fetchSampleData();
			dispatch({ type: FETCH_EVENTS, payload: { events } });
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
			dispatch(asyncActionError());
		}
	};
};

// Modal Actions
export const openModal = (modalType, modalProps) => {
	return {
		type: OPEN_MODAL,
		payload: {
			modalType,
			modalProps,
		},
	};
};

export const closeModal = () => {
	return {
		type: CLOSE_MODAL,
	};
};

// Async Actions
export const asyncActionStart = () => {
	return {
		type: ASYNC_ACTION_START,
	};
};

export const asyncActionFinish = () => {
	return {
		type: ASYNC_ACTION_FINISH,
	};
};

export const asyncActionError = () => {
	return {
		type: ASYNC_ACTION_ERROR,
	};
};

// Auth Actions
export const login = ({ firebase }, creds) => async (dispatch) => {
	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(creds.email, creds.password);

		history.push("/events");
		// history.go(0);
	} catch (error) {
		let msg;
		const cases = [
			"There is no user record corresponding to this identifier. The user may have been deleted.",
			"The email address is badly formatted.",
			"The password is invalid or the user does not have a password.",
		];
		switch (error.message) {
			case cases[0]:
				msg =
					"The email address you have entered is not registered with this app";

				break;
			case cases[1]:
				msg = "Please check your email address";

				break;
			case cases[2]:
				msg = "Invalid Password";

				break;
			default:
				break;
		}

		throw new SubmissionError({
			_error: msg,
		});
	}
};

export const registerUser = ({ firebase, firestore }, creds) => async (
	dispatch
) => {
	try {
		//creating a user in auth
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);

		//updates the auth profile
		await createdUser.user.updateProfile({
			displayName: creds.firstName,
		});

		//creating new profile in firestore
		let newUser = {
			displayName: createdUser.user.displayName,
			email: createdUser.user.email,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		};

		// adding new user in users collection
		await firebase
			.firestore()
			.collection("users")
			.doc(createdUser.user.id)
			.set(newUser);

		history.push("/events");
		// history.go(0);
	} catch (error) {
		throw new SubmissionError({
			_error: error.message,
		});
	}
};

export const socialLogin = ({ firebase }, selectedProvider) => async (
	dispatch
) => {
	try {
		const user = await firebase.login({
			provider: selectedProvider,
			type: "popup",
		});
		if (user.additionalUserInfo.isNewUser) {
			const newuser = await firebase
				.firestore()
				.collection("users")
				.doc(user.id)
				.set({
					displayName: user.user.displayName,
					email: user.user.email,
					photoURL: user.user.photoURL || null,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				});
			console.log(newuser);
		}

		history.push("/events");
		// history.go(0);
	} catch (error) {}
};

const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

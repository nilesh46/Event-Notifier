import { fetchSampleData } from "../../App/Data/mockApi";
import {
	TEST_ACTION,
	CREATE_EVENT,
	UPDATE_EVENT,
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
	return async (dispatch) => {
		try {
			dispatch({
				type: CREATE_EVENT,
				payload: {
					event,
				},
			});
			toastr.success("Success!!! ", "Event has been created");
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const updateEvent = (event) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: {
					event,
				},
			});
			toastr.success("Success!!! ", "Event has been updated");
		} catch (error) {
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
		history.go(0);
	} catch (error) {
		console.log(error);
		throw new SubmissionError({
			_error: error.message,
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

		console.log(createdUser);
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
		console.log("newUser" + newUser);

		// adding new user in users collection
		await firebase
			.firestore()
			.collection("users")
			.doc(createdUser.user.id)
			.set(newUser);

		history.push("/events");
		history.go(0);
	} catch (error) {
		console.log(error);
		throw new SubmissionError({
			_error: error.message,
		});
	}
};

const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

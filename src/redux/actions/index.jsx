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

const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

import {
	ASYNC_ACTION_ERROR,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_START,
} from "../actions/types";
import { createReducer } from "./createReducer";

const initialState = {
	loading: false,
};

const asyncActionStarted = (state) => {
	return {
		...state,
		loading: true,
	};
};

const asyncActionError = (state) => {
	return {
		...state,
		loading: false,
	};
};

const asyncActionFinished = (state) => {
	return {
		...state,
		loading: false,
	};
};

export default createReducer(initialState, {
	[ASYNC_ACTION_START]: asyncActionStarted,
	[ASYNC_ACTION_FINISH]: asyncActionFinished,
	[ASYNC_ACTION_ERROR]: asyncActionError,
});

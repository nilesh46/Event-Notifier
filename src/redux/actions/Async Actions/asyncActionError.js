import { ASYNC_ACTION_ERROR } from "../types";

export const asyncActionError = () => {
	return {
		type: ASYNC_ACTION_ERROR,
	};
};

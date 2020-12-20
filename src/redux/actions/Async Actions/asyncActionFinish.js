import { ASYNC_ACTION_FINISH } from "../types";

export const asyncActionFinish = () => {
	return {
		type: ASYNC_ACTION_FINISH,
	};
};

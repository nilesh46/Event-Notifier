import { OPEN_MODAL } from "../types";

export const openModal = (modalType, modalProps) => {
	return {
		type: OPEN_MODAL,
		payload: {
			modalType,
			modalProps,
		},
	};
};

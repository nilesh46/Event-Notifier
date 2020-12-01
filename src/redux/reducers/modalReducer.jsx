import { CLOSE_MODAL, OPEN_MODAL } from "../actions/types";
import { createReducer } from "./createReducer";

const initialState = null;

const openModal = (state, payload) => {
	const { modalType, modalProps } = payload;

	return { modalType, modalProps };
};

const closeModal = (state) => {
	return null;
};

export default createReducer(initialState, {
	[OPEN_MODAL]: openModal,
	[CLOSE_MODAL]: closeModal,
});

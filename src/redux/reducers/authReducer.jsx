import { LOGIN_USER, LOGOUT_USER } from "../actions/types";
import { createReducer } from "./createReducer";

const initialState = {
	authenticated: false,
	currentUser: null,
};

const loginUser = (state, payload) => {
	return {
		authenticated: true,
		currentUser: payload.creds.email,
	};
};

const logoutUser = () => {
	return {
		authenticated: false,
		currentUser: null,
	};
};

export default createReducer(initialState, {
	[LOGIN_USER]: loginUser,
	[LOGOUT_USER]: logoutUser,
});

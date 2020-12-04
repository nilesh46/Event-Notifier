import { combineReducers } from "redux";
import testReducer from "./testReducer";
import eventReducer from "./eventReducer";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import modalReducer from "./modalReducer";
import asyncReducer from "./asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";

export default combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	test: testReducer,
	events: eventReducer,
	form: formReducer,
	modals: modalReducer,
	async: asyncReducer,
	toastr: toastrReducer,
	auth: authReducer,
});

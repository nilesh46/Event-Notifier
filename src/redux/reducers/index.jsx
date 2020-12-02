import { combineReducers } from "redux";
import testReducer from "./testReducer";
import eventReducer from "./eventReducer";
import { reducer as formReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import modalReducer from "./modalReducer";
import asyncReducer from "./asyncReducer";

export default combineReducers({
	test: testReducer,
	events: eventReducer,
	form: formReducer,
	modals: modalReducer,
	async: asyncReducer,
	toastr: ToastrReducer,
});

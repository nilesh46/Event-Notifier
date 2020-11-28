import { combineReducers } from "redux";
import testReducer from "./testReducer";
import eventReducer from "./eventReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
	test: testReducer,
	events: eventReducer,
	form: formReducer,
});

import { TEST_ACTION } from "../actions/types";
import { createReducer } from "./createReducer";

const INITIAL_STATE = {
    data: 52,
};

const testAction = (state) => {
    return { ...state, data: state.data + 10 };
};

const fnMap = {
    [TEST_ACTION]: testAction,
};

export default createReducer(INITIAL_STATE, fnMap);

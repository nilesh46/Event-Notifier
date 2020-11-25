import { createStore, compose, applyMiddleware } from "redux";
import reducers from "../reducers";
import reduxThunk from "redux-thunk";

export const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  return store;
};

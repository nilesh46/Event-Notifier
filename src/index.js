import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import App from "./App/Layout/App";
import reportWebVitals from "./reportWebVitals";
import ReduxToastr from "react-redux-toastr";
import { Router } from "react-router-dom";
import { configureStore } from "./redux/store/configureStore";
import { Provider } from "react-redux";
import ScrollToTop from "./App/Util/ScrollToTop";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./App/Config/firebase";
import { createFirestoreInstance } from "redux-firestore";
import history from "./history";

const store = configureStore();

const rrfConfig = {
	userProfiles: "users",
	attachAuthReady: true,
	useFirestoreForProfile: true,
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

const rootEl = document.getElementById("root");

let render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<ScrollToTop />
				<ReduxToastr
					position="bottom-right"
					transitionIn="fadeIn"
					transitionOut="fadeOut"
					progressBar
				/>
				<ReactReduxFirebaseProvider {...rrfProps}>
					<App />
				</ReactReduxFirebaseProvider>
			</Router>
		</Provider>,
		rootEl
	);
};

if (module.hot) {
	module.hot.accept("./App/Layout/App", () => {
		setTimeout(render);
	});
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

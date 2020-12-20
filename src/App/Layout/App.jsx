import { Container } from "@material-ui/core";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import "./App.css";
import NavBar from "../../features/NavBar/navbarComponent";
import HomePage from "../../features/Home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/User/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../features/User/UserDetailed/UserDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import testComponent from "../../Test/Components/testComponent";
import ModalManager from "../../features/Modals/ModalManager";
import { connect } from "react-redux";
import EmailVerificationPage from "../../features/Verification/EmailVerificationPage";
import PasswordResetPage from "../../features/Verification/PasswordResetPage";
import BasicPage from "../../features/User/Settings/BasicPage";
import AboutPage from "../../features/User/Settings/AboutPage";
import PhotosPage from "../../features/User/Settings/Photos/PhotosPage";
import AccountPage from "../../features/User/Settings/AccountPage";
import HelmetMetaData from "../Util/HelmetMetaData";
import EventPhoto from "../../features/event/EventForm/EventPhoto";
import MainLoader from "../Util/CustomLoadingComponents/MainLoader";
import ScrollTopButton from "../Util/ScrollTopButton";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Switch as SwitchButton } from "@material-ui/core";
import { useState } from "react";

const themeObject = {
	palette: {
		type: "light",
	},
	backgr: {
		backgroundColor: "#eaecfa",
	},
};

const useDarkMode = () => {
	const [theme, setTheme] = useState(themeObject);

	const {
		palette: { type },
		backgr: { backgroundColor },
	} = theme;
	const toggleDarkMode = () => {
		const updatedTheme = {
			palette: {
				...theme.palette,
				type: type === "light" ? "dark" : "light",
			},
			backgr: {
				...theme.backgr,
				backgroundColor:
					backgroundColor === "#eaecfa" ? "#232324" : "#eaecfa",
			},
		};
		setTheme(updatedTheme);
	};
	return [theme, toggleDarkMode];
};

const App = (props) => {
	const [theme, toggleDarkMode] = useDarkMode();
	const themeConfig = createMuiTheme(theme);

	const auth = props.auth;
	const authenticated = auth.isLoaded && !auth.isEmpty;
	const emailVerified = auth.emailVerified;
	const IsOauth =
		authenticated && auth.providerData[0].providerId !== "password";
	const verified = emailVerified || IsOauth;

	const verifiedPaths = ["/", "/resetPassword"];
	const IsPathVerified =
		verifiedPaths.indexOf(window.location.pathname) !== -1;

	return (
		<ThemeProvider theme={themeConfig}>
			<>
				<HelmetMetaData></HelmetMetaData>
				<ModalManager />
				{IsPathVerified && (
					<>
						<Route path="/" exact component={HomePage} />
						<Route
							path="/resetPassword"
							exact
							component={PasswordResetPage}
						/>
					</>
				)}

				{!IsPathVerified && !authenticated && <MainLoader />}

				{authenticated && !verified && <EmailVerificationPage />}
				{authenticated && verified && (
					<Route
						path="/(.+)"
						render={() => (
							<div style={themeConfig.backgr}>
								<NavBar />
								<FormControlLabel
									style={{
										marginTop: "6rem",
										marginLeft: "1rem",
									}}
									control={
										<SwitchButton
											onClick={toggleDarkMode}
											color="secondary"
										/>
									}
								/>
								<Container
									maxWidth="lg"
									style={{ marginTop: "1rem" }}
								>
									<Switch key={props.location.key}>
										<>
											<Route
												path="/events"
												exact
												component={EventDashboard}
											/>
											<Route
												path="/events/:id"
												exact
												component={EventDetailedPage}
											/>
											<Route
												path="/people"
												exact
												component={PeopleDashboard}
											/>
											<Route
												path="/profile/:id"
												exact
												component={UserDetailedPage}
											/>
											<Route
												path="/settings/basic"
												exact
												component={BasicPage}
											/>
											<Route
												path="/settings/about"
												exact
												component={AboutPage}
											/>
											<Route
												path="/settings/photos"
												component={PhotosPage}
											/>
											<Route
												path="/settings/account"
												component={AccountPage}
											/>
											<Route
												path={[
													"/createEvent",
													"/manage/:id",
												]}
												exact
												component={EventForm}
											/>
											<Route
												path="/setPhoto/:id"
												exact
												component={EventPhoto}
											/>
											{/* <Route path="/myEvents" exact component={MyEvents} />
                            <Route path="/help" exact component={Help} /> */}
											<Route
												path="/testing"
												exact
												component={testComponent}
											/>
										</>
									</Switch>
								</Container>
								<ScrollTopButton />
							</div>
						)}
					/>
				)}
			</>
		</ThemeProvider>
	);
};

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(withRouter(App));

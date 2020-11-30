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
import SettingsDashboard from "../../features/User/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import testComponent from "../../Test/Components/testComponent";
import ModalManagar from "../../features/Modals/ModalManagar";

class App extends React.Component {
    render() {
        return (
            <>
                <ModalManagar />
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/(.+)"
                    render={() => (
                        <>
                            <NavBar />
                            <Container maxWidth="lg">
                                <Switch key={this.props.location.key}>
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
                                        path="/settings"
                                        component={SettingsDashboard}
                                    />
                                    <Route
                                        path={["/createEvent", "/manage/:id"]}
                                        exact
                                        component={EventForm}
                                    />
                                    {/* <Route path="/myEvents" exact component={MyEvents} />
                            <Route path="/help" exact component={Help} /> */}
                                    <Route
                                        path="/testing"
                                        exact
                                        component={testComponent}
                                    />
                                </Switch>
                            </Container>
                        </>
                    )}
                />
            </>
        );
    }
}

export default withRouter(App);

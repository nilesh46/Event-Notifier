import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import "./App.css";
import NavBar from "./NavBar/navbarComponent";
import HomePage from "../../features/Home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/User/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../features/User/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/User/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/events" exact component={EventDashboard} />
            <Route path="/events/:id" exact component={EventDetailedPage} />
            <Route path="/people" exact component={PeopleDashboard} />
            <Route path="/profile/:id" exact component={UserDetailedPage} />
            <Route path="/settings" exact component={SettingsDashboard} />
            <Route path="/createevent" exact component={EventForm} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

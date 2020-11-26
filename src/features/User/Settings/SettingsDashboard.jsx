import React from "react";
import { Grid } from "@material-ui/core";
import SettingsNav from "./SettingsNav";
import { Route, Switch } from "react-router-dom";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";

class SettingsDashboard extends React.Component {
    
    render() {
        return (
            <Grid
                container
                justify="flex-start"
                spacing={5}
            >
                <Grid item sm={5} xs={12}>
                    <SettingsNav />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Switch>
                        <Route path='/settings/basic' exact component={BasicPage} />
                        <Route path='/settings/about' exact component={AboutPage} />
                        <Route path='/settings/photos' component={PhotosPage} />
                        <Route path='/settings/account' component={AccountPage} />
                    </Switch>
                </Grid>
            </Grid>
        );
    }
};

export default SettingsDashboard;

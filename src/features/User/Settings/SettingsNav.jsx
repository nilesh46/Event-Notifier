import React from 'react';
import { List, ListSubheader, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { withStyles } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { Paper } from "@material-ui/core"; 
import { Divider } from "@material-ui/core"; 
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
    root: {
        display: "flex",
    },
    paper: {
        marginBottom: "2rem",
        marginTop: "2rem",
        marginLeft: "2rem",
    },
    color: {
        backgroundColor: "#2E3B55",
        color: "white",
    }
};

class SettingsNav extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <List
                                component="nav"
                                subheader={
                                    <ListSubheader
                                        className={classes.color}
                                        component="div"
                                        id="nested-list-subheader"
                                    >
                                        Profile
                                    </ListSubheader>
                                }
                            >
                                <Divider />
                                <ListItem button component={Link} to='/settings/basic'>
                                    <ListItemIcon>
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Basic Details" />
                                </ListItem>

                                <Divider />
                                <ListItem button component={Link} to='/settings/about'>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="About Me" />
                                </ListItem>

                                <Divider />
                                <ListItem button component={Link} to='/settings/photos'>
                                    <ListItemIcon>
                                        <PhotoLibraryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Photos" />
                                </ListItem>
                                </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <List
                                component="nav"
                                subheader={
                                    <ListSubheader
                                        className={classes.color}
                                        component="div"
                                        id="nested-list-subheader"
                                    >
                                        Account
                                    </ListSubheader>
                                }
                            >
                                
                                <Divider />
                                <ListItem button component={Link} to='/settings/account'>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Account" />
                                </ListItem>
                                </List>
                            </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SettingsNav);
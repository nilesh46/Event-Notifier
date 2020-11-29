import { Grid, makeStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import { createEvent, updateEvent, deleteEvent } from "../../../redux/actions";

class EventDashboard extends Component {
    handleDeleteEvent = (id) => {
        this.props.deleteEvent(id);
    };

    render() {
        const classes = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
        }));

        const { events } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item md={8}>
                        <EventList
                            events={events}
                            deleteEvent={this.handleDeleteEvent}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <h1>Recent Activity</h1>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    events: state.events,
});

const actions = {
    createEvent,
    updateEvent,
    deleteEvent,
};

export default connect(mapStateToProps, actions)(EventDashboard);

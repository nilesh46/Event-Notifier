import { Grid } from "@material-ui/core";
import React from "react";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

const EventDetailedPage = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md xs={12}>
                    <EventDetailedHeader />
                    <EventDetailedInfo />
                </Grid>
                <Grid item md xs={12}>
                    <EventDetailedSidebar />
                </Grid>
                <Grid item md={12} xs={12}>
                    <EventDetailedChat />
                </Grid>
            </Grid>
        </div>
    );
};

export default EventDetailedPage;

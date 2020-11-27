import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    withStyles,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import React, { Component } from "react";

const style = (theme) => ({
    root: {
        backgroundColor: "",
    },
    btn: {
        marginLeft: "0.3rem",
        marginRight: "0.3rem",
    },
    dib: {
        display: "inline-block",
    },
});

class EventDetailedInfo extends Component {
    state = { open: false };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                <ListItem>
                    <ListItemIcon>
                        <InfoOutlinedIcon color="disabled" />
                    </ListItemIcon>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component={"div"}
                    >
                        Description of the event
                        <Typography variant="body2" color="textSecondary">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Dolor aliquid molestiae vitae blanditiis
                            repellendus. Molestias deleniti unde expedita. Eius
                            quaerat deleniti quo facere, quidem ratione beatae
                            veniam officia veritatis voluptatem!
                        </Typography>
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <EventOutlinedIcon color="disabled" />
                    </ListItemIcon>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component={"div"}
                    >
                        Event Date and Timing
                        <Typography variant="body2" color="textSecondary">
                            <strong>Date</strong> : November 27, 2020 <br />{" "}
                            <strong>Timing</strong> : 1:00 PM
                        </Typography>
                    </Typography>
                </ListItem>

                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <LocationOnOutlinedIcon color="disabled" />
                    </ListItemIcon>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                    >
                        <Box style={{ width: "50%" }}>
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                component={"div"}
                            >
                                Event Venue
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Studio 103 <br />
                                    The Business Centre 61, Wellfield Road
                                    <br />
                                    Roath, Cardiff
                                </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                className={classes.btn}
                            >
                                View Map
                            </Button>
                        </Box>
                    </Box>
                </ListItem>
            </List>
        );
    }
}
export default withStyles(style)(EventDetailedInfo);

import {
    Avatar,
    Box,
    Chip,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    withStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import GroupIcon from "@material-ui/icons/Group";
import React, { Component } from "react";
import indigo from "@material-ui/core/colors/indigo";

const style = (theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
    attendee: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
        width: "100%",
        "&:hover": {
            backgroundColor: indigo[600],
        },
    },
});

class EventDetailedSidebar extends Component {
    state = { open: false };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };
    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                <ListItem
                    button
                    onClick={this.handleClick}
                    className={classes.attendee}
                >
                    <ListItemIcon>
                        <GroupIcon style={{ color: "#FFF" }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body1">
                            <strong>3</strong> People are Going
                        </Typography>
                    </ListItemText>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Box style={{ height: "40vh", overflowY: "auto" }}>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <Avatar
                                        alt="UserName"
                                        src="https://source.unsplash.com/300x500/?person"
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        <strong>UserName</strong>
                                    </Typography>
                                </ListItemText>
                                <Chip label="HOST" color="secondary" />
                            </ListItem>

                            <Divider />

                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <Avatar
                                        alt="UserName"
                                        src="https://source.unsplash.com/300x500/?person"
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        <strong>UserName</strong>
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            {[...new Array(12)].map(() => (
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <Avatar
                                            alt="UserName"
                                            src="https://source.unsplash.com/300x500/?person"
                                        />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            <strong>UserName</strong>
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Box>
            </List>
        );
    }
}

export default withStyles(style)(EventDetailedSidebar);

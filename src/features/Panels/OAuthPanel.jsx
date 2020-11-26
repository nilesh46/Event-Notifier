import { Box, Button, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";

const style = (theme) => ({
    root: {
        backgroundColor: "white",
        borderTop: "1px dotted #333",
        paddingTop: "2px",
    },
});

const FacebookButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: "100%",
        "&:hover": {
            backgroundColor: blue[700],
        },
    },
}))(Button);

const GoogleButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(grey[100]),
        backgroundColor: grey[50],
        width: "100%",
        "&:hover": {
            backgroundColor: grey[300],
        },
    },
}))(Button);

class OAuthPanel extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Box display="flex">
                    <GoogleButton variant="contained">
                        <img src="./assets/icons/google.svg" alt="google" />
                        <Typography>
                            <strong>Google</strong>
                        </Typography>
                    </GoogleButton>
                    <FacebookButton variant="contained">
                        <img src="./assets/icons/facebook.svg" alt="facebook" />
                        <Typography>
                            <strong>Facebook</strong>
                        </Typography>
                    </FacebookButton>
                </Box>
            </div>
        );
    }
}

export default withStyles(style)(OAuthPanel);

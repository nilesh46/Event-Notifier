import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Comment from "./Chats/Comment";
import indigo from "@material-ui/core/colors/indigo";

class EventDetailedChat extends Component {
    render() {
        return (
            <Paper variant="outlined">
                {/* Heading */}
                <Box
                    textAlign="center"
                    bgcolor={indigo["500"]}
                    color="#FFF"
                    py="1rem"
                >
                    <Typography component="h1" variant="h5">
                        Comments
                    </Typography>
                </Box>
                <Divider />
                {/* Comment Box */}
                <Box style={{ width: "100%", overflowX: "auto" }} my="2rem">
                    {[...new Array(3)].map(() => (
                        <div>
                            <Box my="1rem">
                                <Comment replies={1} />
                            </Box>
                            <Box px="3rem">
                                <Divider />
                            </Box>
                        </div>
                    ))}
                </Box>
            </Paper>
        );
    }
}

export default EventDetailedChat;

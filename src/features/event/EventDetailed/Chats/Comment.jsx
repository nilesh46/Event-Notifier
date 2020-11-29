import {
    Avatar,
    Box,
    ButtonBase,
    Collapse,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
    root: {},
    replyBtn: {
        marginRight: "1rem",
        color: grey["500"],
        "&:hover": {
            color: grey["700"],
        },
    },
}));

const renderReplies = (replies) => {
    if (replies >= 1)
        return (
            <div>
                <Comment replies={0} />
            </div>
        );
    return null;
};

const Comment = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const classes = useStyles();

    return (
        <div>
            {/* Comment */}
            <Box display="flex" alignItems="center">
                {/* Avatar of the user */}
                <Box m="1rem">
                    <Avatar
                        alt="Username"
                        src="https://source.unsplash.com/300x500/?user"
                        variant="rounded"
                    />
                </Box>
                <Box>
                    <Box display="flex" alignItems="center">
                        {/* Username */}
                        <Box>
                            <Typography variant="body1">Username</Typography>
                        </Box>
                        {/* Time span of the comment */}
                        <Box mx="0.5rem" style={{ width: "max-content" }}>
                            <Typography variant="body2" color="textSecondary">
                                Today at 5:42PM
                            </Typography>
                        </Box>
                    </Box>
                    {/* Comment */}
                    <Box style={{ maxWidth: "50vw" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Unde, iure.
                    </Box>
                    {/* Reply Button */}
                    <Box>
                        <ButtonBase className={classes.replyBtn}>
                            <Typography variant="caption">Reply</Typography>
                        </ButtonBase>

                        <ButtonBase
                            className={classes.replyBtn}
                            onClick={handleClick}
                        >
                            <Typography variant="caption">
                                View Replies {`(${props.replies})`}
                            </Typography>
                        </ButtonBase>
                    </Box>
                </Box>
            </Box>
            {/* Replies */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box mx="2rem" mt="1rem">
                    {renderReplies(props.replies)}
                </Box>
            </Collapse>
        </div>
    );
};

export default Comment;

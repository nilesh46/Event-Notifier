import {
	Avatar,
	Box,
	ButtonBase,
	Collapse,
	Divider,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React from "react";
import grey from "@material-ui/core/colors/grey";
import { formatDistance } from "date-fns";
import CommentForm from "./CommentForm";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

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

const RenderReplies = (
	replies,
	handleShowReplyForm,
	showReplyForm,
	selectedComment,
	addEventComment,
	eventId,
	handleCloseReplyForm,
	firebase
) => {
	if (replies && replies.length >= 1)
		return (
			<div>
				{replies &&
					replies.map((comment) => (
						<div key={comment.id}>
							<Box my="1rem" width="100%">
								<Comment
									replies={comment.childNodes}
									comment={comment}
									handleShowReplyForm={handleShowReplyForm}
									showReplyForm={showReplyForm}
									selectedComment={selectedComment}
									addEventComment={addEventComment}
									eventId={eventId}
									firebase={firebase}
									handleCloseReplyForm={handleCloseReplyForm}
								/>
							</Box>
							{showReplyForm && selectedComment === comment.id && (
								<Box p="1rem" style={{ width: "65vw" }}>
									<CommentForm
										addEventComment={addEventComment}
										eventId={eventId}
										firebase={firebase}
										parentId={comment.id}
										form={`reply_${comment.id}`}
										handleCloseReplyForm={
											handleCloseReplyForm
										}
									/>
								</Box>
							)}
							<Box px="3rem">
								<Divider />
							</Box>
						</div>
					))}
			</div>
		);
	return null;
};

const Comment = ({
	replies,
	comment,
	handleShowReplyForm,
	handleCloseReplyForm,
	showReplyForm,
	selectedComment,
	addEventComment,
	eventId,
	firebase,
}) => {
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
						src={comment.photoURL}
						variant="rounded"
					/>
				</Box>
				<Box>
					<Box display="flex" alignItems="center">
						{/* Username */}
						<Box>
							<Typography variant="body1">
								<b>{comment.displayName}</b>
							</Typography>
						</Box>
						{/* Time span of the comment */}
						<Box mx="0.5rem" style={{ width: "max-content" }}>
							<Typography variant="body2" color="textSecondary">
								{formatDistance(comment.date, Date.now())}
							</Typography>
						</Box>
					</Box>
					{/* Comment */}
					<Box style={{ maxWidth: "50vw" }}>{comment.text}</Box>
					{/* Reply Button */}
					<Box>
						<ButtonBase
							className={classes.replyBtn}
							onClick={handleShowReplyForm(comment.id)}
						>
							<Typography variant="caption">Reply</Typography>
						</ButtonBase>

						<ButtonBase
							className={classes.replyBtn}
							onClick={handleClick}
						>
							{!open && (
								<Box display="flex" alignItems="center">
									<Typography variant="caption">
										View Replies {`(${replies.length})`}
									</Typography>
									<ArrowDropDownIcon fontSize="small" />
								</Box>
							)}
							{open && (
								<Box display="flex" alignItems="center">
									<Typography variant="caption">
										Close Replies {`(${replies.length})`}
									</Typography>
									<ArrowDropUpIcon fontSize="small" />
								</Box>
							)}
						</ButtonBase>
					</Box>
				</Box>
			</Box>
			{/* Replies */}
			<Collapse in={open} timeout="auto" unmountOnExit>
				<Box mx="2rem" mt="1rem">
					{RenderReplies(
						replies,
						handleShowReplyForm,
						showReplyForm,
						selectedComment,
						addEventComment,
						eventId,
						handleCloseReplyForm,
						firebase
					)}
				</Box>
			</Collapse>
		</div>
	);
};

export default Comment;

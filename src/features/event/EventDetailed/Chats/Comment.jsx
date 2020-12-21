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
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuButton from "../../../NavBar/MenuButton";
import { initialize, reduxForm } from "redux-form";

const useStyles = makeStyles((theme) => ({
	root: {},
	replyBtn: {
		marginRight: "1rem",
		color: grey["500"],
		"&:hover": {
			color: grey["700"],
		},
	},
	linksSimple: {
		textDecoration: "none",
		color: "#000",
	},
}));

const RenderReplies = (
	replies,
	handleShowReplyForm,
	showReplyForm,
	selectedComment,
	eventId,
	handleCloseReplyForm,
	deleteEventComment,
	updateEventComment,
	dispatch,
	setInUpdate,
	commentIdForUpdate,
	userId
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
									eventId={eventId}
									handleCloseReplyForm={handleCloseReplyForm}
									deleteEventComment={deleteEventComment}
									updateEventComment={updateEventComment}
									dispatch={dispatch}
									setInUpdate={setInUpdate}
									commentIdForUpdate={commentIdForUpdate}
									userId={userId}
								/>
							</Box>
							{showReplyForm && selectedComment === comment.id && (
								<Box p="1rem" style={{ width: "65vw" }}>
									<CommentForm
										eventId={eventId}
										parentId={comment.id}
										form={`reply_${comment.id}`}
										handleCloseReplyForm={
											handleCloseReplyForm
										}
										commentIdForUpdate={commentIdForUpdate}
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
	eventId,
	deleteEventComment,
	updateEventComment,
	dispatch,
	setInUpdate,
	commentIdForUpdate,
	userId,
}) => {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleDeleteComment = () => {
		deleteEventComment(comment, eventId);
	};

	const handleUpdateComment = () => {
		setInUpdate(comment.id);
		if (comment.parentId !== 0) handleShowReplyForm(comment.id)();

		let formName;
		formName =
			comment.parentId === 0 ? "mainComment" : `reply_${comment.id}`;

		dispatch(initialize(formName, { comment: comment.text }));
	};

	const classes = useStyles();

	return (
		<div>
			{/* Comment */}
			<Box display="flex" alignItems="center">
				{/* Avatar of the user */}
				<Box m="1rem">
					<Link to={`/profile/${comment.uid}`}>
						<Avatar
							alt="Username"
							src={comment.photoURL}
							variant="rounded"
						/>
					</Link>
				</Box>
				<Box>
					<Box display="flex" alignItems="center">
						{/* Username */}
						<Box>
							<Typography variant="body1">
								<b>
									<Link
										to={`/profile/${comment.uid}`}
										className={classes.linksSimple}
									>
										{comment.displayName}
									</Link>
								</b>
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
					<Box display="flex" alignItems="center">
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
						{/* Options Menu Button*/}
						{userId === comment.uid && (
							<Box display="inline-block">
								<MenuButton
									iconType={MoreVertIcon}
									items={[
										{
											name: "Edit",
											action: handleUpdateComment,
											type: "Button",
										},
										{
											name: "Delete",
											action: handleDeleteComment,
											type: "Button",
										},
									]}
								/>
							</Box>
						)}
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
						eventId,
						handleCloseReplyForm,
						deleteEventComment,
						updateEventComment,
						dispatch,
						setInUpdate,
						commentIdForUpdate,
						userId
					)}
				</Box>
			</Collapse>
		</div>
	);
};

const BufferSolution = reduxForm({ form: "BufferFormForComment" })(Comment);

export default BufferSolution;

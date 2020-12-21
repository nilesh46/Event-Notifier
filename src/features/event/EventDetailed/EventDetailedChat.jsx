import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Comment from "./Chats/Comment";
import indigo from "@material-ui/core/colors/indigo";
import CommentForm from "./Chats/CommentForm";
import CommentIcon from "@material-ui/icons/Comment";
import { connect } from "react-redux";
import { deleteEventComment } from "../../../redux/actions/";

class EventDetailedChat extends Component {
	state = {
		showReplyForm: false,
		selectedComment: null,
		commentIdForUpdate: null,
	};

	handleShowReplyForm = (id) => () => {
		this.setState({ showReplyForm: true, selectedComment: id });
	};

	handleCloseReplyForm = () => {
		this.setState({
			showReplyForm: false,
			selectedComment: null,
			commentIdForUpdate: null,
		});
	};

	setInUpdate = (commentId) => {
		this.setState({ commentIdForUpdate: commentId });
	};

	setCommentIdForUpdateNull = () => {
		this.setState({ commentIdForUpdate: null });
	};

	render() {
		const {
			eventId,
			eventChat,
			deleteEventComment,
			updateEventComment,
		} = this.props;

		return (
			<Paper variant="outlined">
				{/* Heading */}
				<Box
					textAlign="center"
					bgcolor={indigo["500"]}
					color="#FFF"
					py="1rem"
				>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<CommentIcon fontSize="large" />
						<Typography component="h1" variant="h5">
							Comments
						</Typography>
					</Box>
				</Box>
				<Divider />
				{/* Comment Box */}
				<Box style={{ width: "100%", overflowX: "auto" }} my="2rem">
					{eventChat &&
						eventChat.map((comment) => (
							<div key={comment.id}>
								<Box my="1rem" width="100%">
									<Comment
										replies={comment.childNodes}
										comment={comment}
										handleShowReplyForm={
											this.handleShowReplyForm
										}
										showReplyForm={this.state.showReplyForm}
										selectedComment={
											this.state.selectedComment
										}
										eventId={eventId}
										handleCloseReplyForm={
											this.handleCloseReplyForm
										}
										deleteEventComment={deleteEventComment}
										updateEventComment={updateEventComment}
										setInUpdate={this.setInUpdate}
										commentIdForUpdate={
											this.state.commentIdForUpdate
										}
									/>
									{this.state.showReplyForm &&
										this.state.selectedComment ===
											comment.id && (
											<Box p="1rem">
												<CommentForm
													eventId={eventId}
													parentId={comment.id}
													form={`reply_${comment.id}`}
													handleCloseReplyForm={
														this
															.handleCloseReplyForm
													}
													commentIdForUpdate={
														this.state
															.commentIdForUpdate
													}
												/>
											</Box>
										)}
								</Box>
								<Box px="3rem">
									<Divider />
								</Box>
							</div>
						))}
					<Box p="1rem">
						<CommentForm
							eventId={eventId}
							form="mainComment"
							parentId={0}
							commentIdForUpdate={this.state.commentIdForUpdate}
							setCommentIdForUpdateNull={
								this.setCommentIdForUpdateNull
							}
						/>
					</Box>
				</Box>
			</Paper>
		);
	}
}

const actions = {
	deleteEventComment,
};

export default connect(null, actions)(EventDetailedChat);

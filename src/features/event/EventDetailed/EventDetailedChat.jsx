import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Comment from "./Chats/Comment";
import indigo from "@material-ui/core/colors/indigo";
import CommentForm from "./Chats/CommentForm";
import CommentIcon from "@material-ui/icons/Comment";

class EventDetailedChat extends Component {
	state = { showReplyForm: false, selectedComment: null };

	handleShowReplyForm = (id) => () => {
		this.setState({ showReplyForm: true, selectedComment: id });
	};

	handleCloseReplyForm = () => {
		this.setState({ showReplyForm: false, selectedComment: null });
	};

	render() {
		const { addEventComment, eventId, firebase, eventChat } = this.props;

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
										addEventComment={addEventComment}
										eventId={eventId}
										firebase={firebase}
										handleCloseReplyForm={
											this.handleCloseReplyForm
										}
									/>
									{this.state.showReplyForm &&
										this.state.selectedComment ===
											comment.id && (
											<Box p="1rem">
												<CommentForm
													addEventComment={
														addEventComment
													}
													eventId={eventId}
													firebase={firebase}
													parentId={comment.id}
													form={`reply_${comment.id}`}
													handleCloseReplyForm={
														this
															.handleCloseReplyForm
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
							addEventComment={addEventComment}
							eventId={eventId}
							firebase={firebase}
							form="mainComment"
							parentId={0}
						/>
					</Box>
				</Box>
			</Paper>
		);
	}
}

export default EventDetailedChat;

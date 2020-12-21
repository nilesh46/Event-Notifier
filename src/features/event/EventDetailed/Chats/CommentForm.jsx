import { Box, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import TextArea from "../../EventForm/FormInputs/TextArea";
import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import { addEventComment, updateEventComment } from "../../../../redux/actions";
import { connect } from "react-redux";

class CommentForm extends Component {
	handleCommentSubmit = (values) => {
		const {
			addEventComment,
			eventId,
			handleCloseReplyForm,
			parentId,
			commentIdForUpdate,
			updateEventComment,
			setCommentIdForUpdateNull,
		} = this.props;

		if (commentIdForUpdate !== null) {
			updateEventComment(eventId, values, commentIdForUpdate);
			if (parentId === 0) setCommentIdForUpdateNull();
		} else addEventComment(eventId, values, parentId);

		if (parentId !== 0) handleCloseReplyForm();
	};

	render() {
		const {
			handleCloseReplyForm,
			reset,
			parentId,
			commentIdForUpdate,
		} = this.props;
		return (
			<Box>
				<form
					onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}
				>
					<Field
						name="comment"
						component={TextArea}
						rows="3"
						label="Add a comment"
					/>
					<Box mt="0.5rem" display="flex" alignItems="center">
						<Button
							variant="contained"
							color="primary"
							size="small"
							type="submit"
							startIcon={<CreateIcon />}
						>
							{commentIdForUpdate !== null
								? "Update"
								: "Add Reply"}
						</Button>
						{parentId !== 0 && (
							<Box ml="0.2rem">
								<Button
									variant="contained"
									color="secondary"
									size="small"
									type="submit"
									startIcon={<ClearIcon />}
									onClick={() => {
										reset();
										handleCloseReplyForm();
									}}
								>
									Cancel
								</Button>
							</Box>
						)}
					</Box>
				</form>
			</Box>
		);
	}
}

const actions = {
	addEventComment,
	updateEventComment,
};

const validate = combineValidators({
	comment: isRequired({ message: "Please enter a comment to add" }),
});

const commentForm = reduxForm({ Fields: "comment", validate })(CommentForm);

export default connect(null, actions)(commentForm);

import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

export const deleteEventComment = (comment, eventId) => async (dispatch) => {
	const firebase = getFirebase();
	let eventCommentsRef = firebase.database().ref(`event_chat/${eventId}`);
	try {
		let commentIds = [];
		commentIds.push(comment.id);
		const getChildNodes = (childNodes) => {
			if (childNodes.length > 0)
				for (let index = 0; index < childNodes.length; index++) {
					commentIds.push(childNodes[index].id);
					getChildNodes(childNodes[index].childNodes);
				}
			else return;
		};

		getChildNodes(comment.childNodes);

		for (let index = 0; index < commentIds.length; index++) {
			eventCommentsRef
				.orderByChild("id")
				.equalTo(commentIds[index])
				.on("child_added", async (commentSnap) => {
					await commentSnap.ref.remove();
					commentSnap.ref.off();
				});
		}

		toastr.success("Success!!! ", "Comment Deleted");
	} catch (error) {
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

export const updateEventComment = (eventId, values, commentId) => async (
	dispatch,
	getState
) => {
	const firebase = getFirebase();
	let eventCommentsRef = firebase.database().ref(`event_chat/${eventId}`);

	try {
		eventCommentsRef
			.orderByChild("id")
			.equalTo(commentId)
			.on("child_added", async (commentSnap) => {
				await commentSnap.ref.update({
					text: values.comment,
					date: Date.now(),
				});
				commentSnap.ref.off();
			});

		toastr.success("Success!!! ", "Comment updated successfully");
	} catch (error) {
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

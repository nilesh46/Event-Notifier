import { toastr } from "react-redux-toastr";

export const addEventComment = (firebase, eventId, values, parentId) => async (
	dispatch,
	getState
) => {
	try {
		const user = getState().firebase.profile;
		const photoURL = user.photoURL;
		const displayName = user.displayName;

		const newComment = {
			displayName,
			photoURL,
			parentId,
			uid: user.uid,
			text: values.comment,
			date: Date.now(),
			id: user.uid + Date.now(),
		};

		await firebase.push(`event_chat/${eventId}`, newComment);
		toastr.success("Success!!! ", "Comment added successfully");
	} catch (error) {
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

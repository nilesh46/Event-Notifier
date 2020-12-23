import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const cancelJoiningEvent = (event) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = getState().firebase.profile;

		try {
			dispatch(asyncActionStart());
			await firestore
				.collection("events")
				.doc(`${event.id}`)
				.update({
					[`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete(),
				});

			await firestore
				.collection("event_attendee")
				.doc(`${event.id}_${user.uid}`)
				.delete();

			dispatch(asyncActionFinish());
			toastr.success(
				"Success!!! ",
				"You have removed yourself from the event"
			);
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error(
				"Oops",
				"Something went wrong. Please retry / Check your internet connection"
			);
		}
	};
};

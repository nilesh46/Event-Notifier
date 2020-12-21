import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";
import userPNG from "../../../Assets/user.png";

export const joinEvent = (event) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = firebase.auth().currentUser;
		const photoURL = user.photoURL;

		const newAttendee = {
			id: user.uid,
			going: true,
			joinDate: new Date(),
			photoURL: photoURL || userPNG,
			displayName: user.displayName,
			host: false,
		};

		const eventDocRef = firestore.collection("events").doc(event.id);
		const eventAttendeeDocRef = firestore
			.collection("event_attendee")
			.doc(`${event.id}_${user.id}`);
		try {
			dispatch(asyncActionStart());
			await firestore.runTransaction(async (transaction) => {
				await transaction.get(eventDocRef);
				transaction.update(eventDocRef, {
					[`attendees.${user.uid}`]: newAttendee,
				});
				transaction.set(eventAttendeeDocRef, {
					eventId: event.id,
					userUid: user.uid,
					eventDate: event.date,
					host: false,
					category: event.category,
				});
			});

			dispatch(asyncActionFinish());
			toastr.success("Success!!! ", "You successfully joined the event");
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error(
				"Oops",
				"Something went wrong. Please retry / Check your internet connection"
			);
		}
	};
};

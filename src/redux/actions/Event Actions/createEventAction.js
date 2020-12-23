import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../../App/Util/helpers";
import { extraActivitiesDelete } from "../../../App/Util/helpers";
import history from "../../../history";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const createEvent = (event) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();

		const user = getState().firebase.profile;
		const photoURL = user.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			dispatch(asyncActionStart());
			let createdEvent = await firestore
				.collection("events")
				.add(newEvent);

			await firestore
				.collection("event_attendee")
				.doc(`${createdEvent.id}_${user.uid}`)
				.set({
					eventId: createdEvent.id,
					userUid: user.uid,
					eventDate: newEvent.date,
					host: true,
					category: event.category,
				});
			extraActivitiesDelete(firebase);
			dispatch(asyncActionFinish());
			history.push(`/events/${createdEvent.id}`);
			toastr.success("Success!!! ", "Event has been created");
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error(
				"Oops",
				"Something went wrong. Please retry / Check your internet connection"
			);
			console.log(error);
		}
	};
};

import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import history from "../../../history";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const updateEvent = (event, eventId) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const eventDocRef = firestore.collection("events").doc(eventId);
		const eventAttendeeRef = firestore.collection("event_attendee");

		try {
			dispatch(asyncActionStart());
			let batch = firestore.batch();

			//updating event in events collection
			batch.update(eventDocRef, { ...event });

			//updating data related to event in event_attendee collection
			let eventQuery = eventAttendeeRef.where("eventId", "==", eventId);
			let eventQuerySnap = await eventQuery.get();

			for (let index = 0; index < eventQuerySnap.docs.length; index++) {
				let eventAttendeeDocRef = eventQuerySnap.docs[index].ref;
				batch.update(eventAttendeeDocRef, {
					eventDate: event.date,
					category: event.category,
				});
			}

			await batch.commit();

			dispatch(asyncActionFinish());
			history.push(`/events/${eventId}`);
			toastr.success("Success!!! ", "Event has been updated");
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error(
				"Oops",
				"Something went wrong. Please retry / Check your internet connection"
			);
		}
	};
};

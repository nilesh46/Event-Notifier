import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import history from "../../../history";
import { extraActivitiesDelete } from "../../../App/Util/helpers";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const deleteEvent = (eventId) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		try {
			dispatch(asyncActionStart());
			// deleting the event doc from events collection
			await firestore.collection("events").doc(eventId).delete();

			//deleting events from event_attendee
			const eventsRef1 = firestore.collection("event_attendee");
			const query1 = eventsRef1.where("eventId", "==", eventId);
			let querySnap1 = await query1.get();

			for (let index = 0; index < querySnap1.docs.length; index++) {
				await querySnap1.docs[index].ref.delete();
			}

			//deleting comments of event from RTDB
			await firebase.remove(`event_chat/${eventId}`);

			//deleting storage related to event from storage bucket
			const uid = firebase.auth().currentUser.uid;
			const storageRef = await firebase
				.storage()
				.ref()
				.child(`${uid}/myEvents/${eventId}`);
			const folders = await storageRef.listAll();
			for (let index = 0; index < folders.prefixes.length; index++) {
				let files = await folders.prefixes[index].listAll();
				for (let index = 0; index < files.items.length; index++) {
					await files.items[index].delete();
				}
			}
			extraActivitiesDelete(firebase);
			dispatch(asyncActionFinish());
			history.push("/events");
			toastr.success(
				"Success!!! ",
				"You have deleted your event successfully"
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

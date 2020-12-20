import { getFirebase } from "react-redux-firebase";
import { FETCH_EVENTS } from "../types";

export const getUserEvents = (userUid, activeTab) => async (
	dispatch,
	getState
) => {
	const firestore = getFirebase().firestore();
	const today = new Date();
	const eventsRef = firestore.collection("event_attendee");
	let query;
	switch (activeTab) {
		case 1:
			//past events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", "<=", today)
				.orderBy("eventDate", "desc");
			break;
		case 2:
			//future events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", ">=", today)
				.orderBy("eventDate");
			break;
		case 3:
			//hosted events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("host", "==", true)
				.orderBy("eventDate", "desc");
			break;
		default:
			//all events
			query = eventsRef
				.where("userUid", "==", userUid)
				.orderBy("eventDate", "desc");
			break;
	}

	try {
		let querySnap = await query.get();
		let events = [];

		for (let index = 0; index < querySnap.docs.length; index++) {
			const event = await firestore
				.collection("events")
				.doc(querySnap.docs[index].data().eventId)
				.get();

			events.push({ ...event.data(), id: event.id });
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
	} catch (error) {}
};

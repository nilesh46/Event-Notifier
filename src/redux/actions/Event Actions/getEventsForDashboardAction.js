import { getFirebase } from "react-redux-firebase";
import { FETCH_EVENTS } from "../types";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const getEventsForDashboard = (lastEvent) => async (
	dispatch,
	getState
) => {
	let today = new Date();
	const firestore = getFirebase().firestore();
	const eventRef = firestore.collection("events");
	try {
		dispatch(asyncActionStart());
		let startAfter = lastEvent && (await eventRef.doc(lastEvent.id).get());
		let query;
		if (lastEvent)
			query = eventRef
				.where("date", ">=", today)
				.orderBy("date")
				.startAfter(startAfter)
				.limit(2);
		else
			query = eventRef
				.where("date", ">=", today)
				.orderBy("date")
				.limit(2);

		let querySnap = await query.get();

		if (querySnap.docs.length === 0) {
			dispatch(asyncActionFinish());
			return querySnap;
		}

		let events = [];
		for (let index = 0; index < querySnap.docs.length; index++) {
			const event = {
				...querySnap.docs[index].data(),
				id: querySnap.docs[index].id,
			};
			events.push(event);
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionFinish());
		return querySnap;
	} catch (error) {
		dispatch(asyncActionError());
	}
};

import { getFirebase } from "react-redux-firebase";
import { FETCH_EVENTS } from "../types";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const getEventsForDashboard = (lastEvent, date, sort) => async (
	dispatch,
	getState
) => {
	let fromDate;
	fromDate = date ? date : new Date();
	let orderBy;
	orderBy = sort === "Soonest" ? "asc" : "desc";
	const firestore = getFirebase().firestore();
	const eventRef = firestore.collection("events");
	try {
		dispatch(asyncActionStart());
		let startAfter = lastEvent && (await eventRef.doc(lastEvent.id).get());
		let query;
		if (lastEvent)
			query = eventRef
				.where("date", ">=", fromDate)
				.orderBy("date", orderBy)
				.startAfter(startAfter)
				.limit(2);
		else
			query = eventRef
				.where("date", ">=", fromDate)
				.orderBy("date", orderBy)
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

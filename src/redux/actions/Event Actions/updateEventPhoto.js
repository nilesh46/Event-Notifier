import { getFirebase } from "react-redux-firebase";

export const updateEventPhoto = (downloadURL, eventId) => async (dispatch) => {
	try {
		const firebase = getFirebase();
		await firebase.firestore().collection("events").doc(eventId).update({
			photoURL: downloadURL,
		});
	} catch (error) {
		throw error;
	}
};

import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";
import { extraActivitiesDelete } from "../../../App/Util/helpers";

export const deleteFileInEvent = (fileRef, eventId) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();

	const eventDocRef = firestore.collection("events").doc(eventId);
	try {
		dispatch(asyncActionStart());

		//deleting file from storage bucket
		await fileRef.delete();

		//deleting file from event
		eventDocRef.update({
			[`files.${
				fileRef.name.split(".")[0]
			}`]: firebase.firestore.FieldValue.delete(),
		});

		extraActivitiesDelete(firebase);
		dispatch(asyncActionFinish());
		toastr.success("Success!!! ", "Your file has been removed");
	} catch (error) {
		dispatch(asyncActionError());
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

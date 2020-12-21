import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { extraActivitiesDelete } from "../../../App/Util/helpers";

export const setFilesInEvent = (url, eventId, fileName, fileSize) => async (
	dispatch
) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();

	const newFile = {
		id: fileName.split(".")[0],
		name: fileName,
		size: `${parseInt(Math.round(fileSize / 1024))} KB`,
		url: url,
	};

	const eventDocRef = firestore.collection("events").doc(eventId);
	try {
		await eventDocRef.update({ [`files.${newFile.id}`]: newFile });
		extraActivitiesDelete(firebase);
	} catch (error) {
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

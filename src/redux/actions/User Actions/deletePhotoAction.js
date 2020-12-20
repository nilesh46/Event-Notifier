import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const deletePhoto = (fileName, id) => async (dispatch) => {
	const firebase = getFirebase();
	const uid = firebase.auth().currentUser.uid;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${uid}/user_images/${fileName}`);
	try {
		dispatch(asyncActionStart());

		await photoRef.delete();
		await firebase
			.firestore()
			.collection("users")
			.doc(uid)
			.collection("photos")
			.doc(id)
			.delete();

		dispatch(asyncActionFinish());
		toastr.success(
			"Success!!! ",
			"Your photo has been deleted successfully"
		);
	} catch (error) {
		dispatch(asyncActionError());
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

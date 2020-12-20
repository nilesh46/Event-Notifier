import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const unfollowUser = (userToBeUnfollowed) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userRef = firestore.collection("users");
	const userDocRef = userRef.doc(user.uid);
	try {
		dispatch(asyncActionStart());
		await userDocRef
			.collection("following")
			.doc(userToBeUnfollowed.uid)
			.delete();

		dispatch(asyncActionFinish());
	} catch (err) {
		dispatch(asyncActionError());
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

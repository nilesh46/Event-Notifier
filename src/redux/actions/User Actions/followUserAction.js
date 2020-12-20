import { getFirebase } from "react-redux-firebase";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const followUser = (userToBeFollowed) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userRef = firestore.collection("users");
	const userDocRef = userRef.doc(user.uid);
	try {
		dispatch(asyncActionStart());
		await userDocRef
			.collection("following")
			.doc(userToBeFollowed.uid)
			.set({
				city: userToBeFollowed.city || "Unknown City",
				displayName: userToBeFollowed.displayName,
				photoURL: userToBeFollowed.photoURL,
			});
		dispatch(asyncActionFinish());
	} catch (err) {
		console.error(err);
		dispatch(asyncActionError());
	}
};

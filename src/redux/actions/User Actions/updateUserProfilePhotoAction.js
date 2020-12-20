import { getFirebase } from "react-redux-firebase";

export const updateUserProfilePhoto = (downloadURL, filename) => async (
	dispatch
) => {
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	const userDocRef = firebase.firestore().collection("users").doc(user.uid);
	try {
		const userDoc = await userDocRef.get();
		if (!userDoc.data().photoURL) {
			await firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.update({
					photoURL: downloadURL,
				});
			await user.updateProfile({
				photoURL: downloadURL,
			});
		}
		return await firebase
			.firestore()
			.collection("users")
			.doc(user.uid)
			.collection("photos")
			.add({
				name: filename,
				url: downloadURL,
			});
	} catch (error) {
		throw error;
	}
};

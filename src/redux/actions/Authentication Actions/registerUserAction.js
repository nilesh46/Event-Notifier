import { SubmissionError } from "redux-form";
import history from "../../../history";

export const registerUser = ({ firebase, firestore }, creds) => async (
	dispatch
) => {
	try {
		//creating a user in auth
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);

		//updates the auth profile
		await createdUser.user.updateProfile({
			displayName: creds.firstName + " " + creds.lastName,
		});

		//creating new profile in firestore
		let newUser = {
			displayName: createdUser.user.displayName,
			email: createdUser.user.email,
			createdAt: Date.now(),
			uid: createdUser.user.uid,
		};

		// adding new user in users collection
		await firebase
			.firestore()
			.collection("users")
			.doc(createdUser.user.uid)
			.set(newUser);

		history.push("/events");
	} catch (error) {
		throw new SubmissionError({
			_error: error.message,
		});
	}
};

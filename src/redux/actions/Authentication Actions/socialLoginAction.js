import { toastr } from "react-redux-toastr";
import history from "../../../history";

export const socialLogin = ({ firebase }, selectedProvider) => async (
	dispatch
) => {
	try {
		const user = await firebase.login({
			provider: selectedProvider,
			type: "popup",
		});

		if (user !== undefined && user.additionalUserInfo.isNewUser) {
			await firebase
				.firestore()
				.collection("users")
				.doc(user.user.uid)
				.set({
					displayName: user.user.displayName,
					email: user.user.email,
					photoURL: user.user.photoURL || null,
					createdAt: Date.now(),
					uid: user.user.uid,
				});
		}

		history.push("/events");
	} catch (error) {
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

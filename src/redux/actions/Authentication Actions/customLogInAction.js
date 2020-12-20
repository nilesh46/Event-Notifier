import { SubmissionError } from "redux-form";
import history from "../../../history";

export const login = ({ firebase }, creds) => async (dispatch) => {
	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(creds.email, creds.password);

		history.push("/events");
	} catch (error) {
		let msg;
		const cases = [
			"There is no user record corresponding to this identifier. The user may have been deleted.",
			"The email address is badly formatted.",
			"The password is invalid or the user does not have a password.",
		];
		switch (error.message) {
			case cases[0]:
				msg =
					"The email address you have entered is not registered with this app";

				break;
			case cases[1]:
				msg = "Please check your email address";

				break;
			case cases[2]:
				msg = "Invalid Password";

				break;
			default:
				break;
		}

		throw new SubmissionError({
			_error: msg,
		});
	}
};

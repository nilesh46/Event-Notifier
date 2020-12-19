import {
	TEST_ACTION,
	OPEN_MODAL,
	CLOSE_MODAL,
	ASYNC_ACTION_START,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_ERROR,
	FETCH_EVENTS,
} from "./types";
import { toastr } from "react-redux-toastr";
import history from "../../history";
import { SubmissionError } from "redux-form";
import { createNewEvent } from "../../App/Util/helpers";
import userPNG from "../../Assets/user.png";
import { getFirebase } from "react-redux-firebase";

// Test Actions
export const testAction = () => {
	return {
		type: TEST_ACTION,
	};
};

export const testActionAsync = () => {
	return async (dispatch) => {
		dispatch(asyncActionStart());
		await delay(1000);
		dispatch(testAction());
		dispatch(asyncActionFinish());
	};
};

// Events Actions
export const createEvent = (event) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();

		const user = firebase.auth().currentUser;
		// const photoURL = getState().firebase.profile.photoURL;
		const photoURL = user.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			dispatch(asyncActionStart());
			let createdEvent = await firestore
				.collection("events")
				.add(newEvent);

			await firestore
				.collection("event_attendee")
				.doc(`${createdEvent.id}_${user.uid}`)
				.set({
					eventId: createdEvent.id,
					userUid: user.uid,
					eventDate: event.date,
					host: true,
					category: event.category,
				});

			dispatch(asyncActionFinish());
			history.push(`/events/${createdEvent.id}`);
			toastr.success("Success!!! ", "Event has been created");
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const updateEvent = (event, eventId) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const eventDocRef = firestore.collection("events").doc(eventId);
		const eventAttendeeRef = firestore.collection("event_attendee");

		try {
			dispatch(asyncActionStart());
			let batch = firestore.batch();

			//updating event in events collection
			batch.update(eventDocRef, { ...event });

			//updating data related to event in event_attendee collection
			let eventQuery = eventAttendeeRef.where("eventId", "==", eventId);
			let eventQuerySnap = await eventQuery.get();

			for (let index = 0; index < eventQuerySnap.docs.length; index++) {
				let eventAttendeeDocRef = eventQuerySnap.docs[index].ref;
				batch.update(eventAttendeeDocRef, {
					eventDate: event.date,
					category: event.category,
				});
			}

			await batch.commit();

			dispatch(asyncActionFinish());
			history.push(`/events/${eventId}`);
			toastr.success("Success!!! ", "Event has been updated");
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const joinEvent = (event) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = firebase.auth().currentUser;
		const photoURL = user.photoURL;

		const newAttendee = {
			id: user.uid,
			going: true,
			joinDate: new Date(),
			photoURL: photoURL || userPNG,
			displayName: user.displayName,
			host: false,
		};

		const eventDocRef = firestore.collection("events").doc(event.id);
		const eventAttendeeDocRef = firestore
			.collection("event_attendee")
			.doc(`${event.id}_${user.id}`);
		try {
			dispatch(asyncActionStart());
			await firestore.runTransaction(async (transaction) => {
				await transaction.get(eventDocRef);
				transaction.update(eventDocRef, {
					[`attendees.${user.uid}`]: newAttendee,
				});
				transaction.set(eventAttendeeDocRef, {
					eventId: event.id,
					userUid: user.uid,
					eventDate: event.date,
					host: false,
					category: event.category,
				});
			});

			dispatch(asyncActionFinish());
			toastr.success("Success!!! ", "You successfully joined the event");
		} catch (error) {
			dispatch(asyncActionError());
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const cancelJoiningEvent = (event) => {
	return async (dispatch) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		const user = firebase.auth().currentUser;

		try {
			await firestore
				.collection("events")
				.doc(`${event.id}`)
				.update({
					[`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete(),
				});

			await firestore
				.collection("event_attendee")
				.doc(`${event.id}_${user.uid}`)
				.delete();

			toastr.success(
				"Success!!! ",
				"You have removed yourself from the event"
			);
		} catch (error) {
			console.log(error);
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const deleteEvent = (eventId) => {
	return async (dispatch, getState) => {
		const firebase = getFirebase();
		const firestore = firebase.firestore();
		try {
			dispatch(asyncActionStart());
			// deleting the event doc from events collection
			await firestore.collection("events").doc(eventId).delete();

			//deleting events from event_attendee
			const eventsRef1 = firestore.collection("event_attendee");
			const query1 = eventsRef1.where("eventId", "==", eventId);
			let querySnap1 = await query1.get();

			for (let index = 0; index < querySnap1.docs.length; index++) {
				await querySnap1.docs[index].ref.delete();
			}

			//deleting comments of event from RTDB
			await firebase.remove(`event_chat/${eventId}`);

			//deleting activities related to event
			const eventsRef2 = firestore.collection("activity");
			const query2 = eventsRef2.where("eventId", "==", eventId);
			let querySnap2 = await query2.get();

			for (let index = 0; index < querySnap2.docs.length; index++) {
				await querySnap2.docs[index].ref.delete();
			}

			//deleting storage related to event from storage bucket
			const uid = firebase.auth().currentUser.uid;
			const storageRef = await firebase
				.storage()
				.ref()
				.child(`${uid}/myEvents/${eventId}`);
			const folders = await storageRef.listAll();
			for (let index = 0; index < folders.prefixes.length; index++) {
				let files = await folders.prefixes[index].listAll();
				for (let index = 0; index < files.items.length; index++) {
					await files.items[index].delete();
				}
			}

			dispatch(asyncActionFinish());
			history.push("/events");
			toastr.success(
				"Success!!! ",
				"You have deleted your event successfully"
			);
		} catch (error) {
			console.log(error);
			dispatch(asyncActionError());
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const getEventsForDashboard = (lastEvent) => async (
	dispatch,
	getState
) => {
	let today = new Date();
	const firestore = getFirebase().firestore();
	const eventRef = firestore.collection("events");
	try {
		dispatch(asyncActionStart());
		let startAfter = lastEvent && (await eventRef.doc(lastEvent.id).get());
		let query;
		if (lastEvent)
			query = eventRef
				.where("date", ">=", today)
				.orderBy("date")
				.startAfter(startAfter)
				.limit(2);
		else
			query = eventRef
				.where("date", ">=", today)
				.orderBy("date")
				.limit(2);

		let querySnap = await query.get();

		if (querySnap.docs.length === 0) {
			dispatch(asyncActionFinish());
			return querySnap;
		}

		let events = [];
		for (let index = 0; index < querySnap.docs.length; index++) {
			const event = {
				...querySnap.docs[index].data(),
				id: querySnap.docs[index].id,
			};
			events.push(event);
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionFinish());
		return querySnap;
	} catch (error) {
		console.log(error);
		dispatch(asyncActionError());
	}
};

export const updateEventPhoto = ({ firebase }, downloadURL, eventId) => async (
	dispatch
) => {
	try {
		await firebase.firestore().collection("events").doc(eventId).update({
			photoURL: downloadURL,
		});
	} catch (error) {
		console.log(error);
		toastr.error("Oops", "Something went wrong");
	}
};

export const addEventComment = (firebase, eventId, values, parentId) => async (
	dispatch,
	getState
) => {
	try {
		const user = getState().firebase.profile;
		const photoURL = user.photoURL;
		const displayName = user.displayName;

		const newComment = {
			displayName,
			photoURL,
			parentId,
			uid: user.uid,
			text: values.comment,
			date: Date.now(),
			id: user.uid + Date.now(),
		};

		await firebase.push(`event_chat/${eventId}`, newComment);
		toastr.success("Success!!! ", "Comment added successfully");
	} catch (error) {
		console.log(error);
		toastr.error("Oops", "Something went wrong");
	}
};

// Modal Actions
export const openModal = (modalType, modalProps) => {
	return {
		type: OPEN_MODAL,
		payload: {
			modalType,
			modalProps,
		},
	};
};

export const closeModal = () => {
	return {
		type: CLOSE_MODAL,
	};
};

// Async Actions
export const asyncActionStart = () => {
	return {
		type: ASYNC_ACTION_START,
	};
};

export const asyncActionFinish = () => {
	return {
		type: ASYNC_ACTION_FINISH,
	};
};

export const asyncActionError = () => {
	return {
		type: ASYNC_ACTION_ERROR,
	};
};

// Auth Actions
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
	} catch (error) {}
};

//User Actions
export const updateUserProfilePhoto = (
	{ firebase },
	downloadURL,
	filename
) => async (dispatch) => {
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

export const deletePhoto = ({ firebase }, fileName, id) => async (dispatch) => {
	const uid = firebase.auth().currentUser.uid;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${uid}/user_images/${fileName}`);
	try {
		await photoRef.delete();
		await firebase
			.firestore()
			.collection("users")
			.doc(uid)
			.collection("photos")
			.doc(id)
			.delete();
	} catch (error) {
		toastr.error(error.message);
		throw error;
	}
};

export const setMainPhoto = (url) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	let userDocRef = firestore.collection("users").doc(user.uid);
	let eventAttendeeRef = firestore.collection("event_attendee");
	let activityRef = firestore.collection("activity");
	const today = new Date();

	try {
		dispatch(asyncActionStart());
		let batch = firestore.batch();
		//upadting the user profile photo
		batch.update(userDocRef, { photoURL: url });

		//updating the user photo in events
		let eventQuery = eventAttendeeRef
			.where("userUid", "==", user.uid)
			.where("eventDate", ">=", today);

		let eventQuerySnap = await eventQuery.get();

		for (let index = 0; index < eventQuerySnap.docs.length; index++) {
			let eventId = await eventQuerySnap.docs[index].data().eventId;
			let eventDocRef = firestore.collection("events").doc(eventId);
			let event = await eventDocRef.get();
			if (event.data().hostUid === user.uid) {
				batch.update(eventDocRef, {
					hostPhotoURL: url,
					[`attendees.${user.uid}.photoURL`]: url,
				});
			} else {
				batch.update(eventDocRef, {
					[`attendees.${user.uid}.photoURL`]: url,
				});
			}

			//updating comment photoURL in RTDB
			let eventCommentsRef = firebase
				.database()
				.ref(`event_chat/${eventId}`);

			eventCommentsRef
				.orderByChild("uid")
				.equalTo(user.uid)
				.on("child_added", async (commentSnap) => {
					await commentSnap.ref.update({ photoURL: url });
					commentSnap.ref.off();
				});
		}

		//updating the user photo in activity
		let activityQuery = activityRef.where("hostUid", "==", user.uid);

		let activityQuerySnap = await activityQuery.get();

		for (let index = 0; index < activityQuerySnap.docs.length; index++) {
			let activityDocRef = activityQuerySnap.docs[index].ref;
			batch.update(activityDocRef, { hostPhotoURL: url });
		}

		await batch.commit();
		dispatch(asyncActionFinish());
		toastr.success("Success!!! ", "Your Profile Photo has been updated");
	} catch (error) {
		toastr.error(error.message);
		console.log(error);
	}
};

export const getUserEvents = (userUid, activeTab) => async (
	dispatch,
	getState
) => {
	dispatch(asyncActionStart());
	const firestore = getFirebase().firestore();
	const today = new Date();
	const eventsRef = firestore.collection("event_attendee");
	let query;
	switch (activeTab) {
		case 1:
			//past events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", "<=", today)
				.orderBy("eventDate", "desc");
			break;
		case 2:
			//future events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", ">=", today)
				.orderBy("eventDate");
			break;
		case 3:
			//hosted events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("host", "==", true)
				.orderBy("eventDate", "desc");
			break;
		default:
			//all events
			query = eventsRef
				.where("userUid", "==", userUid)
				.orderBy("eventDate", "desc");
			break;
	}

	try {
		let querySnap = await query.get();
		let events = [];

		for (let index = 0; index < querySnap.docs.length; index++) {
			const event = await firestore
				.collection("events")
				.doc(querySnap.docs[index].data().eventId)
				.get();

			events.push({ ...event.data(), id: event.id });
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionFinish());
	} catch (error) {
		console.log(error);
		dispatch(asyncActionError());
	}
};

export const followUser = (userToBeFollowed) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userRef = firestore.collection("users");
	const userDocRef = userRef.doc(user.uid);
	try {
		await userDocRef
			.collection("following")
			.doc(userToBeFollowed.uid)
			.set({
				city: userToBeFollowed.city || "Unknown City",
				displayName: userToBeFollowed.displayName,
				photoURL: userToBeFollowed.photoURL,
			});
	} catch (err) {
		console.error(err);
	}
};

export const unfollowUser = (userToBeUnfollowed) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const userRef = firestore.collection("users");
	const userDocRef = userRef.doc(user.uid);
	try {
		await userDocRef
			.collection("following")
			.doc(userToBeUnfollowed.uid)
			.delete();

		console.log("deleted");
	} catch (err) {
		console.error(err);
	}
};

const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

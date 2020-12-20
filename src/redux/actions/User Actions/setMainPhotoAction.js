import { getFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { asyncActionFinish, asyncActionStart, asyncActionError } from "..";

export const setMainPhoto = (url) => async (dispatch) => {
	const firebase = getFirebase();
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const usersRef = firestore.collection("users");
	const userDocRef = usersRef.doc(user.uid);
	const eventAttendeeRef = firestore.collection("event_attendee");
	const activityRef = firestore.collection("activity");
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

		//updating the user photo in my followers accounts
		let followersSnap = await userDocRef.collection("followers").get();
		for (let index = 0; index < followersSnap.docs.length; index++) {
			let followerDocRef = usersRef.doc(followersSnap.docs[index].id);
			let followingDocRef = followerDocRef
				.collection("following")
				.doc(user.uid);
			batch.update(followingDocRef, { photoURL: url });
		}

		//updating the user photo in my followings accounts
		let followingSnap = await userDocRef.collection("following").get();
		for (let index = 0; index < followingSnap.docs.length; index++) {
			let followingDocRef = usersRef.doc(followingSnap.docs[index].id);
			let followerDocRef = followingDocRef
				.collection("followers")
				.doc(user.uid);
			batch.update(followerDocRef, { photoURL: url });
		}

		await batch.commit();
		dispatch(asyncActionFinish());
		toastr.success("Success!!! ", "Your Profile Photo has been updated");
	} catch (error) {
		dispatch(asyncActionError());
		toastr.error(
			"Oops",
			"Something went wrong. Please retry / Check your internet connection"
		);
	}
};

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
	return {
		type: type,
		eventDate: event.date,
		hostedBy: event.hostedBy,
		title: event.title,
		hostPhotoURL: event.hostPhotoURL,
		timestamp: new Date(),
		hostUid: event.hostUid,
		eventId: id,
	};
};

exports.createActivity = functions.firestore
	.document("events/{eventId}")
	.onCreate((snapshot, context) => {
		let createdEvent = snapshot.data();

		const activity = newActivity(
			"newEvent",
			createdEvent,
			context.params.eventId
		);

		console.log(activity);

		return admin
			.firestore()
			.collection("activity")
			.add(activity)
			.then((docRef) => {
				return console.log("Activity created with Id : ", docRef.id);
			})
			.catch((err) => {
				return console.log("Error adding activity ", err);
			});
	});

exports.updateActivity = functions.firestore
	.document("events/{eventId}")
	.onUpdate((event, context) => {
		let updatedEvent = event.after.data();
		let previousEvent = event.before.data();
		console.log(previousEvent);
		let prevAttendeesSize = Object.values(previousEvent.attendees).length;
		let updatedAttendeesSize = Object.values(updatedEvent.attendees).length;

		if (
			prevAttendeesSize !== updatedAttendeesSize ||
			previousEvent.hostPhotoURL !== updatedEvent.hostPhotoURL ||
			previousEvent.hostedBy !== updatedEvent.hostedBy
		) {
			return "No Activity Created";
		}
		const activity = newActivity(
			"updatedEvent",
			updatedEvent,
			context.params.eventId
		);

		return admin
			.firestore()
			.collection("activity")
			.add(activity)
			.then((docRef) => {
				return console.log("Activity created with Id : ", docRef.id);
			})
			.catch((err) => {
				return console.log("Error adding activity ", err);
			});
	});

exports.deleteActivity = functions.firestore
	.document("events/{eventId}")
	.onDelete((snapshot, context) => {
		let deletedEvent = snapshot.data();

		const activity = newActivity(
			"deletedEvent",
			deletedEvent,
			context.params.eventId
		);
		return admin
			.firestore()
			.collection("activity")
			.add(activity)
			.then((docRef) => {
				return console.log("Activity created with Id : ", docRef.id);
			})
			.catch((err) => {
				return console.log("Error adding activity ", err);
			});
	});

exports.userFollowing = functions.firestore
	.document("users/{followerUid}/following/{followingUid}")
	.onCreate((snapshot, context) => {
		const followingUid = context.params.followingUid;
		const followerUid = context.params.followerUid;

		const followerDoc = admin
			.firestore()
			.collection("users")
			.doc(followerUid);

		return followerDoc
			.get()
			.then((doc) => {
				console.log(doc.data());
				let followerInfo = {
					city: doc.data().city || "Unknown City",
					displayName: doc.data().displayName,
					photoURL: doc.data().photoURL,
				};
				return admin
					.firestore()
					.collection("users")
					.doc(followingUid)
					.collection("followers")
					.doc(followerUid)
					.set(followerInfo);
			})
			.catch((err) => {
				console.log(err);
			});
	});

exports.userUnfollowing = functions.firestore
	.document("users/{followerUid}/following/{followingUid}")
	.onDelete((snapshot, context) => {
		const followingUid = context.params.followingUid;
		const followerUid = context.params.followerUid;

		const followerDoc = admin
			.firestore()
			.collection("users")
			.doc(followerUid);

		return followerDoc
			.get()
			.then((doc) => {
				console.log(doc.data());
				return admin
					.firestore()
					.collection("users")
					.doc(followingUid)
					.collection("followers")
					.doc(followerUid)
					.delete();
			})
			.catch((err) => {
				console.log(err);
			});
	});

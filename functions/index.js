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

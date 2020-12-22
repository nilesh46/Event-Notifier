import userPNG from "../../Assets/user.png";

export const createNewEvent = (user, photoURL, event) => {
	return {
		...event,
		hostUid: user.uid,
		hostPhotoURL: photoURL || userPNG,
		hostedBy: user.displayName,
		created: new Date(),
		attendees: {
			[user.uid]: {
				id: user.uid,
				going: true,
				joinDate: new Date(),
				photoURL: photoURL || userPNG,
				displayName: user.displayName,
				host: true,
			},
		},
	};
};

export const createDataTree = (dataset) => {
	let hashTable = Object.create(null);
	dataset.forEach((a) => (hashTable[a.id] = { ...a, childNodes: [] }));
	let dataTree = [];
	dataset.forEach((a) => {
		if (a.parentId !== 0)
			hashTable[a.parentId].childNodes.push(hashTable[a.id]);
		else dataTree.push(hashTable[a.id]);
	});
	return dataTree;
};

export const extraActivitiesDelete = async (firebase) => {
	let activityRef = firebase.firestore().collection("activity");
	let query;
	query = activityRef.orderBy("timestamp", "desc");
	let querySnap = await query.get();
	if (querySnap.docs.length > 4) {
		for (let i = 4; i < querySnap.docs.length; i++) {
			await querySnap.docs[i].ref.delete();
		}
	}
};

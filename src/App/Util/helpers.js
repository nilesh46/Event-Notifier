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

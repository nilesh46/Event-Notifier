import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../actions/types";
import { createReducer } from "./createReducer";

const initialState = [
	{
		id: "1",
		title: "Trip to Tower of London",
		startDate: "2018-03-27",
		endDate: "2018-03-29",
		category: "Culture",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
		city: "London, UK",
		venue: "Tower of London, St Katharine's & Wapping, London",
		hostedBy: "Bob",
		hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
		attendees: [
			{
				id: "b",
				name: "Tom",
				photoURL: "https://randomuser.me/api/portraits/men/21.jpg",
			},
			{
				id: "a",
				name: "Bob",
				photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
			},
			{
				id: "c",
				name: "Cruise",
				photoURL: "https://randomuser.me/api/portraits/men/25.jpg",
			},
			{
				id: "d",
				name: "Tom",
				photoURL: "https://randomuser.me/api/portraits/men/28.jpg",
			},
			{
				id: "e",
				name: "Bob",
				photoURL: "https://randomuser.me/api/portraits/men/27.jpg",
			},
		],
	},
	{
		id: "2",
		title: "Trip to Punch and Judy Pub",
		startDate: "2018-03-28",
		endDate: "2018-03-30",
		category: "Meeting",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
		city: "London, UK",
		venue: "Punch & Judy, Henrietta Street, London, UK",
		hostedBy: "Tom",
		hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
		attendees: [
			{
				id: "b",
				name: "Tom",
				photoURL: "https://randomuser.me/api/portraits/men/21.jpg",
			},
			{
				id: "c",
				name: "Cruise",
				photoURL: "https://randomuser.me/api/portraits/men/25.jpg",
			},
			{
				id: "d",
				name: "Tom",
				photoURL: "https://randomuser.me/api/portraits/men/28.jpg",
			},
			{
				id: "e",
				name: "Bob",
				photoURL: "https://randomuser.me/api/portraits/men/27.jpg",
			},
		],
	},
];

const createEvent = (state, payload) => {
	return [...state, payload.event];
};

const updateEvent = (state, payload) => {
	return [
		...state.filter((event) => event.id !== payload.event.id),
		payload.event,
	];
};

const deleteEvent = (state, payload) => {
	return [...state.filter((event) => event.id !== payload.eventId)];
};

export default createReducer(initialState, {
	[CREATE_EVENT]: createEvent,
	[UPDATE_EVENT]: updateEvent,
	[DELETE_EVENT]: deleteEvent,
});

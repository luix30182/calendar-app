import { types } from '../types/types';
export interface calendarState {
	events: Array<calendarEvent>;
	activeEvent: any;
}

export interface calendarEvent {
	id: number;
	title: string;
	start: Date;
	end: Date;
	notes: Array<string>;
	user: {
		_id: string;
		name: string;
	};
}

const initialState: calendarState = {
	events: [],
	activeEvent: null,
};

export const calendarReducer = (
	state = initialState,
	action: { type: types; payload?: any }
) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};
		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};
		case types.eventUpdate:
			return {
				...state,
				events: state.events.map((e) =>
					e.id === action.payload.id ? action.payload : e
				),
			};
		case types.eventDeleted:
			return {
				...state,
				events: state.events.filter(
					(e) => state.activeEvent && e.id !== state.activeEvent.id
				),
				activeEvent: null,
			};
		case types.eventLoaded:
			return {
				...state,
				events: [...action.payload],
			};
		case types.eventLogout:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

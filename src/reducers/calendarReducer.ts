import { types } from '../types/types';
import moment from 'moment';

const initialState = {
	events: [
		{
			title: 'Birthday Sly',
			start: moment().toDate(),
			end: moment().add(2, 'hours').toDate(),
			notes: ['Comprar pastel'],
			user: {
				_id: '123',
				name: 'Mario',
			},
		},
	],
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
		default:
			return state;
	}
};

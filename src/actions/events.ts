import { types } from '../types/types';

export const eventAddNew = (event: any) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event: any) => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent,
});

export const eventUpdated = (event: any) => ({
	type: types.eventUpdate,
	payload: event,
});

export const eventDeleted = () => ({
	type: types.eventDeleted,
});

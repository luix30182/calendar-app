import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import { prepareEvents } from '../helpers/prepareEvents';
import Swal from 'sweetalert2';

export const eventStartAddNew = (event: any) => {
	return async (dispatch: any, getState: any) => {
		const { uid, name } = getState().auth;
		try {
			const res = await fetchWithToken('events', event, 'POST');
			const body = await res.json();

			if (body.ok) {
				event.id = body.savedEevnt.id;
				event.user = {
					_id: uid,
					name,
				};
				dispatch(eventAddNew(event));
			}
		} catch (e) {
			console.error(e);
		}
	};
};

const eventAddNew = (event: any) => ({
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

export const eventStartUpdate = (event: any) => {
	return async (dispatch: any) => {
		try {
			const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
			const body = await res.json();
			if (body.ok) {
				dispatch(eventUpdated(event));
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		} catch (error) {
			console.error(error);
		}
	};
};

const eventUpdated = (event: any) => ({
	type: types.eventUpdate,
	payload: event,
});

export const startEventDelete = () => {
	return async (dispatch: any, getState: any) => {
		const { id } = getState().calendar.activeEvent;

		try {
			const res = await fetchWithToken(`events/${id}`, {}, 'DELETE');
			const body = await res.json();
			if (body.ok) {
				dispatch(eventDeleted());
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		} catch (error) {
			console.error(error);
		}
	};
};

const eventDeleted = () => ({
	type: types.eventDeleted,
});

export const eventStartLoading = () => {
	return async (dispatch: any) => {
		try {
			const resp = await fetchWithToken('events');
			const body = await resp.json();
			const events = prepareEvents(body.events);
			dispatch(eventLoaded(events));
		} catch (error) {
			console.error(error);
		}
	};
};

const eventLoaded = (events: any) => ({
	type: types.eventLoaded,
	payload: events,
});

export const eventLogout = () => ({
	type: types.eventLogout,
});

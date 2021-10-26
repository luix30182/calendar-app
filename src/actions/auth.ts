import { fetchNoToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = (email: string, password: string) => {
	return async (dispatch: any) => {
		const res = await fetchNoToken('auth', { email, password }, 'POST');
		const body = await res.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			dispatch(login({ uid: body.uid, name: body.name }));
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startRegister = (
	email: string,
	password: string,
	name: string
) => {
	return async (dispatch: any) => {
		const res = await fetchNoToken(
			'auth/new',
			{ email, password, name },
			'POST'
		);
		const body = await res.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			dispatch(login({ uid: body.uid, name: body.name }));
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch: any) => {
		const res = await fetchWithToken('auth/renew');
		const body = await res.json();

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime().toString());
			dispatch(login({ uid: body.uid, name: body.name }));
		} else {
			Swal.fire('Error', body.msg, 'error');
			dispatch(checkingFinish());
		}
	};
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user: any) => ({ type: types.authLogin, payload: user });

export const startLogOut = () => {
	return (dispatch: any) => {
		localStorage.clear();
		dispatch(logOut());
	};
};

const logOut = () => ({
	type: types.authLogout,
});

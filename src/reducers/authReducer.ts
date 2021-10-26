import { types } from '../types/types';

export interface authState {
	checking: boolean;
	uid: string;
	name: string;
}

const initialState: authState = {
	checking: true,
	uid: '',
	name: '',
};

export const authReducer = (
	state = initialState,
	action: { type: types; payload?: any }
) => {
	switch (action.type) {
		case types.authLogin:
			return {
				...state,
				checking: false,
				...action.payload,
			};
		default:
			return state;
	}
};

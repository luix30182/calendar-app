import { types } from '../types/types';

const initialStare = {
	modalOpen: false,
};

export const uiReducer = (
	state = initialStare,
	action: { type: types; payload: any }
) => {
	switch (action.type) {
		case types.uiOpenModal:
			return {
				...state,
				modalOpen: true,
			};
		default:
			return state;
	}
};

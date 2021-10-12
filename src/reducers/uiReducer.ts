import { types } from '../types/types';

export interface UiState {
	modalOpen: boolean;
}

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
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false,
			};
		default:
			return state;
	}
};

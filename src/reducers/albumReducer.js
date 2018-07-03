import {
	ALBUM_CREATE_START,
	ALBUM_CREATE_SUCCESS,
	ALBUM_CREATE_FAILURE
} from '@/actions/types';

const initialState = {
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
	case ALBUM_CREATE_START:
		return { ...state, loading: true };
	case ALBUM_CREATE_SUCCESS:
	case ALBUM_CREATE_FAILURE:
		return {
			...state,
			loading: false
		};
	default:
		return state;
	}
};

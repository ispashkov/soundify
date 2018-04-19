import {
	FETCH_TRACKS_START,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE
} from '@/actions/types';

const initialState = {
	items: [],
	count: 0,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
	case FETCH_TRACKS_START:
		return { ...state, loading: true };
	case FETCH_TRACKS_SUCCESS:
		return {
			...state,
			items: [...state.items, ...action.payload.tracks],
			count: action.payload.count,
			loading: false
		};
	case FETCH_TRACKS_FAILURE:
		return { ...state, loading: false };
	default:
		return state;
	}
}

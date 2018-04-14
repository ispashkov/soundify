import {
	FETCH_TRACKS_START,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE
} from './types';

export default payload => async (dispatch, getState, api) => {
	dispatch({
		type: FETCH_TRACKS_START
	});

	try {
		const tracks = await api.get('/track', {
			options: payload
		});

		dispatch({
			type: FETCH_TRACKS_SUCCESS,
			payload: tracks.data
		});
	} catch (err) {
		dispatch({
			type: FETCH_TRACKS_FAILURE,
			payload: err
		});
	}
};

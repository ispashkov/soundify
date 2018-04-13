import axios from 'axios';
import {
	FETCH_TRACKS_START,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACKS_FAILURE
} from './types';

export default payload => async dispatch => {
	dispatch({
		type: FETCH_TRACKS_START
	});

	try {
		const tracks = await axios.get('http://localhost:8080/api/track', {
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

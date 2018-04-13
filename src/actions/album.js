import axios from 'axios';
import {
	ALBUM_CREATE_START,
	ALBUM_CREATE_SUCCESS,
	ALBUM_CREATE_FAILURE
} from './types';

const config = {
	headers: { 'Content-Type': 'application/json' }
};

export default payload => async dispatch => {
	const data = new FormData();
	data.append('name', payload.albumName);
	data.append('type', payload.albumType);

	payload.albumTracks.forEach(track => {
		data.append('photo', track);
	});

	dispatch({
		type: ALBUM_CREATE_START
	});

	try {
		const res = await axios.post('/api/album/create', data, config);

		dispatch({
			type: ALBUM_CREATE_SUCCESS,
			res
		});
	} catch (err) {
		dispatch({
			type: ALBUM_CREATE_FAILURE,
			err
		});
	}
};

import {
	FILE_UPLOAD_START,
	FILE_UPLOAD_SUCCESS,
	FILE_UPLOAD_FAILURE
} from './types';

const config = {
	headers: { 'Content-Type': 'application/json' }
};

export default payload => async (dispatch, getState, api) => {
	const data = new FormData();

	data.append('file', payload);

	dispatch({
		type: FILE_UPLOAD_START
	});

	try {
		const res = await api.post('/file/create', data, config);

		dispatch({
			type: FILE_UPLOAD_SUCCESS,
			res
		});

		return res;
	} catch (err) {
		dispatch({
			type: FILE_UPLOAD_FAILURE,
			err
		});
	}
};

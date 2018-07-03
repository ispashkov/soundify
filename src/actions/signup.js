import { push } from 'react-router-redux';

import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export default payload => async (dispatch, getState, api) => {
	dispatch({
		type: SIGNUP_START,
		payload
	});

	try {
		const res = await api.post('/user/signup', payload);

		dispatch({
			type: SIGNUP_SUCCESS,
			res
		});

		dispatch(push('/login'));
	} catch (error) {
		dispatch({
			type: SIGNUP_FAILURE,
			error: error.response.data
		});
	}
};

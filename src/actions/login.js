import axios from 'axios';
import { push } from 'react-router-redux';
import Cookie from 'js-cookie';
import setAutorizationToken from '../utils/setAutorizationToken';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export default payload => async dispatch => {
	dispatch({
		type: LOGIN_START,
		payload
	});

	try {
		const res = await axios.post('/api/user/login', payload);

		if (!res.data.token) {
			return Promise.reject();
		} else {
			const token = res.data.token;
			Cookie.set('auth_token', token, {
				expires: 1
			});
			setAutorizationToken(token);
			dispatch({
				type: LOGIN_SUCCESS,
				user: res.data.user
			});
			dispatch(push('/tracks'));
		}
	} catch (err) {
		dispatch({
			type: LOGIN_FAILURE,
			err: err.response.data.message
		});
	}
};

import { push } from 'react-router-redux';
import Cookie from 'js-cookie';

import { LOGOUT } from './types';

export default () => dispatch => {
	Cookie.remove('auth_token');
	dispatch({ type: LOGOUT });
	dispatch(push('/'));
};

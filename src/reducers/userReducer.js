import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	SIGNUP_START,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	ERROR_CLEAR
} from '@/actions/types';

const initialState = {
	isLoggedIn: false,
	loading: false,
	user: {},
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
	case SIGNUP_START:
		return { ...state, loading: true, error: null };
	case SIGNUP_SUCCESS:
		return { ...state, loading: false, error: null };
	case SIGNUP_FAILURE:
		return { ...state, loading: false, error: action.error };
	case LOGIN_START:
		return { ...state, loading: true, error: null };
	case LOGIN_SUCCESS:
		return {
			loading: false,
			user: action.user,
			isLoggedIn: true,
			error: null
		};
	case LOGIN_FAILURE:
		return { ...state, loading: false, error: action.error };
	case LOGOUT:
		return { ...state, user: {}, isLoggedIn: false, error: null };
	case ERROR_CLEAR:
		return { ...state, error: null };
	default:
		return state;
	}
};

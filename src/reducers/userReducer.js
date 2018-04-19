import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	SIGNUP_START,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE
} from '@/actions/types';

const initialState = {
	isLoggedIn: false,
	loading: false,
	user: {}
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
	case SIGNUP_START:
		return { ...state, loading: true };
	case SIGNUP_SUCCESS:
		return { ...state, loading: false };
	case SIGNUP_FAILURE:
		return { ...state, loading: false };
	case LOGIN_START:
		return { ...state, loading: true };
	case LOGIN_SUCCESS:
		return {
			loading: false,
			user: action.user,
			isLoggedIn: true
		};
	case LOGIN_FAILURE:
		return { ...state, loading: false };
	case LOGOUT:
		return { ...state, user: {}, isLoggedIn: false };
	default:
		return state;
	}
}

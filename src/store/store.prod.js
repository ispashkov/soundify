import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@/reducers';
import axiosInstance from '@/utils/axiosInstance';
import history from '@/utils/history';

const initialState = window.__INITIAL_STATE__ && window.__INITIAL_STATE__;

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(
		thunk.withExtraArgument(axiosInstance),
		routerMiddleware(history)
	)
);

export default store;

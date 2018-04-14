import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import rootReducer from '../../src/reducers';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080'
});

export default () => {
	const store = createStore(
		rootReducer,
		{},
		applyMiddleware(thunk.withExtraArgument(axiosInstance))
	);

	return store;
};

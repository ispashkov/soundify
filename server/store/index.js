import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/reducers';

export default () => {
	const store = createStore(rootReducer, {}, applyMiddleware(thunk));

	return store;
};

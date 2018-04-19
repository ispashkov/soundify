import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@/reducers';
import axiosInstance from '@/utils/axiosInstance';
import history from '@/utils/history';

const logger = createLogger({
	collapsed: true
});

const initialState = window.__INITIAL_STATE__ && window.__INITIAL_STATE__;

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(
		applyMiddleware(
			thunk.withExtraArgument(axiosInstance),
			logger,
			routerMiddleware(history)
		)
	)
);

if (module.hot) {
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers');
		store.replaceReducer(nextRootReducer);
	});
}

export default store;

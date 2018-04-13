import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import trackReducer from './trackReducer';
import albumReducer from './albumReducer';

const rootReducer = combineReducers({
	routing: routerReducer,
	form: formReducer,
	user: userReducer,
	tracks: trackReducer,
	albums: albumReducer
});

export default rootReducer;

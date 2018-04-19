import storeDev from './store.dev';
import storeProd from './store.prod';

let store;
if (process.env.NODE_ENV === 'production') {
	store = storeProd;
} else {
	store = storeDev;
}

export default store;

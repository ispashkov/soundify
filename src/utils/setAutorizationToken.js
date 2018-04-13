import axios from 'axios';

export default function setAutorizationToken(token) {
	if (token) {
		axios.defaults.headers.common['Autorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Autorization'];
	}
}

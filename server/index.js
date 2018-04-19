import register from 'ignore-styles';
register(['.sass', '.scss']);

import express from 'express';
import proxy from 'express-http-proxy';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createStore from './store';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from '@/routes';
import { ApplyTheme, createSheetsRegistry } from 'rambler-ui/theme';
import jwtDecode from 'jwt-decode';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use('/api', proxy('http://localhost:8080'));

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '../src/layout/'));

app.use('/favicon.ico', express.static(path.join(__dirname, '../favicon.ico')));
app.use('/js', express.static(path.join(__dirname, '../build/js/')));
app.use('/css', express.static(path.join(__dirname, '../build/css/')));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.get('*', (req, res) => {
	const store = createStore();

	if (req.cookies.auth_token) {
		store.dispatch({
			type: 'LOGIN_SUCCESS',
			user: jwtDecode(req.cookies.auth_token)
		});
	}

	const promises = matchRoutes(routes, req.path).map(({ route }) => {
		return route.loadData ? route.loadData(store) : null;
	});

	Promise.all(promises).then(() => {
		// Render the component to a string
		let context = {};

		const sheetsRegistry = createSheetsRegistry();

		const renderHTML = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.path} context={context}>
					<ApplyTheme sheetsRegistry={sheetsRegistry}>
						{renderRoutes(routes)}
					</ApplyTheme>
				</StaticRouter>
			</Provider>
		);

		// Grab the initial state from our Redux store
		const preloadedState = store.getState();
		// Send the rendered page back to the client
		res.render('index', {
			renderHTML,
			initialState: `<script type="text/javascript">
				window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
			</script>`,
			ssrStyle: `<style type='text/css' id='server-styles'>${sheetsRegistry.toString()}</style>`
		});
	});
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(PORT, () =>
	console.log(`Server listening on port ${PORT}, MODE: ${process.env.NODE_ENV}`)
);

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
import setAutorizationToken from '@/utils/setAutorizationToken';
import { ApplyTheme, createSheetsRegistry } from 'rambler-ui/theme';
import jwtDecode from 'jwt-decode';
import assets from '../build/build-manifest.json';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use('/api', proxy('http://localhost:8080'));

app.use(express.static(path.join(__dirname, '../build/')));

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
	if (req.cookies['auth_token']) {
		setAutorizationToken(req.cookies['auth_token']);
	}

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

		const HTML = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.path} context={context}>
					<ApplyTheme sheetsRegistry={sheetsRegistry}>
						{renderRoutes(routes)}
					</ApplyTheme>
				</StaticRouter>
			</Provider>
		);

		const jss = sheetsRegistry.toString();

		// Grab the initial state from our Redux store
		const preloadedState = store.getState();

		// Send the rendered page back to the client
		res.send(renderHTML(HTML, assets, preloadedState, jss));
	});
});

const renderHTML = (HTML, assets, preloadedState, jss) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name='viewport' content="initial-scale=1.0, width=device-width">
		<meta name="theme-color" content="#323233">
		<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,700,900&amp;subset=cyrillic'>
		<link rel="manifest" href="${assets['manifest.json']}">
		<link rel="shortcut icon" href="${assets['favicon.ico']}">
		<link rel="stylesheet" href="${assets['bundle.css']}">
		<style type='text/css' id='server-styles'>${jss}</style>
	</head>
	<body>
		<script type="text/javascript">
			window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
		</script>
		<div id="root-app" class='app'>${HTML}</div>
		<script type="text/javascript" src="${assets['vendors.js']}"></script>
		<script type="text/javascript" src="${assets['bundle.js']}"></script>
	</body>
</html>`;

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

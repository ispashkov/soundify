import register from 'ignore-styles';
register(['.sass', '.scss']);

import express from 'express';
import mongoose from 'mongoose';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createStore from './store';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from '../src/routes';
import { ApplyTheme, createSheetsRegistry } from 'rambler-ui/theme';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import trackRoutes from './routes/track';
import albumRoutes from './routes/album';
import jwtDecode from 'jwt-decode';

dotenv.config();

const PORT = process.env.PORT || 8080;

mongoose
	.connect(
		`mongodb://${process.env.MONGODB_USER}:${
			process.env.MONGODB_PSWD
		}@ds239029.mlab.com:39029/soundify`,
		{
			useMongoClient: true
		}
	)
	.once('open', () => {
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
	})
	.on('error', error => console.log('Connection Error!', error));

mongoose.Promise = global.Promise;

const app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '../src/layout/'));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
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

app.use('/api/uploads/', express.static(path.join(__dirname, '../uploads/')));
app.use('/api/user', userRoutes);
app.use('/api/track', trackRoutes);
app.use('/api/album', albumRoutes);

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

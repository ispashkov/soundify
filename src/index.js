import React, { Component, Fragment } from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@/routes';
import { Helmet } from 'react-helmet';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from '@/store';
import history from '@/utils/history';
import setAutorizationToken from '@/utils/setAutorizationToken';
import { ApplyTheme, createSheetsRegistry } from 'rambler-ui/theme';
import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { install } from 'offline-plugin/runtime';

import './assets/favicon.ico';
import './styles/app.scss';

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<ApplyTheme sheetsRegistry={createSheetsRegistry()}>
					<Fragment>
						<Helmet>
							<title>Soundify App</title>
							<meta name="description" content="Soundify application" />
						</Helmet>
						<Router history={history}>{renderRoutes(routes)}</Router>
					</Fragment>
				</ApplyTheme>
			</Provider>
		);
	}
}

if (Cookie.get('auth_token')) {
	setAutorizationToken(Cookie.get('auth_token'));
	store.dispatch({
		type: 'LOGIN_SUCCESS',
		user: jwtDecode(Cookie.get('auth_token').split(' ')[1])
	});
}

hydrate(<Root />, document.getElementById('root-app'), () => {
	const styles = document.getElementById('server-styles');
	if (styles) {
		// styles.parentNode.removeChild(styles);
	}
});

install();

if (module.hot) {
	module.hot.accept();
}

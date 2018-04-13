import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './NotFound.scss';

class NotFound extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>404 Page Not Found</title>
				</Helmet>
				<h1 className="notfound__heading">404 Page Not Found</h1>
			</div>
		);
	}
}

export default NotFound;

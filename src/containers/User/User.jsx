import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './User.scss';

class UserProfile extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>User Page</title>
				</Helmet>
				<h1>User Page</h1>
			</div>
		);
	}
}

export default UserProfile;

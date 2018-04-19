import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
	class RequireAuth extends Component {
		static propTypes = {
			auth: PropTypes.boolean
		};

		render() {
			switch (this.props.auth) {
			case false:
				return <Redirect to="/" />;
			case null:
				return <div>Loading...</div>;
			default:
				return <ChildComponent {...this.props} />;
			}
		}
	}

	const mapStateToProps = state => ({
		auth: state.user.isLoggedIn
	});

	return connect(mapStateToProps)(RequireAuth);
};

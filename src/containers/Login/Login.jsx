import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import actionLogin from '../../actions/login';
import './Login.scss';

import LoginForm from '../../components/LoginForm';

class LoginContainer extends Component {
	static propTypes = {
		actionLogin: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		formData: PropTypes.object,
		history: PropTypes.object
	};

	state = {
		email: '',
		password: ''
	};

	handleSubmit = event => {
		event.preventDefault();

		this.props.actionLogin(this.props.formData.values);
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleCancel = () => {
		this.props.history.goBack();
	};

	render() {
		const { email, password } = this.state;

		return (
			<div className="login">
				<Helmet>
					<title>Login</title>
				</Helmet>
				<div className="container login__container">
					<div className="row login__row">
						<div className="col-12 col-md-6 col-lg-4">
							<h1 className="login__heading">Login</h1>
							<LoginForm
								email={email}
								password={password}
								handleChange={this.handleChange}
								handleSubmit={this.handleSubmit}
								handleCancel={this.handleCancel}
								loading={this.props.user.loading}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	formData: state.form.login
});

const mapDispatchToProps = dispatch => ({
	actionLogin: payload => dispatch(actionLogin(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

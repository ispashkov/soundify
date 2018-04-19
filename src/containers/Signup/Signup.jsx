import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import actionSignup from '@/actions/signup';
import './Signup.scss';

import SignupForm from '@/components/SignupForm';

class SignupContainer extends Component {
	static propTypes = {
		actionSignup: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		formData: PropTypes.object,
		history: PropTypes.object
	};

	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = event => {
		event.preventDefault();

		this.props.actionSignup(this.props.formData.values);
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
			<div className="signup">
				<Helmet>
					<title>Sign Up</title>
				</Helmet>
				<div className="container signup__container">
					<div className="row signup__row">
						<div className="col-12 col-md-6 col-lg-4">
							<h1 className="signup__heading">Sign Up</h1>
							<SignupForm
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
	formData: state.form.signup
});

const mapDispatchToProps = dispatch => ({
	actionSignup: payload => dispatch(actionSignup(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

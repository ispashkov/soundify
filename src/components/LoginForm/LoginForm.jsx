import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { ApplyTheme } from 'rambler-ui/theme';
import Button from 'rambler-ui/Button';
import FormGroup from 'rambler-ui/FormGroup';
import Input from '../Input';

let LoginForm = ({
	handleSubmit,
	handleChange,
	handleCancel,
	email,
	password,
	loading
}) => {
	return (
		<ApplyTheme>
			<form action="" onSubmit={handleSubmit}>
				<FormGroup label="E-mail">
					<Field
						name="email"
						type="text"
						placeholder="email"
						variation="regular"
						status="success"
						value={email}
						onChange={handleChange}
						disabled={loading}
						component={Input}
					/>
				</FormGroup>
				<FormGroup label="Password">
					<Field
						name="password"
						type="password"
						placeholder="password"
						variation="regular"
						status="success"
						disabled={loading}
						value={password}
						onChange={handleChange}
						component={Input}
					/>
				</FormGroup>
				<div className="login__submit">
					<Button
						buttonType="submit"
						type="primary"
						block
						loading={loading}
						disabled={loading}
					>
						Login
					</Button>
				</div>

				<div className="login__back">
					<Button
						type="outline"
						block
						disabled={loading}
						onClick={handleCancel}
					>
						Go Back
					</Button>
				</div>
			</form>
		</ApplyTheme>
	);
};

LoginForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	password: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
	form: 'login'
})(LoginForm);

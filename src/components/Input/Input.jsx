import React from 'react';
import PropTypes from 'prop-types';
import Input from 'rambler-ui/Input';

const UiInput = props => (
	<Input
		type={props.type}
		value={props.input.value}
		onChange={props.input.onChange}
		placeholder={props.placeholder}
		variation={props.variation}
		disabled={props.disabled}
		status={props.status}
	/>
);

UiInput.propTypes = {
	type: PropTypes.string.isRequired,
	input: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	placeholder: PropTypes.string.isRequired,
	variation: PropTypes.string.isRequired,
	status: PropTypes.string,
	disabled: PropTypes.bool
};

export default UiInput;

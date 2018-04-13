import React from 'react';
import PropTypes from 'prop-types';
import Select from 'rambler-ui/Select';
import { MenuItem } from 'rambler-ui/Menu';

const UiSelect = props => (
	<Select
		value={props.input.value}
		onChange={props.input.onChange}
		placeholder={props.placeholder}
		variation={props.variation}
		disabled={props.disabled}
		status={props.status}
	>
		{props.items.map(item => (
			<MenuItem value={item.value} key={item.name}>
				{item.name}
			</MenuItem>
		))}
	</Select>
);

UiSelect.propTypes = {
	input: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	placeholder: PropTypes.string.isRequired,
	variation: PropTypes.string.isRequired,
	status: PropTypes.string,
	disabled: PropTypes.bool,
	items: PropTypes.array.isRequired
};

export default UiSelect;

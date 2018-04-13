import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

import Icon from '../IconSVG/IconSVG';

const Button = props => {
	const btnClass = classNames({
		btn: true,
		[`btn_color_${props.color}`]: props.color,
		[`btn_size_${props.size}`]: props.size,
		[`${props.customClass}`]: props.customClass,
		['btn_wide']: props.wide,
		[`btn_state_${props.state}`]: props.state,
		[`btn_type_${props.type}`]: props.type,
		[`btn_border_${props.border}`]: props.border,
		['btn_loading']: props.loading
	});

	const iconClass = classNames({
		btn__icon: true,
		[`btn__icon_pos_${props.iconPos}`]: props.iconPos
	});

	return (
		<button className={btnClass} onClick={props.onClick}>
			{props.icon ? (
				<span className={iconClass}>
					<Icon icon={props.icon} width="24" height="24" />
				</span>
			) : null}

			{props.text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.string,
	type: PropTypes.string,
	state: PropTypes.string,
	border: PropTypes.string,
	loading: PropTypes.bool,
	icon: PropTypes.any,
	iconPos: PropTypes.string,
	customClass: PropTypes.string,
	onClick: PropTypes.func,
	wide: PropTypes.any
};

export default Button;

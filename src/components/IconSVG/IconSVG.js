import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
	<svg className={`icon icon-${props.icon}`} width={props.width} height={props.height}>
		<use xlinkHref={`#icon-${props.icon}`} />
	</svg>
);

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired
};

export default Icon;

import React from 'react';
import Button from 'rambler-ui/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HomeBanner.scss';

const HomeBanner = ({ text, label }) => (
	<div className="banner">
		<div className="container">
			<div className="col-12">
				<h1 className="heading heading_h1 text-center">{text}</h1>
				<div className="text-center">
					<Button container={<Link to="/player" />} rounded>
						{label}
					</Button>
				</div>
			</div>
		</div>
	</div>
);

HomeBanner.propTypes = {
	text: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

export default HomeBanner;

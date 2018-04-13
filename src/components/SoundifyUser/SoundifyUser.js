import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './SoundifyUser.scss';

const SoundifyUser = ({ name, photo, link, styleName }) => {
	return (
		<a href={link} target="_blank" className={classnames('soundify-user', styleName)}>
			<img className="soundify-user__photo" src={photo} alt={name} />

			<span className="soundify-user__name">{name}</span>
		</a>
	);
};

SoundifyUser.propTypes = {
	name: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	styleName: PropTypes.string
};

export default SoundifyUser;

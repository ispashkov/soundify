import React from 'react';
import PropTypes from 'prop-types';
import './Track.scss';

const Track = ({ track, className }) => (
	<div className={`track ${className}`}>
		<div className="track-left">
			<span className="track__name">{track.name}</span>

			<div className="track__artist">
				<a href="#" className="track__link" target="_blank">
					{track.artist}
				</a>
			</div>
			{/* <span className="track__album">
				<a href="" className="track__link">
					{track.album.name}
				</a>
			</span> */}
		</div>
	</div>
);

Track.propTypes = {
	track: PropTypes.object.isRequired,
	className: PropTypes.string
};

export default Track;

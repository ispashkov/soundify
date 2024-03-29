import React, { Fragment } from 'react';
import moment from 'moment';
import './PlayerSongs.scss';
import mock from './mock';

const PlayerSongs = () => (
	<div className="s-track">
		{mock.items.length &&
			mock.items.map(({ track }, index) => (
				<div className="s-track-item" key={index}>
					<div className="s-track-item-action" />
					<div className="s-track-item-name">
						<div className="s-track-item__title">{track.name}</div>
						<div className="s-track-item-artists">
							{track.explicit && (
								<span className="s-track-item__explicit">Explicit</span>
							)}
							<div>
								{track.artists.map((artist, index) => (
									<Fragment key={index}>
										<span className="s-track-item-artists__item">
											{artist.name}
										</span>
										{index != track.artists.length - 1 && <span>, </span>}
									</Fragment>
								))}
								<span> - </span>
								<span className="s-track-item__album">{track.album.name}</span>
							</div>
						</div>
					</div>
					<span className="s-track-item__duration">
						{moment(track.duration_ms).format('mm:ss')}
					</span>
					{/* <pre>{JSON.stringify(track, null, '\t')}</pre> */}
				</div>
			))}
	</div>
);

export default PlayerSongs;

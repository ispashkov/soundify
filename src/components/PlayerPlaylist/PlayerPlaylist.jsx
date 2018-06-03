import React from 'react';
import './PlayerPlaylist.scss';
import mock from './mock';

const PlayerPlaylist = () => (
	<div className="s-playlist">
		{mock.items.length &&
			mock.items.map((playlist, index) => (
				<div className="s-playlist-item" key={index}>
					<div className="s-playlist-item-cover">
						<div
							className="s-playlist-item-cover__photo"
							style={{ backgroundImage: `url(${playlist.images[0].url})` }}
						/>
					</div>
					<div className="s-playlist-item__info">
						<span className="s-playlist-item__name">{playlist.name}</span>
						<a
							href={playlist.owner.external_urls.spotify}
							className="s-playlist-item__owner"
						>
							{playlist.owner.display_name}
						</a>
					</div>
				</div>
			))}
	</div>
);

export default PlayerPlaylist;

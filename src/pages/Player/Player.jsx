import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Player.scss';
import { Redirect } from 'react-router-dom';
import PlayerSidebar from '@/components/PlayerSidebar';
import PlayerWorkspace from '@/components/PlayerWorkspace';
import PlayerControl from '@/components/PlayerControl';

class PlayerPage extends Component {
	static propTypes = {
		route: PropTypes.object,
		location: PropTypes.shape({
			pathname: PropTypes.string
		})
	};

	render() {
		if (this.props.location.pathname === '/player') {
			return <Redirect to="/player/playlists" />;
		}

		return (
			<div className="s-player">
				<div className="s-player__sidebar">
					<PlayerSidebar />
				</div>
				<div className="s-player__workspace">
					<PlayerWorkspace route={this.props.route} />
				</div>
				<div className="s-player__control">
					<PlayerControl />
				</div>
			</div>
		);
	}
}

export default PlayerPage;

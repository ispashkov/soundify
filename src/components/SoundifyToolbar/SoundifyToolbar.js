import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SoundifyUser from '../SoundifyUser/SoundifyUser';

import './SoundifyToolbar.scss';

class SoundifyToolbar extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		user: PropTypes.object.isRequired,
		toBack: PropTypes.func.isRequired,
		toForward: PropTypes.func.isRequired
	};

	render() {
		const { user, toBack, toForward } = this.props;

		return (
			<div className="soundify-toolbar">
				<div className="soundify-toolbar__navigate">
					<button className="btn" onClick={toBack}>
						Назад
					</button>
					<button className="btn" onClick={toForward}>
						Вперед
					</button>
				</div>
				<div className="soundify-toolbar__search" />
				<SoundifyUser
					styleName="soundify-toolbar__user"
					link={user.external_urls ? user.external_urls.spotify : ''}
					name={user.display_name ? user.display_name : 'Spotify'}
					photo={user.images ? user.images[0].url : ''}
				/>
			</div>
		);
	}
}

export default SoundifyToolbar;

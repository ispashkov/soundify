import React from 'react';
import PropTypes from 'prop-types';
import { Toggle, ToggleOption } from 'rambler-ui/Toggle';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './PlayerWorkspace.scss';

const config = [
	{
		label: 'Playlists',
		path: '/player/playlists'
	},
	{
		label: 'Songs',
		path: '/player/songs'
	}
];

class PlayerWorkspace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleValue: props.location.pathname
		};
	}

	static propTypes = {
		route: PropTypes.object,
		location: PropTypes.shape({
			pathname: PropTypes.string.isRequired
		}),
		history: PropTypes.shape({
			push: PropTypes.func.isRequired
		})
	};

	onChange = (e, newValue) => {
		this.setState({ toggleValue: newValue });
		this.props.history.push(newValue);
	};

	render() {
		return (
			<div className="s-workspace">
				<div className="s-workspace-nav">
					<Toggle
						value={this.state.toggleValue}
						onChange={this.onChange}
						block={true}
						equalWidth={true}
					>
						{config.length &&
							config.map((link, index) => (
								<ToggleOption value={link.path} key={index}>
									{link.label}
								</ToggleOption>
							))}
					</Toggle>
				</div>
				<div>{renderRoutes(this.props.route.routes)}</div>
			</div>
		);
	}
}

export default withRouter(PlayerWorkspace);

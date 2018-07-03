import React, { Component, Fragment } from 'react';
import Button from 'rambler-ui/Button';
import Slider from 'react-input-range';
import './PlayerControl.scss';
import mock from './mock';

class PlayerControl extends Component {
	state = {
		volume: 100,
		progress: 0
	};

	handleChangeVolume = value => {
		this.setState({ volume: value });
	};

	handleChangeProgress = value => {
		this.setState({ progress: value });
	};

	render() {
		return (
			<div className="s-control">
				<div className="s-control-track">
					<div className="s-control-track-cover">
						<div
							className="s-control-track-cover__photo"
							style={{ backgroundImage: `url(${mock.album.images[1].url})` }}
						/>
					</div>
					<div className="s-control-track-info">
						<div className="s-control-track__name">{mock.name}</div>
						<div className="s-control-track-artists">
							{mock.artists.map((artist, index) => (
								<Fragment key={index}>
									<span className="s-control-track-artists__item">
										{artist.name}
									</span>
									{index != mock.artists.length - 1 && <span>, </span>}
								</Fragment>
							))}
						</div>
					</div>
				</div>

				<div className="s-control-actions">
					<div className="d-flex justify-content-center align-items-center">
						<Button className="control-actions__btn" size="small">
							Shuffle
						</Button>
						<Button className="control-actions__btn" size="small">
							Prev
						</Button>
						<Button className="control-actions__btn" size="small">
							Play/Pause
						</Button>
						<Button className="control-actions__btn" size="small">
							Next
						</Button>
						<Button className="control-actions__btn" size="small">
							Repeat
						</Button>
					</div>
					<div className="s-control-actions__progress">
						<Slider
							value={this.state.progress}
							minValue={0}
							maxValue={100}
							onChange={this.handleChangeProgress}
						/>
					</div>
				</div>
				<div className="s-control-settings">
					<div className="s-control-volume">
						<Slider
							formatLabel={() => ''}
							value={this.state.volume}
							minValue={0}
							maxValue={100}
							onChange={this.handleChangeVolume}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default PlayerControl;

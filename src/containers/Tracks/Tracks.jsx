import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import './Tracks.scss';

import loadMyTrack from '@/actions/loadMyTrack';

import Track from '@/components/Track';

class Tracks extends Component {
	static propTypes = {
		tracks: PropTypes.object.isRequired,
		loadTrack: PropTypes.func.isRequired
	};

	componentDidMount() {
		if (!this.props.tracks.items.length) {
			this.props.loadTrack();
		}
	}

	renderTrackList = tracks => {
		if (!tracks.length) {
			return;
		}

		return tracks.map(track => (
			<Track className="tracks__item" track={track} key={track._id} />
		));
	};

	render() {
		const { tracks } = this.props;
		return (
			<div className="tracks">
				<Helmet>
					<title>Tracks List</title>
				</Helmet>
				<div className="container tracks__container">
					<h1 className="heading">Track List</h1>
					<div className="row">
						<div className="col">
							{!tracks.items.length && <span>No tracks</span>}
							{tracks.items && this.renderTrackList(tracks.items)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	tracks: state.tracks
});

const mapDispatchToProps = dispatch => ({
	loadTrack: payload => dispatch(loadMyTrack(payload))
});

export const loadData = store => {
	return store.dispatch(loadMyTrack());
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);

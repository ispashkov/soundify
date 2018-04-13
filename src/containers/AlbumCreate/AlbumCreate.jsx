import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import './AlbumCreate.scss';

import AlbumCreateForm from '../../components/AlbumCreateForm';
import actionAlbumCreate from '../../actions/album';

class AlbumCreate extends Component {
	static propTypes = {
		albums: PropTypes.object,
		formData: PropTypes.object,
		history: PropTypes.object,
		actionAlbumCreate: PropTypes.func
	};

	state = {
		albumName: null,
		albumType: null,
		albumTracks: []
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.actionAlbumCreate({
			...this.props.formData.values,
			albumTracks: this.state.albumTracks
		});
	};

	handleAlbumType = value => {
		this.setState({
			albumType: value
		});
	};

	handleFile = event => {
		this.setState(prevState => {
			return {
				albumTracks: [...prevState.albumTracks, ...event.target.files]
			};
		});
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleCancel = () => {
		this.props.history.goBack();
	};

	render() {
		const { albumName, albumType, albumTracks } = this.state;

		return (
			<div className="album-create">
				<Helmet>
					<title>Create Album</title>
				</Helmet>
				<div className="container">
					<h1>Album Create</h1>
					<AlbumCreateForm
						albumName={albumName}
						albumType={albumType}
						albumTracks={albumTracks}
						handleFile={this.handleFile}
						handleChange={this.handleChange}
						handleAlbumType={this.handleAlbumType}
						handleSubmit={this.handleSubmit}
						handleCancel={this.handleCancel}
						loading={this.props.albums.loading}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	formData: state.form.albumCreate,
	albums: state.albums
});

const mapDispatchToProps = dispatch => ({
	actionAlbumCreate: payload => dispatch(actionAlbumCreate(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreate);

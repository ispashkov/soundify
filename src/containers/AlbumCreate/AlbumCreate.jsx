import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import './AlbumCreate.scss';

import AlbumCreateForm from '@/components/AlbumCreateForm';
import actionAlbumCreate from '@/actions/album';
import actionUploadFile from '@/actions/file';

class AlbumCreate extends Component {
	static propTypes = {
		albums: PropTypes.object,
		formData: PropTypes.object,
		history: PropTypes.object,
		actionAlbumCreate: PropTypes.func,
		actionUploadFile: PropTypes.func
	};

	state = {
		albumName: null,
		albumType: null,
		albumPhoto: null,
		albumTracks: [],
		previewPhoto: null
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.actionAlbumCreate({
			...this.props.formData.values,
			albumTracks: this.state.albumTracks,
			albumPhoto: this.state.albumPhoto
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

	handlePhoto = async event => {
		const photo = await this.props.actionUploadFile(event.target.files[0]);
		this.setState(() => {
			return {
				albumPhoto: event.target.files[0],
				previewPhoto: photo.data.file
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
		const {
			albumName,
			albumType,
			albumPhoto,
			albumTracks,
			previewPhoto
		} = this.state;

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
						albumPhoto={albumPhoto}
						albumTracks={albumTracks}
						previewPhoto={previewPhoto}
						handleFile={this.handleFile}
						handlePhoto={this.handlePhoto}
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
	actionAlbumCreate: payload => dispatch(actionAlbumCreate(payload)),
	actionUploadFile: payload => dispatch(actionUploadFile(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumCreate);

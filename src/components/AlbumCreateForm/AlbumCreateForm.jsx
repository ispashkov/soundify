import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { ApplyTheme } from 'rambler-ui/theme';
import Button from 'rambler-ui/Button';
import FormGroup from 'rambler-ui/FormGroup';

import Input from '../Input';
import Select from '../Select';

const items = [
	{
		name: 'Single',
		value: 'Single'
	},
	{
		name: 'Album',
		value: 'Album'
	}
];

let AlbumCreateForm = ({
	handleSubmit,
	handleAlbumType,
	handleChange,
	handleCancel,
	handleFile,
	handlePhoto,
	albumName,
	albumType,
	albumTracks,
	previewPhoto,
	loading
}) => (
	<ApplyTheme>
		<form action="" onSubmit={handleSubmit} encType="multipart/form-data">
			<FormGroup label="Album Name">
				<Field
					type="text"
					name="albumName"
					placeholder="Album Name"
					variation="regular"
					value={albumName}
					onChange={handleChange}
					disabled={loading}
					component={Input}
				/>
			</FormGroup>
			<FormGroup label="Album Type">
				<Field
					name="albumType"
					placeholder="Album Type"
					variation="regular"
					value={albumType}
					onChange={handleAlbumType}
					disabled={loading}
					items={items}
					component={Select}
				/>
			</FormGroup>
			<FormGroup label="Album Photo">
				{previewPhoto !== null && (
					<img src={previewPhoto.url} alt={previewPhoto.filename} />
				)}
				<Field
					name="albumPhoto"
					type="file"
					onChange={handlePhoto}
					component={props => (
						<Fragment>
							<Button
								buttonType="button"
								type="primary"
								block
								loading={loading}
								disabled={loading}
								overlay={
									<input
										type="file"
										onChange={props.input.onChange}
										multiple={true}
									/>
								}
							>
								Upload Photo
							</Button>
						</Fragment>
					)}
				/>
			</FormGroup>
			<FormGroup label="Album Tracks">
				{albumTracks.length > 0 &&
					albumTracks.map((track, idx) => <div key={idx}>{track.name}</div>)}

				<Field
					name="albumTracks"
					type="file"
					onChange={handleFile}
					component={props => (
						<Fragment>
							<Button
								buttonType="button"
								type="primary"
								block
								loading={loading}
								disabled={loading}
								overlay={
									<input
										type="file"
										onChange={props.input.onChange}
										multiple={true}
									/>
								}
							>
								Upload Track
							</Button>
						</Fragment>
					)}
				/>
			</FormGroup>

			<Button
				buttonType="submit"
				type="primary"
				block
				loading={loading}
				disabled={loading}
			>
				Create Album
			</Button>
			<Button type="outline" block disabled={loading} onClick={handleCancel}>
				Go Back
			</Button>
		</form>
	</ApplyTheme>
);

AlbumCreateForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	albumName: PropTypes.any,
	albumType: PropTypes.any,
	albumPhoto: PropTypes.any,
	albumTracks: PropTypes.any,
	handleChange: PropTypes.func.isRequired,
	handleAlbumType: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	handleFile: PropTypes.func.isRequired,
	handlePhoto: PropTypes.func.isRequired,
	previewPhoto: PropTypes.any,
	input: PropTypes.object
};

export default reduxForm({
	form: 'albumCreate',
	multipartForm: true
})(AlbumCreateForm);

import React from 'react';
import Loader from 'rambler-ui/Loader';
import './Loading.scss';

const Loading = () => (
	<div className="s-loading">
		<Loader loading={true} />
	</div>
);

export default Loading;

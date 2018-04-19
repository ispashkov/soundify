import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Home.scss';

import Header from '@/components/Header';

class HomeContainer extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired
	};

	render() {
		const { user } = this.props;

		return (
			<div className="page page-home">
				<Header user={user} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(HomeContainer);

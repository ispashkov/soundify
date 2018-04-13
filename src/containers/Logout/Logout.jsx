import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logout from '../../actions/logout';

class Logout extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.logout();
	}

	render() {
		return null;
	}
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Logout);

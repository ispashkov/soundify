import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
};

const transitionStyles = {
	entering: { opacity: 0 },
	entered: { opacity: 1 }
};

export default MyComponent => {
	class Fade extends Component {
		state = {
			mounted: false
		};

		componentDidMount() {
			this.setState({ mounted: true });
		}
		render() {
			return (
				<Transition in={this.state.mounted} timeout={duration}>
					{state => (
						<div style={{ ...defaultStyle, ...transitionStyles[state] }}>
							<MyComponent {...this.props} />
						</div>
					)}
				</Transition>
			);
		}
	}

	return Fade;
};

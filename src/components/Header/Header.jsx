import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'rambler-ui/Button';
import { ApplyTheme } from 'rambler-ui/theme';
import './Header.scss';

const Header = props => (
	<ApplyTheme>
		<header className="header">
			<div className="container header__container">
				<div className="header__logo" />

				<div className="header-actions">
					{props.user.isLoggedIn && (
						<Fragment>
							<div className="header__logout">
								<Button
									type="outline"
									rounded={true}
									size="small"
									container={<Link to="/logout" title="Logout" />}
								>
									Logout
								</Button>
							</div>
						</Fragment>
					)}

					{!props.user.isLoggedIn && (
						<Fragment>
							<div className="header__signup">
								<Button
									type="secondary"
									rounded={true}
									size="small"
									container={<Link to="/signup" title="Signup" />}
								>
									Sign Up
								</Button>
							</div>

							<div className="header__login">
								<Button
									rounded={true}
									size="small"
									container={<Link to="/login" title="Login" />}
								>
									Login
								</Button>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</header>
	</ApplyTheme>
);

Header.propTypes = {
	user: PropTypes.object.isRequired
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerSidebar.scss';

const PlayerSidebar = () => (
	<div className="s-sidebar">
		<h1 className="s-sidebar__logo">Soundify</h1>
		<nav className="s-sideber-nav">
			<Link className="s-sidebar-nav__link" to="/search">
				Search
			</Link>
			<Link className="s-sidebar-nav__link" to="/player">
				Home
			</Link>
		</nav>
	</div>
);

export default PlayerSidebar;

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Header from '../components/Header';

const userProps = {
	isLoggedIn: false,
	loading: false,
	user: {}
};

describe('<Header />', () => {
	it('Render component Header', () => {
		const component = shallow(<Header user={userProps} />);
		expect(toJson(component)).toMatchSnapshot();
	});
});

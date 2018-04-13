import HomeContainer from '../containers/Home';
import SignupContainer from '../containers/Signup';
import LoginContainer from '../containers/Login';
import Logout from '../containers/Logout';
import NotFound from '../containers/NotFound';
import UserProfile from '../containers/User';
import Tracks, { loadData } from '../containers/Tracks';
import AlbumCreate from '../containers/AlbumCreate';

export default [
	{
		path: '/',
		exact: true,
		component: HomeContainer
	},
	{
		path: '/signup',
		component: SignupContainer
	},
	{
		path: '/login',
		component: LoginContainer
	},
	{
		path: '/logout',
		component: Logout
	},
	{
		path: '/user',
		component: UserProfile
	},
	{
		path: '/tracks',
		component: Tracks,
		loadData
	},
	{
		path: '/album/create',
		component: AlbumCreate
	},
	{
		path: '/notfound',
		component: NotFound
	}
];

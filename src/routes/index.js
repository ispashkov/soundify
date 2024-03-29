import Loadable from 'react-loadable';
import HomeContainer from '@/containers/Home';
import SignupContainer from '@/containers/Signup';
import LoginContainer from '@/containers/Login';
import Logout from '@/containers/Logout';
import UserProfile from '@/containers/User';
import Tracks, { loadData } from '@/containers/Tracks';
import AlbumCreate from '@/containers/AlbumCreate';
import PlayerPage from '@/pages/Player';
import PlayerPlaylist from '@/components/PlayerPlaylist';
import Loading from '@/components/Loading';

const PlayerSongs = Loadable({
	loader: () => import('@/components/PlayerSongs'),
	loading: Loading
});

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
		path: '/albums/create',
		component: AlbumCreate
	},
	{
		path: '/player',
		component: PlayerPage,
		routes: [
			{
				path: '/player/playlists',
				component: PlayerPlaylist
			},
			{
				path: '/player/songs',
				component: PlayerSongs
			}
		]
	}
];

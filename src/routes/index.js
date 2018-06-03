import HomeContainer from '@/containers/Home';
import SignupContainer from '@/containers/Signup';
import LoginContainer from '@/containers/Login';
import Logout from '@/containers/Logout';
import UserProfile from '@/containers/User';
import Tracks, { loadData } from '@/containers/Tracks';
import AlbumCreate from '@/containers/AlbumCreate';
import PlayerPage from '@/pages/Player';
import PlayerPlaylist from '@/components/PlayerPlaylist';
import PlayerSongs from '@/components/PlayerSongs';

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

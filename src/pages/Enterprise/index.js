/*
 * @导航
 * @Author: huangjun
 * @Date: 2018-10-10 16:21:43
 * @Last Modified by: huangjun
 * @Last Modified time: 2018-10-10 16:41:15
 */
import {Navigation} from 'react-native-navigation';
import {createStackNavigator} from 'react-navigation';

import Login from './Login';
import Chat from './Chat';
import ChatList from './ChatList';
import FriendList from './FriendList';
import FriendDetail from './FriendDetail';
import CreateTeam from './CreateTeam';
// import NewFriend from './NewFriend';
// import RemoveUsers from './RemoveUsers';
// import SessionTeamDetail from './SessionTeamDetail';
// import SessionUserDetail from './SessionUserDetail';
// import SendAddFriend from './SendAddFriend';
// import UpdateTeamName from './UpdateTeamName';
// import SearchScreen from './SearchScreen';
// import SelectUsers from './SelectUsers';
// import LocationPicker from './LocationPicker';
// import LocationView from './LocationView';
// export default function () {
// Navigation.registerComponent ('ImDemo.Login', () => Login);
// Navigation.registerComponent ('ImDemo.Chat', () => Chat);
// Navigation.registerComponent ('ImDemo.ChatList', () => ChatList);
// Navigation.registerComponent ('ImDemo.FriendList', () => FriendList);
// Navigation.registerComponent ('ImDemo.FriendDetail', () => FriendDetail);
// Navigation.registerComponent ('ImDemo.CreateTeam', () => CreateTeam);
// Navigation.registerComponent ('ImDemo.NewFriend', () => NewFriend);
// Navigation.registerComponent ('ImDemo.RemoveUsers', () => RemoveUsers);
// Navigation.registerComponent (
//   'ImDemo.SessionTeamDetail',
//   () => SessionTeamDetail
// );
// Navigation.registerComponent (
//   'ImDemo.SessionUserDetail',
//   () => SessionUserDetail
// );
// Navigation.registerComponent ('ImDemo.SendAddFriend', () => SendAddFriend);
// Navigation.registerComponent ('ImDemo.UpdateTeamName', () => UpdateTeamName);
// Navigation.registerComponent ('ImDemo.SearchScreen', () => SearchScreen);
// Navigation.registerComponent ('ImDemo.SelectUsers', () => SelectUsers);
// Navigation.registerComponent ('ImDemo.LocationView', () => LocationView);
// Navigation.registerComponent ('ImDemo.LocationPicker', () => LocationPicker);
// }

export default createStackNavigator (
  {
    'ImDemo.Login': Login,
    'ImDemo.ChatList': ChatList,
    'ImDemo.FriendList': FriendList,
    'ImDemo.FriendDetail': FriendDetail,
    'ImDemo.CreateTeam': CreateTeam,
    'ImDemo.Chat': Chat,
  },
  {
    initialRouteName: 'ImDemo.Login',
  }
);

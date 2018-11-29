import { createStackNavigator } from 'react-navigation';
import stackOption from '../../assets/styles/defaultStackOption';

import Login from './container/login';
import RetrievePassword from './container/retrievePassword';
import RetrievePassword2 from './container/retrievePassword2';

export default createStackNavigator(
  {
    Login: Login,
    RetrievePassword: RetrievePassword,
    RetrievePassword2: RetrievePassword2
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: stackOption
  }
);
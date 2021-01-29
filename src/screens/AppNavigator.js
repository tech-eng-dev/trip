import {
  StackNavigator,
} from 'react-navigation';

import Login from './Login';
import Home from './Home';
import Verify from './Login/verify';
import UserAddTrip from './User/add_trip';
import UserEditTrip from './User/edit_trip';
import UserTripDetail from './User/detail_trip';
import UserFilterTrip from './User/filter_trip';
import UserPrintTrip from './User/print_trip';
import ManagerEditUser from './Manager/edit_user';
import AdminEditUser from './Admin/edit_user';

const MainNavigator = StackNavigator(
  {
    login: { screen: Login },
    verify: { screen: Verify },
    home: { screen: Home },
    user_add_trip: { screen: UserAddTrip },
    user_edit_trip: { screen: UserEditTrip },
    user_detail_trip: { screen: UserTripDetail },
    user_filter_trip: { screen: UserFilterTrip },
    user_print_trip: { screen: UserPrintTrip },
    manager_edit_user: { screen: ManagerEditUser },
    admin_edit_user: { screen: AdminEditUser },
  },
  {
    headerMode: 'none',
  },
);


export default MainNavigator;

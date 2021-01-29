import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'native-base';
import SideMenu from 'react-native-side-menu';
import dismisskeyboard from 'react-native-dismiss-keyboard';

import { ActionCreators } from '../../redux/actions';
import UserBrowseTrip from '../User/browse_trip';
import UserProfile from '../User/profile';
import UserInvite from '../User/invite';
import AdminBrowseUser from '../Admin/browse_user';
import AdminBrowseTrip from '../Admin/browse_trip';
import ManagerBrowseUser from '../Manager/browse_user';
import LeftSideView from '../../components/leftbar';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  componentDidMount() {
    switch (this.props.navigation.state.params.role) {
      case 'User':
        this.setState({ index: 'user-browse' });
        break;
      case 'Manager':
        this.setState({ index: 'manager-browse' });
        break;
      case 'Admin':
        this.setState({ index: 'admin-browse-user' });
        break;
      default:
        break;
    }
  }

  onSelect(index) {
    if (index === 'logout') {
      this.props.logout(this.props.navigation, null);
    } else {
      this.setState({ index, isOpen: false });
    }
  }

  onToggleSideView(isOpen) {
    if (isOpen) {
      dismisskeyboard();
    }
    this.setState({ isOpen });
  }

  render() {
    const { index } = this.state;
    const {
      myProfile, myRecords, allUsers, blockData, allRecords,
    } = this.props;
    return (
      <Container testID="home">
        <SideMenu
          menu={
            <LeftSideView
              onSelect={tabindex => this.onSelect(tabindex)}
              profile={myProfile}
            />
          }
          isOpen={this.state.isOpen}
          onChange={isOpen => this.onToggleSideView.bind(this, isOpen)}
        >
          {
            index === 'user-browse' ?
              <UserBrowseTrip
                handle={this.props}
                onPressLeft={() => this.setState({ isOpen: true })}
                myRecords={myRecords}
                myProfile={myProfile}
              />
            : index === 'user-profile' ?
              <UserProfile
                onPressLeft={() => this.setState({ isOpen: true })}
                myProfile={myProfile}
              />
            : index === 'user-invite' ?
              <UserInvite
                onPressLeft={() => this.setState({ isOpen: true })}
              />
            : index === 'manager-browse' ?
              <ManagerBrowseUser
                handle={this.props}
                onPressLeft={() => this.setState({ isOpen: true })}
                allUsers={allUsers}
                blockData={blockData}
                myProfile={myProfile}
              />
            : index === 'manager-profile' ?
              <UserProfile
                onPressLeft={() => this.setState({ isOpen: true })}
                myProfile={myProfile}
              />
            : index === 'manager-invite' ?
              <UserInvite
                onPressLeft={() => this.setState({ isOpen: true })}
              />
            : index === 'admin-browse-trip' ?
              <AdminBrowseTrip
                handle={this.props}
                onPressLeft={() => this.setState({ isOpen: true })}
                allRecords={allRecords}
              />
            : index === 'admin-browse-user' ?
              <AdminBrowseUser
                handle={this.props}
                onPressLeft={() => this.setState({ isOpen: true })}
                allUsers={allUsers}
                blockData={blockData}
                myProfile={myProfile}
              />
            : index === 'admin-profile' ?
              <UserProfile
                onPressLeft={() => this.setState({ isOpen: true })}
                myProfile={myProfile}
              />
            : index === 'admin-invite' ?
              <UserInvite
                onPressLeft={() => this.setState({ isOpen: true })}
              />
            : null
          }
        </SideMenu>

      </Container>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  greeting: state.greeting,
  myProfile: state.myProfile,
  myRecords: state.myRecords,
  allUsers: state.allUsers,
  blockData: state.blockData,
  allRecords: state.allRecords,
}), mapDispatchToProps)(Home);

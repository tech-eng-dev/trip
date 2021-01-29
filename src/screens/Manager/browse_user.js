import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import CustomHeader from '../../components/header';
import CustomInput from '../../components/textInput';
import Avatar from '../../components/avatar';
import * as Server from '../../lib/server';
import * as Operator from '../../lib/operator';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  emptyText: {
    color: Color.text,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  searchView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.green,
  },
  backView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 200,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 15,
    backgroundColor: Color.white,
  },
  infoView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    paddingVertical: 6,
    color: 'black',
  },
  email: {
    fontSize: 16,
    paddingVertical: 6,
    color: Color.text,
  },
});


export default class ManagerBrowseUser extends Component {
  static propTypes = {
    onPressLeft: PropTypes.func.isRequired,
    allUsers: PropTypes.object.isRequired,
    blockData: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleBlock(user, blocked, rowRef) {
    rowRef.manuallySwipeRow(0);
    if (blocked) Server.unblockUser(user);
    else Server.blockUser(user);
  }

  editUser(user, blocked) {
    this.props.handle.navigation.navigate('manager_edit_user', { user, blocked });
  }

  onSwipeUser(rowRef) {
    rowRef.manuallySwipeRow(-200);
  }

  render() {
    const { allUsers, blockData, myProfile } = this.props;
    const { searchText } = this.state;
    return (
      <Container style={styles.container}>
        <CustomHeader
          left="ios-menu"
          title="Browse Users"
          onPressLeft={this.props.onPressLeft}
        />
        <View style={styles.searchView}>
          <CustomInput
            testID="user-search-input"
            text={searchText}
            border={false}
            placeholder="Search"
            width={dySize(350)}
            onChange={text => this.setState({ searchText: text })}
          />
        </View>
        <Content>
          {
            Object.keys(allUsers).length === 0 ?
              <View style={{ paddingTop: dySize(250) }}>
                <Text style={styles.emptyText}>There is no user.</Text>
                <Text style={styles.emptyText}>Please add {'+'} button on the top right of header to add user.</Text>
              </View>
            :
              <SwipeListView
                dataSource={ds.cloneWithRows(Object.keys(allUsers))}
                enableEmptySections
                renderRow={(key, secId, rowId, rowMap) => {
                  const user = allUsers[key];
                  let blocked = false;
                  if (blockData[Operator.encodeEmail(user.email)] > 2) blocked = true;
                  // Show only manager and user
                  if (user.uid === myProfile.uid || user.role === 'Admin') return <View />;
                  // filter by searchText
                  const name = user.name.toLowerCase();
                  const email = user.email.toLowerCase();
                  if (name.indexOf(searchText.toLowerCase()) < 0 &&
                      email.indexOf(searchText.toLowerCase()) < 0) {
                    return <View />;
                  }
                  return (
                    <SwipeRow
                      disableRightSwipe
                      disableLeftSwipe={false}
                      leftOpenValue={0}
                      rightOpenValue={-200}
                    >
                      <View style={styles.backView}>
                        <TouchableOpacity
                          testID={`user-block-${user.email}`}
                          onPress={() => this.toggleBlock(user, blocked, rowMap[`${secId}${rowId}`])}
                          style={[styles.actionButton, { backgroundColor: Color.red }]}
                        >
                          <Text style={styles.name}>{blocked ? 'Unblock' : 'block'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={`user-edit-${user.email}`}
                          onPress={this.editUser.bind(this, user, blocked)}
                          style={[styles.actionButton, { backgroundColor: Color.green }]}
                        >
                          <Text style={styles.name}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.frontView}>
                        <Avatar userId={key} width={70} blocked={blocked} />
                        <View style={styles.infoView}>
                          <Text style={styles.name}>{user.name}</Text>
                          <Text style={styles.email}>{user.email}</Text>
                        </View>
                        <TouchableOpacity
                          testID={`user-${user.email}`}
                          onPress={() => this.onSwipeUser(rowMap[`${secId}${rowId}`])}
                        >
                          <Icon name="ios-more" />
                        </TouchableOpacity>
                      </View>
                    </SwipeRow>
                  );
                }}
              />
          }
        </Content>
      </Container>
    );
  }
}


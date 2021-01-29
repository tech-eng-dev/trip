// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Alert, TouchableOpacity, ListView } from 'react-native';
import { Icon, Container, Content } from 'native-base';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dismisskeyboard from 'react-native-dismiss-keyboard';

import { ActionCreators } from '../../redux/actions';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';
import CustomHeader from '../../components/header';
import * as Server from '../../lib/server';
import CustomInput from '../../components/textInput';
import Avatar from '../../components/avatar';

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
  tripItemBack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: dySize(200),
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    width: dySize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripItemFront: {
    padding: 10,
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderColor: Color.green,
    position: 'relative',
  },
  tripItemLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  ItemLeftText: {
    width: 100,
    fontSize: 16,
    color: Color.text,
  },
  ItemRightText: {
    flex: 1,
    fontSize: 16,
    color: Color.text,
    height: 20,
  },
  photo: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  IconView: {
    position: 'absolute',
    top: 10,
    right: 20,
    bottom: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 30,
    marginHorizontal: 5,
    color: Color.text,
    backgroundColor: 'transparent',
  },
  moreIcon: {
    fontSize: 30,
    color: Color.text,
  },
});

class AdminBrowseTrip extends Component {
    static propTypes = {
      onPressLeft: PropTypes.func.isRequired,
      handle: PropTypes.object.isRequired,
      allRecords: PropTypes.array.isRequired,
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

    }

    deleteTrip(trip) {
      Alert.alert(
        'Trip',
        'Are you sure you want to delete this trip?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              Server.deleteTrip(trip, () => {
                this.setState({ searchText: '' });
              });
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }

    editTrip(trip) {
      this.props.handle.navigation.navigate('user_edit_trip', { trip });
    }

    showTrip(trip) {
      this.props.handle.navigation.navigate('user_detail_trip', { trip });
    }

    onPressFilter() {
      this.props.handle.navigation.navigate('user_filter_trip');
    }

    onPressLeftIcon() {
      dismisskeyboard();
      this.props.onPressLeft();
    }

    onSwipeTrip(rowRef) {
      // Use an internal method to manually swipe the row open to whatever value you pass
      rowRef.manuallySwipeRow(-200);
    }

    render() {
      const { searchText } = this.state;
      const { allRecords, filterOption, allUsers } = this.props;
      return (
        <Container style={{ backgroundColor: Color.white }}>
          <CustomHeader
            left="ios-menu"
            title="Browse Trips"
            onPressLeft={this.onPressLeftIcon.bind(this)}
          />
          <View style={styles.searchView}>
            <CustomInput
              testID="trip-search-input"
              text={searchText}
              border={false}
              placeholder="Search"
              width={dySize(350)}
              onChange={text => this.setState({ searchText: text })}
            />
            <View style={styles.IconView}>
              <TouchableOpacity testID="trip-filter" onPress={this.onPressFilter.bind(this)}>
                <Icon name="ios-funnel-outline" style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Content contentContainerStyle={{ flex: 1 }}>
            {
              allRecords.length === 0 ?
                <View style={{ paddingTop: dySize(250) }}>
                  <Text style={styles.emptyText}>There is no trip now.</Text>
                  <Text style={styles.emptyText}>
                    Please add {'+'} button on the top right of header to add user trip.
                  </Text>
                </View>
              :
                <SwipeListView
                  dataSource={ds.cloneWithRows(allRecords)}
                  enableEmptySections
                  renderRow={(trip, secId, rowId, rowMap) => {
                    // filter by searchBar
                    const location = trip.location.description.toLowerCase();
                    if (location.indexOf(searchText.toLowerCase()) < 0) {
                      return <View />;
                    }
                    // show for users trip only
                    if (allUsers[trip.userId].role !== 'User') return <View />;
                    // filter by filterOption(start and end date)
                    let isFiltered = false;
                    if (filterOption.by === 0) {
                      isFiltered = trip.startDate < filterOption.from || trip.startDate > filterOption.to;
                    } else if (filterOption.by === 1) {
                      isFiltered = trip.endDate < filterOption.from || trip.endDate > filterOption.to;
                    }
                    if (isFiltered) {
                      return <View />;
                    }
                    return (
                      <SwipeRow
                        disableRightSwipe
                        disableLeftSwipe={false}
                        leftOpenValue={0}
                        rightOpenValue={dySize(-200)}
                      >
                        <View style={styles.tripItemBack}>
                          <TouchableOpacity
                            onPress={() => this.deleteTrip(trip)}
                            style={[styles.actionButton, { backgroundColor: Color.red }]}
                          >
                            <Icon name="ios-trash-outline" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            testID={`trip-edit-${trip.userId}-${trip.createdTime}`}
                            onPress={() => this.editTrip(trip)}
                            style={[styles.actionButton, { backgroundColor: Color.green }]}
                          >
                            <Icon name="create" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            testID={`trip-detail-${trip.userId}-${trip.createdTime}`}
                            onPress={() => this.showTrip(trip)}
                            style={[styles.actionButton, { backgroundColor: Color.blue }]}
                          >
                            <Icon name="ios-eye-outline" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.tripItemFront}>
                          <View style={styles.tripItemLine}>
                            <Text style={styles.ItemLeftText}>Destination:</Text>
                            <Text style={styles.ItemRightText}>{trip.location.description}</Text>
                            <TouchableOpacity testID={`trip-${trip.userId}-${trip.createdTime}`} onPress={() => this.onSwipeTrip(rowMap[`${secId}${rowId}`])}>
                              <Icon name="ios-more" style={styles.moreIcon} />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.tripItemLine}>
                            <Text style={styles.ItemLeftText}>Start Date:</Text>
                            <Text style={styles.ItemRightText}>{trip.startDate}</Text>
                          </View>
                          <View style={styles.tripItemLine}>
                            <Text style={styles.ItemLeftText}>End Date:</Text>
                            <Text style={styles.ItemRightText}>{trip.endDate}</Text>
                          </View>
                          <View style={[styles.tripItemLine, { marginRight: dySize(80) }]}>
                            <Text style={styles.ItemLeftText}>Comment:</Text>
                            <Text style={styles.ItemRightText}>{trip.comment}</Text>
                          </View>
                          <View style={styles.photo}>
                            <Avatar userId={trip.userId} width={60} />
                          </View>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  filterOption: state.filterOption,
  allUsers: state.allUsers,
}), mapDispatchToProps)(AdminBrowseTrip);

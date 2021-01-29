// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Alert, TouchableOpacity, ListView } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Icon, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../redux/actions';
import CustomInput from '../../components/textInput';
import CustomHeader from '../../components/header';
import * as Server from '../../lib/server';
import { dySize } from '../../theme/screen-size';
import { Color } from '../../theme/theme';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Color.green,
    position: 'relative',
  },
  tripItemBack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 200,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripItemFront: {
    padding: 10,
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderColor: Color.green,
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

class UserBrowseTrip extends Component {
    static propTypes = {
      onPressLeft: PropTypes.func.isRequired,
      myRecords: PropTypes.object.isRequired,
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

    }

    addTrip() {
      this.props.handle.navigation.navigate('user_add_trip', { user: this.props.myProfile, blocked: false });
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
              Server.deleteTrip(trip, (res) => {
                console.log('deleted successfully', res);
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

    onPressPrint() {
      this.props.handle.navigation.navigate('user_print_trip');
    }

    onSwipeTrip(rowRef) {
      // Use an internal method to manually swipe the row open to whatever value you pass
      rowRef.manuallySwipeRow(-200);
    }

    render() {
      const { searchText } = this.state;
      const { myRecords, filterOption } = this.props;
      return (
        <Container style={{ backgroundColor: Color.white }}>
          <CustomHeader
            left="ios-menu"
            right="md-add"
            title="My Trips"
            onPressLeft={() => this.props.onPressLeft()}
            onPressRight={() => this.addTrip()}
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
              <TouchableOpacity testID="print-button" onPress={this.onPressPrint.bind(this)}>
                <Icon name="ios-print-outline" style={styles.filterIcon} />
              </TouchableOpacity>
              <TouchableOpacity testID="trip-filter" onPress={this.onPressFilter.bind(this)}>
                <Icon name="ios-funnel-outline" style={styles.filterIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Content contentContainerStyle={{ flex: 1 }}>
            {
              Object.keys(myRecords).length === 0 ?
                <View style={{ paddingTop: dySize(250) }}>
                  <Text style={styles.emptyText}>You have no trip now.</Text>
                  <Text style={styles.emptyText}>
                    Please add {'+'} button on the top right of header to add your trip schedule.
                  </Text>
                </View>
              :
                <SwipeListView
                  dataSource={ds.cloneWithRows(Object.keys(myRecords))}
                  enableEmptySections
                  renderRow={(key, secId, rowId, rowMap) => {
                    const trip = myRecords[key];
                    // filter by searchBar
                    const location = trip.location.description.toLowerCase();
                    if (location.indexOf(searchText.toLowerCase()) < 0) {
                      return <View />;
                    }
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
                        rightOpenValue={-200}
                      >
                        <View style={styles.tripItemBack}>
                          <TouchableOpacity
                            onPress={this.deleteTrip.bind(this, trip)}
                            style={[styles.actionButton, { backgroundColor: Color.red }]}
                          >
                            <Icon name="ios-trash-outline" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            testID={`trip-edit-${trip.createdTime}`}
                            onPress={this.editTrip.bind(this, trip)}
                            style={[styles.actionButton, { backgroundColor: Color.green }]}
                          >
                            <Icon name="create" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            testID={`trip-detail-${trip.createdTime}`}
                            onPress={this.showTrip.bind(this, trip)}
                            style={[styles.actionButton, { backgroundColor: Color.blue }]}
                          >
                            <Icon name="ios-eye-outline" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.tripItemFront}>
                          <View style={styles.tripItemLine}>
                            <Text style={styles.ItemLeftText}>Destination:</Text>
                            <Text style={styles.ItemRightText}>{trip.location.description}</Text>
                            <TouchableOpacity testID={`trip-${trip.createdTime}`} onPress={() => this.onSwipeTrip(rowMap[`${secId}${rowId}`])}>
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
                          <View style={styles.tripItemLine}>
                            <Text style={styles.ItemLeftText}>Comment:</Text>
                            <Text style={styles.ItemRightText}>{trip.comment}</Text>
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
  myProfile: state.myProfile,
  filterOption: state.filterOption,
}), mapDispatchToProps)(UserBrowseTrip);


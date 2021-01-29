// import libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import CustomHeader from '../../components/header';
import Avatar from '../../components/avatar';
import * as Operator from '../../lib/operator';
import * as Server from '../../lib/server';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const END_TRIP = 'Ended Trip';
const ON_TRIP = 'On Trip';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileView: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    color: Color.text,
    fontSize: 16,
  },
  timeView: {
    height: dySize(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    height: dySize(200),
    width: dySize(335),
    marginVertical: 20,
  },
  dateView: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 14,
    color: 'black',
    width: dySize(130),
  },
  infoText: {
    fontSize: 18,
    color: Color.text,
    width: dySize(200),
  },
  commentView: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Color.text,
    paddingHorizontal: 10,
  },
  remainTime: {
    fontSize: 40,
    color: Color.text,
  },
  mapMarker: {
    fontSize: 26,
    color: Color.red,
    backgroundColor: 'transparent',
  },
});

export class UserTripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      startDate: '',
      endDate: '',
      location: {},
      RTime: 'Please wait...',
      latitude: 0,
      longitude: 0,
      username: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    const tripData = this.props.navigation.state.params.trip;
    this.setState({
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      comment: tripData.comment,
      location: tripData.location,
      latitude: tripData.location.geometry.location.lat,
      longitude: tripData.location.geometry.location.lng,
      region: {
        latitude: tripData.location.geometry.location.lat,
        longitude: tripData.location.geometry.location.lng,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      },
    });
    // get count timer
    Operator.getRTime(tripData.endDate, (timeoffset) => {
      if (timeoffset < 0) this.setState({ RTime: END_TRIP });
      else {
        Operator.getRTime(tripData.startDate, (TSO) => {
          if (TSO < 0) this.setState({ RTime: ON_TRIP });
          else this.startCountDownTimer(TSO);
        });
      }
    });
    // get trip owner's name( for only admin )
    Server.getUserProfile(tripData.userId, (user) => {
      if (this.mounted) this.setState({ username: user.name });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startCountDownTimer(TSO) {
    setTimeout(() => {
      const RTime = Operator.getRTimeFormat(TSO);
      if (this.mounted) {
        this.setState({ RTime });
      }
      if (this.mounted && RTime !== ON_TRIP) this.startCountDownTimer(TSO - 1000);
    }, 1000);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    const {
      location, startDate, endDate, comment, RTime, latitude, longitude, region, username,
    } = this.state;
    return (
      <Container>
        <CustomHeader
          left="ios-arrow-back"
          title="Trip Details"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          {
            this.props.myProfile.role === 'Admin' ?
              <View style={styles.profileView}>
                <Avatar userId={this.props.navigation.state.params.trip.userId} />
                <Text style={styles.name}>{username}</Text>
              </View>
            : null
          }
          <View style={styles.timeView}>
            {
              RTime.indexOf(ON_TRIP) < 0 && RTime.indexOf(END_TRIP) < 0 ?
                <Text style={styles.remainTime}>Start In</Text>
              : null
            }
            <Text testID="trip-state" style={styles.remainTime}>{RTime}</Text>
          </View>
          <Text style={styles.infoTitle}>Destination:</Text>
          <Text style={[styles.infoText, { width: null }]}>{location.description}</Text>
          <View style={styles.mapView}>
            <MapView
              style={{ flex: 1 }}
              showsMyLocationButton
              loadingEnabled
              initialRegion={region}
            >
              <MapView.Marker
                coordinate={{
                    latitude,
                    longitude,
                }}
                title="Destination"
                description={location.description}
              >
                <View>
                  <Icon name="md-pin" style={styles.mapMarker} />
                </View>
              </MapView.Marker>
            </MapView>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.infoTitle}>Start Date:</Text>
            <Text style={styles.infoText}>{startDate}</Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.infoTitle}>End Date:</Text>
            <Text style={styles.infoText}>{endDate}</Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.infoTitle}>Comment:</Text>
            <View><Text style={styles.infoText}>{comment}</Text></View>
          </View>
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
}), mapDispatchToProps)(UserTripDetail);

// import libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/textInput';
import GooglePlacePicker from '../../components/googleplaces';
import CustomDatePicker from '../../components/datepicker';
import CustomButton from '../../components/button';
import CustomLoadingView from '../../components/loading';
import Avatar from '../../components/avatar';
import * as Server from '../../lib/server';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  destination: {
    color: Color.text,
    marginBottom: 10,
  },
  profileView: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    color: Color.text,
    fontSize: 16,
  },
});

export class UserEditTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      startDate: '',
      endDate: '',
      location: {},
      username: '',
      isLoading: false,
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
    });

    Server.getUserProfile(tripData.userId, (user) => {
      if (this.mounted) this.setState({ username: user.name });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  editTrip() {
    const {
      location, startDate, endDate, comment,
    } = this.state;
    if (!this.checkValidate()) return;
    this.setState({ isLoading: true });
    const param = {
      ...this.props.navigation.state.params.trip,
      location,
      startDate,
      endDate,
      comment,
    };
    Server.editTrip(param, (res) => {
      this.setState({ isLoading: false });
      if (res === 'success') {
        this.props.showToast('Edited successfully');
        this.props.navigation.goBack();
      } else {
        this.props.showToast(res);
      }
    });
  }

  checkValidate() {
    if (this.state.location.description === undefined) {
      this.props.showToast('Please select your destination');
      return false;
    } else if (this.state.startDate > this.state.endDate) {
      this.props.showToast('Start date or end date is incorrect!');
      return false;
    } else if (this.state.comment.replace(/ /g, '') === '') {
      this.props.showToast('Your comment is empty');
      return false;
    }
    return true;
  }

  render() {
    const {
      startDate, endDate, comment, isLoading, username,
    } = this.state;
    const defaultLocation = this.props.navigation.state.params.trip.location;
    return (
      <Container>
        <CustomHeader
          left="ios-arrow-back"
          title="Edit Trip"
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
          <View style={{ height: dySize(200) }}>
            <Text style={styles.destination}>Your destination</Text>
            <GooglePlacePicker
              defaultValue={defaultLocation.description}
              onPress={location => this.setState({ location })}
            />
          </View>
          <CustomDatePicker date={startDate} front="From" onSelect={date => this.setState({ startDate: date })} />
          <CustomDatePicker date={endDate} front="To" onSelect={date => this.setState({ endDate: date })} />
          <CustomInput
            testID="trip-edit-comment"
            width={dySize(320)}
            multiline
            text={comment}
            placeholder="Comment"
            onChange={cmt => this.setState({ comment: cmt })}
          />
          <CustomButton testID="trip-edit-done" onPress={this.editTrip.bind(this)} text="Done" />
        </Content>
        <CustomLoadingView visible={isLoading} />
      </Container>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myProfile: state.myProfile,
}), mapDispatchToProps)(UserEditTrip);

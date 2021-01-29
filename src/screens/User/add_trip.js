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
import * as Operator from '../../lib/operator';
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

class UserAddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      startDate: '',
      endDate: '',
      location: {},
      isLoading: false,
      username: this.props.navigation.state.params.user.name,
    };
  }

  componentDidMount() {
    const TS = new Date().getTime();
    this.setState({
      startDate: Operator.getDateWithFormat(TS),
      endDate: Operator.getDateWithFormat(TS),
    });
  }

  addTrip() {
    const {
      location, startDate, endDate, comment,
    } = this.state;
    if (!this.checkValidate()) return;
    this.setState({ isLoading: true });
    const param = {
      userId: this.props.navigation.state.params.user.uid,
      location: {
        description: location.description,
        geometry: location.geometry,
        id: location.id,
      },
      startDate,
      endDate,
      comment,
      createdTime: new Date().getTime(),
    };
    Server.addTrip(param, (res) => {
      this.setState({ isLoading: false });
      if (res === 'success') {
        this.props.showToast('Added successfully');
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
      startDate, endDate, comment, username,
    } = this.state;
    return (
      <Container>
        <CustomHeader
          left="ios-arrow-back"
          title="Add Trip"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          {
            this.props.navigation.state.params.user.uid !== this.props.myProfile.uid ?
              <View style={styles.profileView}>
                <Avatar
                  userId={this.props.navigation.state.params.user.uid}
                  blocked={this.props.navigation.state.params.blocked}
                />
                <Text style={styles.name}>{username}</Text>
              </View>
            : null
          }
          <View style={{ height: dySize(200) }}>
            <Text style={styles.destination}>Your destination</Text>
            <GooglePlacePicker onPress={location => this.setState({ location })} />
          </View>
          <CustomDatePicker date={startDate} front="From" onSelect={date => this.setState({ startDate: date })} />
          <CustomDatePicker date={endDate} front="To" onSelect={date => this.setState({ endDate: date })} />
          <CustomInput
            width={dySize(320)}
            multiline
            text={comment}
            placeholder="Comment"
            onChange={cmt => this.setState({ comment: cmt })}
          />
          <CustomButton onPress={this.addTrip.bind(this)} text="Add" />
        </Content>
        <CustomLoadingView visible={this.state.isLoading} />
      </Container>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myProfile: state.myProfile,
}), mapDispatchToProps)(UserAddTrip);

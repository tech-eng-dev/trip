// import libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { ActionCreators } from '../../redux/actions';
import CustomButton from '../../components/button';
import CustomHeader from '../../components/header';
import { Color } from '../../theme/theme';
import * as Server from '../../lib/server';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  notifyText: {
    height: 200,
    textAlign: 'center',
    marginTop: 100,
    color: Color.text,
    fontSize: 20,
    paddingHorizontal: 30,
  },
  buttonView: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: 'flex-end',
  },
  text: {
    color: Color.text,
  },
  sendText: {
    textDecorationLine: 'underline',
    color: Color.blue,
  },
  sendButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    dismissKeyboard();
  }

  checkVerification() {
    Server.getCurrentUser((user) => {
      if (user.emailVerified) {
        this.props.listenUserProfile(this.props.navigation, user);
        this.props.fetchMyRecords(user);
        this.props.navigation.navigate('home', { role: 'User' });
      } else {
        this.props.showToast('You did not verify yet');
      }
    });
  }

  onCancelVerification() {
    // alert prompt to remove the user
    this.props.navigation.goBack();
  }

  resend() {
    Server.sendEmailVerification((status) => {
      if (status === 'success') this.props.showToast('Sent successfully!');
      else this.props.showToast(status);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          left="ios-arrow-back"
          title="Browse Trips"
          onPressLeft={() => this.onCancelVerification()}
        />
        <View testID="verify" style={styles.container}>
          <Text style={styles.notifyText}>
          The verification mail has been sent to the email you signed up.
          Please check your email address and click the url to continue.
          Click <Text style={{ color: 'blue' }}>Confirm</Text> button if you verified.
          </Text>
          <View style={styles.buttonView}>
            <Text style={styles.text}>Did you received verification email?</Text>
            <TouchableOpacity onPress={this.resend.bind(this)} style={styles.sendButton}>
              <Text style={styles.sendText}>Send again!</Text>
            </TouchableOpacity>
            <CustomButton testID="verify-confirm-button" text="Confirm" onPress={() => this.checkVerification()} />
          </View>
        </View>
      </View>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myProfile: state.myProfile,
}), mapDispatchToProps)(Verify);

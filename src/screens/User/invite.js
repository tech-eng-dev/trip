// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Communications from 'react-native-communications';
import { Container, Content } from 'native-base';
import CustomHeader from '../../components/header';
import CustomInput from '../../components/textInput';
import CustomButton from '../../components/button';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default class UserInvite extends Component {
  static propTypes = {
    onPressLeft: PropTypes.func.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onInvite() {
    Communications.email([this.state.email], null, null, 'My Subject', 'I want to invite you to my app. Please check the following link to join.');
  }

  render() {
    return (
      <Container style={{ backgroundColor: Color.white }}>
        <CustomHeader
          left="ios-menu"
          title="Invite"
          onPressLeft={this.props.onPressLeft}
        />
        <Content contentContainerStyle={styles.content}>
          <CustomInput text={this.state.email} placeholder="Email" onChange={email => this.setState({ email })} width={dySize(300)} />
          <CustomButton text="Send Invite" onPress={this.onInvite.bind(this)} />
        </Content>
      </Container>
    );
  }
}


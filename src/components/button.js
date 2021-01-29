// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Color } from '../theme/theme';
import { dySize } from '../theme/screen-size';

const styles = StyleSheet.create({
  button: {
    width: dySize(250),
    height: 40,
    backgroundColor: Color.green,
    marginVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default class CustomButton extends Component {
    static propTypes = {
      backgroundColor: PropTypes.string,
      text: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      testID: PropTypes.string,
    }

    static defaultProps = {
      backgroundColor: Color.green,
      testID: '',
    }

    constructor(props) {
      super(props);
      this.state = {

      };
    }


    render() {
      const { backgroundColor, text, testID } = this.props;
      return (
        <TouchableOpacity testID={testID} onPress={this.props.onPress} style={[styles.button, { backgroundColor }]}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );
    }
}


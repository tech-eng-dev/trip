// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { Color } from '../theme/theme';

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default class CustomLoadingView extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if (this.props.visible) {
      return (
        <View style={styles.loadingView}>
          <WaveIndicator color={Color.blue} size={80} />
        </View>
      );
    }
    return <View />;
  }
}


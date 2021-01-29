import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import { Color } from '../theme/theme';
import * as Server from '../lib/server';

const personImage = require('../resources/images/person.png');
const blockImage = require('../resources/images/block.png');

export default class Avatar extends Component {
  static propTypes = {
    width: PropTypes.number,
    userId: PropTypes.string.isRequired,
    image: PropTypes.object,
    blocked: PropTypes.bool,
  }

  static defaultProps = {
    image: undefined,
    blocked: false,
    width: 60,
  }

  constructor(props) {
    super(props);
    this.state = {
      imageURL: null,
    };
  }

  componentDidMount() {
    this.mounted = true;
    Server.getProfileImage(this.props.userId, (url) => {
      if (this.mounted) {
        if (url === 'error') this.setState({ imageURL: personImage });
        else this.setState({ imageURL: { uri: url } });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { imageURL } = this.state;
    const { width, image, blocked } = this.props;

    const style = {
      width,
      height: width,
      borderRadius: width / 2,
      backgroundColor: Color.white,
      overflow: 'hidden',
      position: 'relative',
    };
    const blockImageStyle = {
      position: 'absolute',
      width,
      height: width,
      borderRadius: width / 2,
      overflow: 'hidden',
      backgroundColor: 'transparent',
      opacity: 0.5,
    };
    return (
      <View style={style}>
        <Image
          source={image === undefined ? imageURL : image}
          indicator={ProgressBar}
          style={style}
        />
        {
          blocked ?
            <Image source={blockImage} style={blockImageStyle} />
          : null
        }
      </View>
    );
  }
}

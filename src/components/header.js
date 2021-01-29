

/* jshint esversion: 6 *//* jshint node: true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { Header, Left, Right, Button, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../theme/theme';
import { dySize } from '../theme/screen-size';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    width: dySize(250),
  },
  navButtonText: {
    color: Color.white,
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default class CustomHeader extends Component {
  static propTypes = {
    onPressLeft: PropTypes.func.isRequired,
    onPressRight: PropTypes.func,
    left: PropTypes.string.isRequired,
    right: PropTypes.string,
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
  }

  static defaultProps = {
    onPressRight: () => undefined,
    backgroundColor: Color.blue,
    right: undefined,
    title: undefined,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      backgroundColor, left, right, title,
    } = this.props;
    return (
      <Header style={{ backgroundColor }}>
        <Left>
          <Button testID={`${title.replace(/ /g, '')}-header-left-button`} transparent onPress={() => this.props.onPressLeft()}>
            <Icon name={left} size={30} color={Color.white} style={styles.icon} />
          </Button>
        </Left>
        <Body>
          {
            title === undefined ? null :
            <Text style={styles.title}>{title}</Text>
          }
        </Body>
        <Right>
          {
              (right === undefined || right === 'none') ? null :
              <Button testID="header-right-button" transparent onPress={() => this.props.onPressRight()}>
                <Icon name={right} size={30} color={Color.white} style={styles.icon} />
              </Button>
          }
        </Right>
      </Header>
    );
  }
}

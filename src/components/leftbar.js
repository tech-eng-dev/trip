// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

import { ActionCreators } from '../redux/actions';
import { Color } from '../theme/theme';
import { dySize } from '../theme/screen-size';
import { menuItems } from '../lib/constant';


const personImage = require('../resources/images/person.png');

const styles = StyleSheet.create({
  leftView: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Color.blue,
    paddingLeft: 20,
  },
  photoView: {
    flexDirection: 'row',
    height: dySize(60),
    marginBottom: 40,
  },
  infoView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  nameText: {
    padding: 5,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  roleText: {
    padding: 5,
    color: Color.text,
    fontSize: 16,
  },
  menuView: {
    flexDirection: 'row',
    height: dySize(40),
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    width: 40,
    textAlign: 'center',
    color: Color.white,
  },
  menuText: {
    color: Color.white,
    fontSize: 20,
    backgroundColor: 'transparent',
    paddingLeft: 15,
  },
  avatar: {
    borderRadius: dySize(30),
    width: dySize(60),
    height: dySize(60),
    overflow: 'hidden',
  },
});

class LeftSideView extends Component {
    static propTypes = {
      onSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      const { onSelect, myProfile, myPhoto } = this.props;
      if (myProfile.uid === undefined) return null;
      return (
        <View style={styles.leftView}>
          <View style={styles.photoView}>
            <Image
              source={myPhoto.uri === '' ? personImage : myPhoto}
              indicator={ProgressBar}
              style={styles.avatar}
            />
            <View style={styles.infoView}>
              <Text style={styles.nameText}>{myProfile.name}</Text>
              <Text style={styles.roleText}>{myProfile.role}</Text>
            </View>
          </View>
          {
            menuItems[myProfile.role].map((item, index) => (
              <TouchableOpacity testID={item.key} key={Number(index)} onPress={() => onSelect(item.key)}>
                <View style={styles.menuView}>
                  <Icon name={item.icon} size={30} style={styles.icon} />
                  <Text style={styles.menuText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(state => ({
  myProfile: state.myProfile,
  myPhoto: state.myPhoto,
}), mapDispatchToProps)(LeftSideView);

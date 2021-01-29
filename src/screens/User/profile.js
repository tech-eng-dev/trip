// import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import Toast from 'react-native-simple-toast';
import CustomHeader from '../../components/header';
import Avatar from '../../components/avatar';
import CustomButton from '../../components/button';
import * as Server from '../../lib/server';
import CustomLoadingView from '../../components/loading';
import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const ImagePicker = require('react-native-image-picker');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoView: {
    width: dySize(375),
    height: dySize(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.green,
  },
  name: {
    fontSize: 24,
    color: 'black',
  },
  infoText: {
    color: Color.text,
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
  },
  icon: {
    width: dySize(30),
    fontSize: 30,
    color: Color.text,
    marginRight: 20,
  },
  lineView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: dySize(60),
    marginTop: 40,
  },
  buttonView: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class UserProfile extends Component {
    static propTypes = {
      onPressLeft: PropTypes.func.isRequired,
    }

    static defaultProps = {

    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    onClickAvatar() {
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          if (this.mounted) this.setState({ image: source });
        }
      });
    }

    onSave() {
      const { myProfile } = this.props;
      const fileName = `${myProfile.uid}.jpg`;
      this.setState({ isLoading: true });
      Server.changePhoto(this.state.image, fileName, myProfile, (res) => {
        if (this.mounted) {
          this.setState({ isLoading: false });
          if (res === 'success') {
            Toast.show('Saved successfully', Toast.LONG);
            this.setState({ image: undefined });
          } else Toast.show('Update Error!', Toast.LONG);
        }
      });
    }

    render() {
      const { myProfile } = this.props;
      return (
        <View testID="profile-root" style={styles.container}>
          <CustomHeader
            left="ios-menu"
            title="Profile"
            onPressLeft={this.props.onPressLeft}
          />
          <View style={{ flex: 1, backgroundColor: Color.white }}>
            <View style={styles.photoView}>
              <TouchableOpacity testID="profile-avatar" onPress={this.onClickAvatar.bind(this)}>
                <Avatar userId={myProfile.uid} width={dySize(100)} image={this.state.image} />
              </TouchableOpacity>
              <Text style={styles.name}>{myProfile.name}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.lineView}>
                <Icon name="md-person" style={styles.icon} />
                <Text style={styles.infoText}>{myProfile.role}</Text>
              </View>
              <View style={styles.lineView}>
                <Icon name="md-mail" style={styles.icon} />
                <Text style={styles.infoText}>{myProfile.email}</Text>
              </View>
            </View>
            {
              this.state.image === undefined ? null
              :
              <View testID="profile-save-button" style={styles.buttonView}>
                <CustomButton text="Save" onPress={this.onSave.bind(this)} />
              </View>
            }
          </View>
          <CustomLoadingView visible={this.state.isLoading} />
        </View>
      );
    }
}


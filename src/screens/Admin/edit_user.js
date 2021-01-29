// import libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import CustomHeader from '../../components/header';
import Avatar from '../../components/avatar';
import CustomInput from '../../components/textInput';
import CustomButton from '../../components/button';
import * as Server from '../../lib/server';

import { Color } from '../../theme/theme';
import { dySize } from '../../theme/screen-size';

const ImagePicker = require('react-native-image-picker');

const ROLE = ['User', 'Manager'];
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
    flex: 1,
    color: Color.text,
    fontSize: 20,
  },
  icon: {
    width: dySize(30),
    fontSize: 30,
    color: Color.text,
    marginRight: 20,
  },
  lineView: {
    flexDirection: 'row',
    paddingHorizontal: dySize(60),
    marginTop: 40,
  },
  buttonView: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: dySize(200),
    backgroundColor: Color.green,
    padding: 5,
  },
  roleView: {
    width: dySize(200),
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 20,
    padding: 10,
    color: Color.text,
  },
});

export class AdminEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.navigation.state.params,
      username: this.props.navigation.state.params.user.name,
      role: this.props.navigation.state.params.user.role,
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
        this.setState({ image: source });
      }
    });
  }

  onSave() {
    const {
      params, username, image, role,
    } = this.state;
    const fileName = `${params.user.uid}.jpg`;
    params.user.name = username;
    params.user.role = role;
    Server.changePhoto(image, fileName, params.user, (res) => {
      if (res === 'success') {
        this.props.showToast('Edited successfully');
        if (this.mounted) this.setState({ image: undefined });
      } else this.props.showToast(res);
    });
  }

  render() {
    const {
      params, image, username, role,
    } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader
          left="ios-arrow-back"
          title="Edit User"
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <View style={{ flex: 1, backgroundColor: Color.white }}>
          <View style={styles.photoView}>
            <TouchableOpacity onPress={this.onClickAvatar.bind(this)}>
              <Avatar
                userId={params.user.uid}
                blocked={params.blocked}
                width={dySize(100)}
                image={image}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: dySize(60) }}>
              <CustomInput testID="user-edit-name-input" text={username} placeholder="Username" onChange={text => this.setState({ username: text })} />
            </View>
            <View style={styles.lineView}>
              <Icon name="md-person" style={styles.icon} />
              <ModalDropdown
                options={ROLE}
                dropdownStyle={styles.dropdown}
                renderRow={option => (
                  <TouchableOpacity>
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                )}
                onSelect={(option) => {
                    this.setState({ role: ROLE[option] });
                }}
              >
                <View style={styles.roleView}>
                  <Text style={styles.infoText}>{role}</Text>
                  <Icon name="md-arrow-dropdown" style={styles.icon} />
                </View>
              </ModalDropdown>
            </View>
            <View style={styles.lineView}>
              <Icon name="md-mail" style={styles.icon} />
              <Text style={styles.infoText}>{params.user.email}</Text>
            </View>
          </View>
          {
            image === undefined && params.user.name === username && params.user.role === role ? null
            :
            <View style={styles.buttonView}>
              <CustomButton testID="user-edit-save" text="Save" onPress={this.onSave.bind(this)} />
            </View>
        }
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
}), mapDispatchToProps)(AdminEditUser);

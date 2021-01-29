import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { ActionCreators } from '../../redux/actions';
import CustomInput from '../../components/textInput';
import CustomButton from '../../components/button';
import { dySize } from '../../theme/screen-size';
import * as Server from '../../lib/server';
import * as Operator from '../../lib/operator';
import CustomLoadingView from '../../components/loading';
import { Color } from '../../theme/theme';


const FBSDK = require('react-native-fbsdk');
const FacebookImage = require('../../resources/images/facebook.png');
const GooglePlusImage = require('../../resources/images/google.png');

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  topView: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    height: dySize(100),
    flexDirection: 'row',
    backgroundColor: Color.white,
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: 40,
    width: dySize(70),
    height: dySize(70),
    resizeMode: 'stretch',
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  text: {
    color: Color.text,
    fontSize: 12,
    textAlign: 'center',
  },
});

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      fName: '',
      lName: '',
      confirm: '',
      status: 'login',
    };
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  onEmailPasswordAuth(method) {
    const {
      email, password, fName, lName, confirm,
    } = this.state;
    // validation when sign up
    const res = Operator.checkValidation(fName, lName, email, password, confirm);
    if (method === 'signup' && res !== 'success') {
      this.props.showToast(res);
      return;
    }
    this.setState({ isLoading: true });

    Server.authUserEmailPassword({
      email, password, fName, lName,
    }, method, (status, currentUser, val) => {
      this.setState({ isLoading: false });
      if (status === 'success') {
        if (currentUser.emailVerified) {
          this.gotoHome(val);
        } else {
          this.props.navigation.navigate('verify');
        }
      } else if (status === 'blocked') {
        this.props.showToast('Your account has been blocked temporatily for security.');
      } else {
        this.props.showToast(val);
      }
    });
  }

  onFacebookAuth() {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (!result.isCancelled) {
          console.log(`Facebook Login Permissions: ${result.grantedPermissions.toString()}`);
          return AccessToken.getCurrentAccessToken();
        }
        return false;
      })
      .then((data) => {
        if (data) {
          this.setState({ isLoading: true });
          const responseInfoCallback = (error, result) => {
            if (error) {
              console.log(`Error fetching data: ${error.toString()}`);
            } else {
              Server.authFacebook(data, (currentUser) => {
                Server.updateUserProfile(currentUser, result.picture.data.url, (res) => {
                  this.setState({ isLoading: false });
                  if (res !== 'error') {
                    this.gotoHome(res);
                  }
                });
              });
            }
          };
          // get Big pixel photo using Facebook Graph API
          const bigPixelPhotoRequest = new GraphRequest('/me', {
            accessToken: data.accessToken,
            parameters: {
              fields: {
                string: 'picture.width(300).height(300)',
              },
            },
          }, responseInfoCallback);
          new GraphRequestManager().addRequest(bigPixelPhotoRequest).start();
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(`Login fail with error: ${error}`);
      });
  }

  googleAuth() {
    this.setState({ isLoading: true });
    GoogleSignin.signIn()
      .then((user) => {
        console.log('Google User', user);
        Server.authGoogle(user, (currentUser) => {
          Server.updateUserProfile(currentUser, user.photo, (result) => {
            this.setState({ isLoading: false });
            if (result !== 'error') {
              this.gotoHome(result);
            }
          });
        });
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
        this.setState({ isLoading: false });
      })
      .done();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '327109997105-t0rv3lou4mjr28ciejhr1i8s0je63t7r.apps.googleusercontent.com',
        offlineAccess: false,
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    } catch (err) {
      console.log('Google signin error', err.code, err.message);
    }
  }

  gotoHome(user) {
    this.setState({ status: 'login' });
    switch (user.role) {
      case 'User':
        this.props.listenUserProfile(this.props.navigation, user);
        this.props.fetchMyRecords(user);
        break;
      case 'Manager':
        this.props.listenUserProfile(this.props.navigation, user);
        this.props.fetchUsers();
        this.props.fetchBlockData();
        break;
      case 'Admin':
        this.props.listenUserProfile(this.props.navigation, user);
        this.props.fetchUsers();
        this.props.fetchAllRecords();
        this.props.fetchBlockData();
        break;
      default:
        break;
    }
    // this.props.navigation.navigate('home', { role: user.role });
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'home', params: { role: user.role } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {
      status, isLoading, email, password, fName, lName, confirm,
    } = this.state;
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.container}>
            {
              status === 'login' ?
                <View testID="login" style={styles.topView}>
                  <CustomInput
                    testID="login-email"
                    text={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChange={text => this.setState({ email: text.replace(/ /g, '') })}
                  />
                  <CustomInput
                    testID="login-password"
                    text={password}
                    placeholder="Password"
                    secureTextEntry
                    onChange={text => this.setState({ password: text })}
                  />
                  <CustomButton testID="login-button" text="Log In" onPress={() => this.onEmailPasswordAuth('login')} />
                  <Text style={styles.text}>Not a member yet?</Text>
                  <TouchableOpacity testID="switch-to-signup" onPress={() => this.setState({ status: 'signup' })}>
                    <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              :
                <View testID="signup" style={styles.topView}>
                  <CustomInput
                    testID="signup-first-name"
                    text={fName}
                    placeholder="First Name"
                    autoCapitalize="words"
                    onChange={text => this.setState({ fName: text })}
                  />
                  <CustomInput
                    testID="signup-last-name"
                    text={lName}
                    placeholder="Last Name"
                    autoCapitalize="words"
                    onChange={text => this.setState({ lName: text })}
                  />
                  <CustomInput
                    testID="signup-email"
                    text={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChange={text => this.setState({ email: text.replace(/ /g, '') })}
                  />
                  <CustomInput
                    testID="signup-password"
                    text={password}
                    placeholder="Password"
                    secureTextEntry
                    onChange={text => this.setState({ password: text })}
                  />
                  <CustomInput
                    testID="signup-confirm"
                    text={confirm}
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChange={text => this.setState({ confirm: text })}
                  />
                  <CustomButton testID="signup-utton" text="Sign Up" onPress={() => this.onEmailPasswordAuth('signup')} />
                  <Text style={styles.text}>Already have an account?</Text>
                  <TouchableOpacity testID="switch-to-login" onPress={() => this.setState({ status: 'login' })}>
                    <Text style={[styles.text, { textDecorationLine: 'underline' }]}>Log In</Text>
                  </TouchableOpacity>
                </View>
              }
            <View style={styles.bottomView}>
              <TouchableOpacity testID="facebook-button" onPress={() => this.onFacebookAuth()}>
                <Image source={FacebookImage} style={styles.socialButton} />
              </TouchableOpacity>
              <TouchableOpacity testID="google-button" onPress={() => this.googleAuth()}>
                <Image source={GooglePlusImage} style={styles.socialButton} />
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <CustomLoadingView visible={isLoading} />
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);


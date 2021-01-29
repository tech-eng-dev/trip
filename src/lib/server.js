import firebase from './firebase';
import * as Operator from './operator';

// Update photo after login, register profile(name, email, role, photo, uid) after sign up.
export const updateUserProfile = (user, photoURL, callback) => {
  const ref = firebase.database().ref(`/User/${user.uid}`);
  ref.once('value', (snapshot) => {
    let profile = {};
    if (snapshot.val()) {
      profile = snapshot.val();
      profile.photo = photoURL;
      ref.update(profile);
    } else {
      profile = {
        email: user.email,
        name: user.displayName,
        role: 'User',
        photo: photoURL,
        uid: user.uid,
      };
      ref.set(profile);
    }
    callback(profile);
  });
};

// for only email/password authentication
export const authUserEmailPassword = (authUser, method, callback) => {
  if (method === 'login') {
    const email = Operator.encodeEmail(authUser.email);
    firebase.auth().signInWithEmailAndPassword(authUser.email, authUser.password)
      .then((user) => {
        let ref = firebase.database().ref('/Block/');
        // check block users
        ref.once('value', (snapshot) => {
          const data = snapshot.val();
          if (data[email] > 2) {
            callback('blocked', null, null);
          } else {
            // reset wrong password counter
            ref = firebase.database().ref('/Block/');
            const update = {};
            update[email] = 0;
            ref.update(update);
            // login successfully
            console.log('User successfully logged in', user);
            ref = firebase.database().ref(`/User/${user.uid}`);
            ref.once('value', (logindata) => {
              let profile = {};
              if (logindata.val()) {
                profile = logindata.val();
              }
              callback('success', user, profile);
            });
          }
        });
      })
      .catch((err) => {
        console.log('User signin error', err);
        const error = err.toString();

        // check wrong password count
        if (error.indexOf('The password is invalid') > -1) {
          firebase.auth().signInAnonymously()
            .then(() => {
              const ref = firebase.database().ref('/Block/');
              ref.once('value', (snapshot) => {
                let data = {};
                data = snapshot.val();
                if (data == null) {
                  const update = {};
                  update[email] = 1;
                  ref.set(update);
                  callback('error', null, error);
                } else if (data[email] === undefined) {
                  const update = {};
                  update[email] = 1;
                  ref.update(update);
                  callback('error', null, error);
                } else {
                  const update = {};
                  update[email] = Number(data[email]) + 1;
                  ref.update(update);
                  if (update[email] > 2) {
                    callback('error', null, 'Your account has been blocked temporatily for security.');
                  }
                }
              });
            })
            .catch(e => console.log(JSON.stringify(e)));
        } else {
          callback('error', null, error);
        }
      });
  } else { // sign up
    firebase.auth().createUserWithEmailAndPassword(authUser.email, authUser.password)
      .then((userData) => {
        console.log('user created', userData);
        firebase.auth().currentUser
          .sendEmailVerification()
          .then(() => {
            const ref = firebase.database().ref(`/User/${userData.uid}`);
            const profile = {
              email: authUser.email,
              name: `${authUser.fName} ${authUser.lName}`,
              role: 'User',
              photo: '',
              uid: userData.uid,
            };
            ref.set(profile);
            callback('success', userData, profile);
          })
          .catch();
      })
      .catch((err) => {
        console.log('An error occurred', err);
        callback('error', null, err.toString());
      });
  }
};

export const sendEmailVerification = (callback) => {
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      callback('success');
    })
    .catch(((e) => {
      callback(JSON.stringify(e));
    }));
};

export const authFacebook = (data, callback) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
  // AsyncStorage.setItem('credential', JSON.stringify(credential), () => {});
  firebase.auth().signInWithCredential(credential)
    .then((currentUser) => {
      if (currentUser) {
        callback(currentUser);
      }
    })
    .catch((error) => {
      console.log(error);
      callback('error');
    });
};

export const authGoogle = (user, callback) => {
  const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
  // AsyncStorage.setItem('credential', JSON.stringify(credential), () => {});
  firebase.auth().signInWithCredential(credential)
    .then((currentUser) => {
      if (currentUser) {
        callback(currentUser);
      }
    })
    .catch((error) => {
      console.log(error);
      callback('error');
    });
};

export const getUserProfile = (userId, callback) => {
  const ref = firebase.database().ref(`/User/${userId}`);
  ref.on('value', (snapshot) => {
    let data = {};
    if (snapshot.val()) {
      data = snapshot.val();
      if (data.photo.indexOf('http') < 0) {
        firebase.storage()
          .ref(`Avatar/${data.photo}`)
          .getDownloadURL()
          .then((url) => {
            firebase.storage().refFromURL(url).getDownloadURL()
              .then(photoURL => {
                data.photo = photoURL;
                callback(data);
              });
          })
          .catch((e) => {
            console.log(e.toString());
            callback(data);
          });
      } else {
        callback(data);
      }
    } else {
      callback(data);
    }
  });
};

export const getProfileImage = (userId, callback) => {
  const ref = firebase.database().ref(`/User/${userId}`);
  ref.on('value', (snapshot) => {
    if (snapshot.val()) {
      const user = snapshot.val();
      // get Image URL
      if (user.photo.indexOf('http') > -1) {
        callback(user.photo);
      } else {
        firebase.storage()
          .ref(`Avatar/${user.photo}`)
          .getDownloadURL()
          .then((url) => {
            firebase.storage().refFromURL(url).getDownloadURL()
              .then(photoURL => callback(photoURL));
          })
          .catch((e) => {
            console.log(e.toString());
            callback('error');
          });
      }
    } else {
      callback('error', null);
    }
  });
};

// to confirm email verification
export const getCurrentUser = (callback) => {
  firebase.auth().currentUser.reload()
    .then(() => callback(firebase.auth().currentUser))
    .catch();
};

export const addTrip = (param, callback) => {
  const ref = firebase.database().ref(`/Trip/${param.userId}/${param.createdTime}`);
  ref.set(param)
    .then(() => callback('success'))
    .catch(e => callback(JSON.stringify(e)));
};

export const getMyRecords = (user, callback) => {
  const ref = firebase.database().ref(`/Trip/${user.uid}`);
  ref.on('value', (snapshot) => {
    let result = {};
    if (snapshot.val()) {
      result = snapshot.val();
    }
    callback(result);
  });
};

export const getAllRecords = (callback) => {
  const ref = firebase.database().ref('/Trip/');
  ref.on('value', (snapshot) => {
    const result = [];
    if (snapshot.val()) {
      const records = snapshot.val();
      Object.keys(records).map((key1) => {
        const userRecord = records[key1];
        Object.keys(userRecord).map((key2) => {
          result.push(userRecord[key2]);
          return true;
        });
        return true;
      });
      callback(result);
    } else {
      callback(result);
    }
  });
};

export const editTrip = (param, callback) => {
  const ref = firebase.database().ref(`/Trip/${param.userId}/${param.createdTime}`);
  ref.update(param)
    .then(() => callback('success'))
    .catch(e => callback(JSON.stringify(e)));
};

export const deleteTrip = (trip, callback) => {
  const ref = firebase.database().ref(`/Trip/${trip.userId}/${trip.createdTime}`);
  ref.remove()
    .then(() => callback('success'))
    .catch(e => callback(JSON.stringify(e)));
};

export const changePhoto = (image, name, Me, callback) => {
  if (image === undefined) {
    const ref = firebase.database().ref(`/User/${Me.uid}`);
    ref.update(Me)
      .then(() => {
        callback('success');
      })
      .catch(e => callback(JSON.stringify(e)));
  } else {
    firebase.storage()
      .ref('Avatar')
      .child(name)
      .put(image.uri, { contentType: 'iamge/jpeg' })
      .then(() => {
        const ref = firebase.database().ref(`/User/${Me.uid}`);
        ref.update({
          ...Me,
          photo: name,
        })
          .then(() => {
            callback('success');
          })
          .catch(e => callback(JSON.stringify(e)));
      })
      .catch(e => callback(JSON.stringify(e)));
  }
};

export const logout = (callback) => {
  firebase.auth().signOut()
    .then(() => callback('success'))
    .catch(e => callback(JSON.stringify(e)));
};


export const getUsers = (callback) => {
  const ref = firebase.database().ref('/User/');
  ref.on('value', (snapshot) => {
    let userdata = {};
    if (snapshot.val()) {
      userdata = snapshot.val();
    }
    callback(userdata);
  });
};

export const getBlockData = (callback) => {
  const ref = firebase.database().ref('/Block/');
  ref.on('value', (snapshot) => {
    let blockdata = {};
    if (snapshot.val()) {
      blockdata = snapshot.val();
    }
    callback(blockdata);
  });
};

export const unblockUser = (user) => {
  let ref = firebase.database().ref('/Block/');
  const update = {};
  update[Operator.encodeEmail(user.email)] = 0;
  ref.update(update);
  ref = firebase.database().ref(`/User/${user.uid}`);
  ref.update({
    blocked: false,
  });
  return 'success';
};

export const blockUser = (user) => {
  let ref = firebase.database().ref('/Block/');
  const update = {};
  update[Operator.encodeEmail(user.email)] = 3;
  ref.update(update);
  ref = firebase.database().ref(`/User/${user.uid}`);
  ref.update({
    blocked: true,
  });
  return 'success';
};


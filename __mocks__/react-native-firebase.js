export class Database {
    ref = (path) => {
      if (!this[path]) {
        this[path] = new Reference(path);
      }
      return this[path];
    }
}

export class Reference {
  constructor(path) {
    this.path = path;
    this.snap = { val: () => this._val() };
    this.data = null;
  }

    _val = jest.fn(() => this.data)

    once = jest.fn((param, callback) => {
      const promise = new Promise((resolve, reject) => {
        if (callback) {
          callback(this.snap);
          resolve();
        } else {
          resolve(this.snap);
        }
      });
      RNFirebase.promises.push(promise);
      return promise;
    })

    on = jest.fn((param, callback) => {
      const promise = new Promise((resolve, reject) => {
        if (callback) {
          callback(this.snap);
          resolve();
        } else {
          resolve(this.snap);
        }
      });
      RNFirebase.promises.push(promise);
      return promise;
    })

    off = jest.fn((param, callback) => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    })

    update = jest.fn((data) => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    })

    set = jest.fn((data) => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    })

    remove = jest.fn(() => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    })
}

export class StoreChildReference {
  put = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })
}

export class StoreReference {
  child = (path) => {
    if (!this[path]) {
      this[path] = new StoreChildReference(path);
    }
    return this[path];
  }
}

export class Storage {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new StoreReference(path);
    }
    return this[path];
  }
}

export class Auth {
  currentUser = {
    uid: '',
    email: 'litian19901120Q@gmail.com',
    emailVerified: true,
    displayName: 'Tian Li',
    sendEmailVerification: jest.fn((data) => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    }),
  }

  signInWithEmailAndPassword = jest.fn((data) => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })

  signInAnonymously = jest.fn((data) => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })

  signInWithCredential = jest.fn((data) => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })

  createUserWithEmailAndPassword = jest.fn((data) => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })

  signOut = jest.fn((data) => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  })
}

export class MockFirebase {
  constructor() {
    this.database = () => {
      if (!this.databaseInstance) {
        this.databaseInstance = new Database();
      }
      return this.databaseInstance;
    };

    this.storage = () => {
      if (!this.storageInstance) {
        this.storageInstance = new Storage();
      }
      return this.storageInstance;
    };

    this.auth = () => {
      if (!this.authInstance) {
        this.authInstance = new Auth();
      }
      return this.authInstance;
    };
  }
}

export default class RNFirebase {
  static initializeApp() {
    RNFirebase.firebase = new MockFirebase();
    RNFirebase.promises = [];
    return RNFirebase.firebase;
  }

  static reset() {
    RNFirebase.promises = [];
    RNFirebase.firebase.databaseInstance = null;
  }

  static waitForPromises() {
    return Promise.all(RNFirebase.promises);
  }
}

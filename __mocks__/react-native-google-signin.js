export class GoogleSignin {
    signIn = jest.fn((param, callback) => {
      const promise = Promise.resolve();
      RNFirebase.promises.push(promise);
      return promise;
    })

    hasPlayServices = jest.fn()
    configure = jest.fn()
    currentUserAsync = jest.fn()
}

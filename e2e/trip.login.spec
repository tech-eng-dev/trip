// beforeEach(async () => {
//   await device.reloadReactNative();
// });

describe('Login', () => {
  it('Type email and password', async () => {
    await element(by.id('login-email')).typeText('litian19901120@gmail.com');
    await element(by.id('login-password')).typeText('123456');
  });

  it('Logged in successfully', async () => {
    await element(by.id('login-button')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });
});

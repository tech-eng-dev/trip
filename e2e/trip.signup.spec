describe('Signup', () => {
  it('switch to signup screen', async () => {
    await device.reloadReactNative();
    await element(by.id('switch-to-signup')).tap();
    await expect(element(by.id('signup'))).toBeVisible();
  });

  it('Type full name, email, password', async () => {
    await element(by.id('signup-first-name')).tap();
    await element(by.id('signup-first-name')).typeText('Tian');
    await element(by.id('signup-last-name')).typeText('Li');
    await element(by.id('signup-email')).typeText('ghost123@gmail.com');
    await element(by.id('signup-password')).typeText('123456');
    await element(by.id('signup-confirm')).typeText('123456');
  });

  it('Signed up successfully, but did not verify email yet', async () => {
    await element(by.id('signup-button')).tap();
    await expect(element(by.id('verify'))).toBeVisible();
    await element(by.id('verify-confirm-button')).tap();
  });
});

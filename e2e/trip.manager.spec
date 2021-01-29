describe('Manager', () => {
  it('Login', async () => {
    await element(by.id('login-email')).typeText('creativemickey888@gmail.com');
    await element(by.id('login-password')).typeText('123456');
  });

  it('Logged in successfully', async () => {
    await element(by.id('login-button')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('Search User', async () => {
    await element(by.id('user-search-input')).tap();
    await element(by.id('user-search-input')).typeText('888');
    await element(by.id('user-search-input')).clearText();
  });

  it('Block User', async () => {
    await element(by.id('user-litiyan2015@gmail.com')).tap();
    await element(by.id('user-litiyan2015@gmail.com')).tap();
    await expect(element(by.id('user-block-litiyan2015@gmail.com'))).toBeVisible();
    await element(by.id('user-block-litiyan2015@gmail.com')).tap();
  });

  it('Go to Admin Edit User page', async () => {
    await element(by.id('user-litiyan2015@gmail.com')).tap();
    await element(by.id('user-edit-litiyan2015@gmail.com')).tap();
    await element(by.id('user-edit-name-input')).tap();
    await element(by.id('user-edit-name-input')).clearText();
    await element(by.id('user-edit-name-input')).typeText('Mickey');
    await element(by.id('user-edit-save')).tap();
  });

  it('Go to Profile page to change avatar Image', async () => {
    await expect(element(by.id('BrowseUsers-header-left-button'))).toBeVisible();
    await element(by.id('BrowseUsers-header-left-button')).tap();
    await element(by.id('manager-profile')).tap();
    await element(by.id('profile-avatar')).tap();
    await element(by.id('profile-root')).tapAtPoint({ x: 200, y: 300 });
    // await expect(element(by.id('profile-save-button'))).toBeVisible();
  });

  it('Go to Invite screen', async () => {
    await element(by.id('Profile-header-left-button')).tap();
    await element(by.id('manager-invite')).tap();
  });

  it('Logout', async () => {
    await element(by.id('Invite-header-left-button')).tap();
    await element(by.id('logout')).tap();
  });
});


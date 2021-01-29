describe('Manager', () => {
  it('Login', async () => {
    await element(by.id('login-email')).typeText('litiyan2015@gmail.com');
    await element(by.id('login-password')).typeText('123456');
  });

  it('Logged in successfully', async () => {
    await element(by.id('login-button')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('Search Trip', async () => {
    await element(by.id('trip-search-input')).tap();
    await element(by.id('trip-search-input')).typeText('Georgia');
    await element(by.id('trip-search-input')).clearText();
  });

  it('Filter Trip', async () => {
    await element(by.id('trip-filter')).tap();
    await expect(element(by.id('filter'))).toBeVisible();
    await element(by.id('filter')).tap();
    await element(by.id('trip-filter')).tap();
    await expect(element(by.id('cancel-filter'))).toBeVisible();
    await element(by.id('cancel-filter')).tap();
  });

  it('Go to User Trip Edit page', async () => {
    await element(by.id('trip-1518464370974')).tap();
    await element(by.id('trip-1518464370974')).tap();
    await element(by.id('trip-edit-1518464370974')).tap();
    await element(by.id('trip-edit-comment')).tap();
    await element(by.id('trip-edit-comment')).typeText('My trip comment');
    await element(by.id('trip-edit-done')).tap();
  });

  // it('Go to Trip Detail Page', async () => {
  //   await element(by.id('trip-1518464370974')).tap();
  //   await element(by.id('trip-detail-1518464370974')).tap();
  //   await element(by.id('TripDetails-header-left-button')).tap();
  // });

  it('Go to Profile screen', async () => {
    await element(by.id('MyTrips-header-left-button')).tap();
    await element(by.id('user-profile')).tap();
    await element(by.id('profile-avatar')).tap();
    await element(by.id('profile-root')).tapAtPoint({ x: 200, y: 300 });
  });

  it('Go to Invite screen', async () => {
    await element(by.id('Profile-header-left-button')).tap();
    await element(by.id('user-invite')).tap();
  });

  it('Print Trip', async () => {
    await element(by.id('Invite-header-left-button')).tap();
    await element(by.id('user-browse')).tap();
    await element(by.id('print-button')).tap();
    await expect(element(by.id('print'))).toBeVisible();
    await element(by.id('print')).tap();
  });
});


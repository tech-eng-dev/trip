describe('Admin', () => {
  it('Type email and password', async () => {
    await element(by.id('login-email')).typeText('litian19901120@gmail.com');
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

  it('Go to Admin Add Trip page', async () => {
    await element(by.id('user-litiyan2015@gmail.com')).tap();
    await element(by.id('user-add-trip-litiyan2015@gmail.com')).tap();
    await element(by.id('AddTrip-header-left-button')).tap();
  });

  it('Go to Admin Edit User page', async () => {
    await element(by.id('user-litiyan2015@gmail.com')).tap();
    await element(by.id('user-edit-litiyan2015@gmail.com')).tap();
    await element(by.id('user-edit-name-input')).tap();
    await element(by.id('user-edit-name-input')).typeText('C');
    await element(by.id('user-edit-save')).tap();
  });

  it('Go to browse trip screen', async () => {
    await element(by.id('EditUser-header-left-button')).tap();
    await element(by.id('BrowseUsers-header-left-button')).tap();
    await element(by.id('admin-browse-trip')).tap();
  });

  it('Search Trip', async () => {
    await element(by.id('trip-search-input')).tap();
    await element(by.id('trip-search-input')).typeText('ri');
    await element(by.id('trip-search-input')).clearText();
  });

  it('Swipe Trip Item and go to edit trip screen', async () => {
    await element(by.id('trip-7MnU3xgql7O5RduyY2TpNig4KtA2-1518464370974')).tap();
    await element(by.id('trip-7MnU3xgql7O5RduyY2TpNig4KtA2-1518464370974')).tap();
    await element(by.id('trip-edit-7MnU3xgql7O5RduyY2TpNig4KtA2-1518464370974')).tap();
  });

  it('Change trip comment to save', async () => {
    await expect(element(by.id('trip-edit-comment'))).toBeVisible();
    await element(by.id('trip-edit-comment')).tap();
    await element(by.id('trip-edit-comment')).clearText();
    await element(by.id('trip-edit-comment')).typeText('Updated comment');
    await element(by.id('trip-edit-done')).tap();
  });

  it('Filter Trip', async () => {
    await element(by.id('trip-filter')).tap();
    await expect(element(by.id('filter'))).toBeVisible();
    await element(by.id('filter')).tap();
    await element(by.id('trip-filter')).tap();
    await expect(element(by.id('cancel-filter'))).toBeVisible();
    await element(by.id('cancel-filter')).tap();
  });

  it('Go to Profile page to change avatar Image', async () => {
    await element(by.id('BrowseTrips-header-left-button')).tap();
    await element(by.id('admin-profile')).tap();
    await element(by.id('profile-avatar')).tap();
    await element(by.id('profile-root')).tapAtPoint({ x: 200, y: 300 });
    // await expect(element(by.id('profile-save-button'))).toBeVisible();
  });

  it('Go to Invite screen', async () => {
    await element(by.id('Profile-header-left-button')).tap();
    await element(by.id('admin-invite')).tap();
  });

  it('Go to Trip detail screen', async () => {
    await element(by.id('Invite-header-left-button')).tap();
    await element(by.id('admin-browse-trip')).tap();
    await element(by.id('trip-7MnU3xgql7O5RduyY2TpNig4KtA2-1518464370974')).tap();
    await element(by.id('trip-detail-7MnU3xgql7O5RduyY2TpNig4KtA2-1518464370974')).tap();
  });
});

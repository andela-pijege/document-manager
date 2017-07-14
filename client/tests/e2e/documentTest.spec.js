module.exports = {
  'User can sign in with correct login details': (browser) => {
    browser
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'ghost@ghost.com')
      .setValue('input[name=password]', 'ghostmode')
      .click('.login-btn')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'My documents')
      .assert.urlEquals('http://localhost:9000/dashboard')
      .pause(1000);
  },
  'User sign out of application': (browser) => {
    browser
      .url('http://localhost:9000/dashboard')
      .waitForElementVisible('body', 5000)
      .assert.visible('.brand-logo')
      .assert.urlEquals(`${'http://localhost:9000/dashboard'}`)
      .waitForElementVisible('.logout-btn', 5000)
      .click('.logout-btn')
      .pause(2000)
      .end();
  },
};

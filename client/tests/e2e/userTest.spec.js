module.exports = {
  'User cannot sign in without credentials': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('.login-btn')
      .waitForElementVisible('h3', 5000)
      .assert.containsText('h3', 'Sign in');
  },
  'User cannot sign in with wrong email': (browser) => {
    browser
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'wrongemail@email.com')
      .setValue('input[name=password]', 'password')
      .click('.login-btn')
      .waitForElementVisible('h3', 5000)
      .assert.containsText('h3', 'Sign in')
      .pause(1000);
  },
  'User cannot sign in with wrong password': (browser) => {
    browser
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'ghost@ghost.com')
      .setValue('input[name=password]', 'wrong_password')
      .click('.login-btn')
      .waitForElementVisible('h3', 5000)
      .assert.containsText('h3', 'Sign in')
      .pause(1000);
  },
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
      .pause(2000);
  },
  'Admin can sign in with correct login details': (browser) => {
    browser
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'lordprecious1@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('.login-btn')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'My documents')
      .assert.urlEquals('http://localhost:9000/dashboard')
      .pause(1000);
  },
  'Admin should be able to view all users': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .waitForElementVisible('li[id="allUsers"]', 5000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .assert.visible('li[id="allUsers"]')
      .assert.visible('li[id="dashboard"]')
      .click('li[id="allUsers"]')
      .pause(2000)
      .assert.visible('h4.title')
      // .assert.urlEquals('http://localhost:9000/allUsers')
      // .waitForElementVisible('h3.user__number', 5000)
      // .assert.visible('table.responsive-table')
      .pause(5000)
      .end();
  },
};

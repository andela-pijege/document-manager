module.exports = {
  'User can sign in with correct login details': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:9000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'ghost@ghost.com')
      .setValue('input[name=password]', 'ghostmode')
      .click('.login-btn')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'My documents')
      .assert.urlEquals('http://localhost:9000/dashboard')
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .assert.visible('li[id="publicDocument"]')
      .assert.visible('li[id="dashboard"]')
      .pause(2000);
  },
  'User should be able to create documents': (browser) => {
    browser
      .waitForElementVisible('i.create-btn', 3000)
      .assert.visible('i.create-btn')
      .click('.create-btn')
      .assert.urlEquals('http://localhost:9000/createDocument')
      .waitForElementVisible('input[id="title"]', 5000)
      .waitForElementVisible('select[id="access"]', 5000)
      .waitForElementVisible('.cke_wysiwyg_frame', 5000)
      .waitForElementVisible('button[id="submit"]', 5000)
      .assert.visible('input[id="title"]')
      .assert.visible('select[id="access"]')
      .assert.visible('.cke_wysiwyg_frame')
      .assert.visible('button[id="submit"]')
      .frame(0)
      .setValue('.cke_editable', 'creating a random document  from end to end testing')
      .frame(null)
      .setValue('input[id="title"]', 'E2E Testing')
      .setValue('select[id="access"]', 'public')
      .click('.save-btn')
      .pause(3000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .pause(3000);
  },
  'User should be able to see other public documents and view them': (browser) => {
    browser
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .assert.visible('li[id="publicDocument"]')
      .assert.visible('li[id="dashboard"]')
      .assert.visible('li[id="publicDocument"]')
      .click('li[id="publicDocument"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/publicDocuments')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'General public documents')
      .waitForElementVisible('.view-doc', 3000)
      .assert.visible('.card-title')
      .assert.visible('.card-action')
      .assert.visible('.view-doc')
      .click('.view-doc')
      .pause(2000)
      .waitForElementVisible('.close-doc', 5000)
      .assert.visible('.close-doc')
      .click('.close-doc')
      .pause(2000);
  },
  'User should be able to see roles documents and view them': (browser) => {
    browser
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .assert.visible('li[id="publicDocument"]')
      .assert.visible('li[id="dashboard"]')
      .assert.visible('li[id="roleDocument"]')
      .click('li[id="roleDocument"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/rolesDocument')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'Roles documents')
      .waitForElementVisible('.view-doc', 3000)
      .assert.visible('.card-title')
      .assert.visible('.card-action')
      .assert.visible('.view-doc')
      .click('.view-doc')
      .pause(2000)
      .waitForElementVisible('.close-doc', 5000)
      .assert.visible('.close-doc')
      .click('.close-doc')
      .pause(2000);
  },
  'User should be able to view personal documents': (browser) => {
    browser
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .assert.visible('li[id="publicDocument"]')
      .assert.visible('li[id="dashboard"]')
      .click('li[id="dashboard"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:9000/dashboard')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'My documents')
      .assert.visible('.card-title')
      .assert.visible('.card-action')
      .waitForElementVisible('.view-doc', 3000)
      .assert.visible('.view-doc')
      .click('.view-doc')
      .pause(2000)
      .waitForElementVisible('.close-doc', 5000)
      .assert.visible('.close-doc')
      .click('.close-doc')
      .pause(5000);
  },
  'User should be able to delete personal document': (browser) => {
    browser
      .waitForElementVisible('li[id="publicDocument"]', 5000)
      .waitForElementVisible('li[id="dashboard"]', 5000)
      .waitForElementVisible('li[id="roleDocument"]', 5000)
      .assert.visible('li[id="publicDocument"]')
      .assert.visible('li[id="dashboard"]')
      .click('li[id="dashboard"]')
      .pause(1000)
      .waitForElementVisible('a.deleteDoc-btn', 5000)
      .assert.visible('a.deleteDoc-btn')
      .click('.deleteDoc-btn')
      .pause(2000)
      .waitForElementVisible('.confirm', 5000)
      .assert.visible('.confirm')
      .pause(1000)
      .click('.confirm')
      .pause(2000)
      .waitForElementVisible('.confirm', 5000)
      .assert.visible('.confirm')
      .click('.confirm')
      .pause(2000);
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

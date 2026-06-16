// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('SleekFlow User Account Authentication', () => {

  test.beforeEach('Background: Accessing the Authentication Page', async ({ Given, When, Then, page }, testInfo) => { if (testInfo.error) return;
    await Given('I am on the sleekflow homepage', null, { page }); 
    await When('I navigate to the login tab window', null, { page }); 
    await Then('I should see the correct login page header'); 
  });
  
  test('Log in with valid user credentials successfully', { tag: ['@login', '@positive'] }, async ({ When, Then, And }) => { 
    await When('I enter my registered email address'); 
    await And('I click the login continue button'); 
    await Then('I should see my "ridge421@yopmail.com" email displayed on the password screen'); 
    await When('I enter my account password'); 
    await And('I click the final signin submission button'); 
    await Then('I should be logged in successfully and see the signout option'); 
  });

  test('Log in failed with empty email address', { tag: ['@login', '@negative'] }, async ({ When, Then, And }) => { 
    await When('I enter an empty email address'); 
    await And('I click the login continue button'); 
    await Then('I should see an email validation field error message'); 
  });

  test('Log in failed with incorrect password', { tag: ['@login', '@negative'] }, async ({ When, Then, And }) => { 
    await When('I enter my registered email address'); 
    await And('I click the login continue button'); 
    await Then('I should see my "ridge421@yopmail.com" email displayed on the password screen'); 
    await When('I enter an incorrect password "WrongPassword123!"'); 
    await And('I click the final signin submission button'); 
    await Then('I should see a password authentication error message'); 
  });

  test('Log in failed with unregistered email format', { tag: ['@login', '@negative'] }, async ({ When, Then, And }) => { 
    await When('I enter an invalid formatted email "not-an-email@com"'); 
    await And('I click the login continue button'); 
    await Then('I should see my "not-an-email@com" email displayed on the password screen'); 
    await When('I enter any account password'); 
    await And('I click the final signin submission button'); 
    await Then('I should see an invalid user error message'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":9,"tags":["@login","@positive"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the login tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the correct login page header","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I enter my registered email address","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I click the login continue button","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should see my \"ridge421@yopmail.com\" email displayed on the password screen","stepMatchArguments":[{"group":{"start":16,"value":"\"ridge421@yopmail.com\"","children":[{"start":17,"value":"ridge421@yopmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When I enter my account password","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And I click the final signin submission button","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then I should be logged in successfully and see the signout option","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":18,"tags":["@login","@negative"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the login tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the correct login page header","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I enter an empty email address","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click the login continue button","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see an email validation field error message","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":24,"tags":["@login","@negative"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the login tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the correct login page header","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I enter my registered email address","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And I click the login continue button","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then I should see my \"ridge421@yopmail.com\" email displayed on the password screen","stepMatchArguments":[{"group":{"start":16,"value":"\"ridge421@yopmail.com\"","children":[{"start":17,"value":"ridge421@yopmail.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I enter an incorrect password \"WrongPassword123!\"","stepMatchArguments":[{"group":{"start":30,"value":"\"WrongPassword123!\"","children":[{"start":31,"value":"WrongPassword123!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And I click the final signin submission button","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I should see a password authentication error message","stepMatchArguments":[]}]},
  {"pwTestLine":36,"pickleLine":33,"tags":["@login","@negative"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the login tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the correct login page header","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I enter an invalid formatted email \"not-an-email@com\"","stepMatchArguments":[{"group":{"start":35,"value":"\"not-an-email@com\"","children":[{"start":36,"value":"not-an-email@com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And I click the login continue button","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then I should see my \"not-an-email@com\" email displayed on the password screen","stepMatchArguments":[{"group":{"start":16,"value":"\"not-an-email@com\"","children":[{"start":17,"value":"not-an-email@com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":40,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When I enter any account password","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And I click the final signin submission button","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then I should see an invalid user error message","stepMatchArguments":[]}]},
]; // bdd-data-end
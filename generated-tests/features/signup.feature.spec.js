// Generated from: features\signup.feature
import { test } from "playwright-bdd";

test.describe('SleekFlow User Account Registration', () => {

  test.beforeEach('Background: Accessing the Registration Page', async ({ Given, When, page }, testInfo) => { if (testInfo.error) return;
    await Given('I am on the sleekflow homepage', null, { page }); 
    await When('I navigate to the signup tab window', null, { page }); 
  });
  
  test('Register a new user account via two-step wizard', { tag: ['@signup-positive'] }, async ({ When, Then, And }) => { 
    await When('I enter my email and accept the terms confirmation'); 
    await And('I click the first signup button'); 
    await Then('I should see my correct email displayed on the password screen'); 
    await When('I enter my secure account password'); 
    await And('I click the final signup submission button'); 
    await Then('the account should be saved successfully'); 
  });

  test.describe('Verify form-level input validation errors on Step 1', () => {

    test('Example #1', { tag: ['@signup-negative', '@validation'] }, async ({ When, Then, And }) => { 
      await When('I enter an invalid email "plainaddress"'); 
      await And('I accept the terms confirmation'); 
      await And('I click the first signup button'); 
      await Then('I should see the error message "Email is not valid"'); 
    });

    test('Example #2', { tag: ['@signup-negative', '@validation'] }, async ({ When, Then, And }) => { 
      await When('I enter an invalid email "@missing-username.com"'); 
      await And('I accept the terms confirmation'); 
      await And('I click the first signup button'); 
      await Then('I should see the error message "Email is not valid"'); 
    });

    test('Example #3', { tag: ['@signup-negative', '@validation'] }, async ({ When, Then, And }) => { 
      await When('I enter an invalid email "test@yopmail"'); 
      await And('I accept the terms confirmation'); 
      await And('I click the first signup button'); 
      await Then('I should see the error message "Email is not valid"'); 
    });

  });

  test('Prevent signup progression when email field is left empty', { tag: ['@signup-negative', '@empty-fields'] }, async ({ When, Then, And }) => { 
    await When('I leave the email field empty'); 
    await And('I accept the terms confirmation'); 
    await And('I click the first signup button'); 
    await Then('I should see a field required validation error'); 
  });

  test('Prevent signup progression without accepting Terms and Conditions', { tag: ['@signup-negative', '@tnc'] }, async ({ When, Then, And, But }) => { 
    await When('I enter a valid email address'); 
    await But('I do not check the terms and conditions checkbox'); 
    await And('I click the first signup button'); 
    await Then('the system should prevent progression and highlight the terms checkbox'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\signup.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":8,"tags":["@signup-positive"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I enter my email and accept the terms confirmation","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should see my correct email displayed on the password screen","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I enter my secure account password","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I click the final signup submission button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the account should be saved successfully","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":25,"tags":["@signup-negative","@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I enter an invalid email \"plainaddress\"","stepMatchArguments":[{"group":{"start":25,"value":"\"plainaddress\"","children":[{"start":26,"value":"plainaddress","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I accept the terms confirmation","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Email is not valid\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Email is not valid\"","children":[{"start":32,"value":"Email is not valid","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":29,"pickleLine":26,"tags":["@signup-negative","@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I enter an invalid email \"@missing-username.com\"","stepMatchArguments":[{"group":{"start":25,"value":"\"@missing-username.com\"","children":[{"start":26,"value":"@missing-username.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I accept the terms confirmation","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Email is not valid\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Email is not valid\"","children":[{"start":32,"value":"Email is not valid","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":27,"tags":["@signup-negative","@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I enter an invalid email \"test@yopmail\"","stepMatchArguments":[{"group":{"start":25,"value":"\"test@yopmail\"","children":[{"start":26,"value":"test@yopmail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I accept the terms confirmation","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the error message \"Email is not valid\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Email is not valid\"","children":[{"start":32,"value":"Email is not valid","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":45,"pickleLine":30,"tags":["@signup-negative","@empty-fields"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When I leave the email field empty","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"And I accept the terms confirmation","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then I should see a field required validation error","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":37,"tags":["@signup-negative","@tnc"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the sleekflow homepage","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the signup tab window","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When I enter a valid email address","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"But I do not check the terms and conditions checkbox","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And I click the first signup button","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the system should prevent progression and highlight the terms checkbox","stepMatchArguments":[]}]},
]; // bdd-data-end
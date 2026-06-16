Feature: SleekFlow User Account Authentication

  Background: Accessing the Authentication Page
    Given I am on the sleekflow homepage
    When I navigate to the login tab window
    Then I should see the correct login page header

  @login @positive
  Scenario: Log in with valid user credentials successfully
    When I enter my registered email address
    And I click the login continue button
    Then I should see my "ridge421@yopmail.com" email displayed on the password screen
    When I enter my account password
    And I click the final signin submission button
    Then I should be logged in successfully and see the signout option

  @login @negative
  Scenario: Log in failed with empty email address
    When I enter an empty email address
    And I click the login continue button
    Then I should see an email validation field error message

  @login @negative
  Scenario: Log in failed with incorrect password
    When I enter my registered email address
    And I click the login continue button
    Then I should see my "ridge421@yopmail.com" email displayed on the password screen
    When I enter an incorrect password "WrongPassword123!"
    And I click the final signin submission button
    Then I should see a password authentication error message

  @login @negative
  Scenario: Log in failed with unregistered email format
    When I enter an invalid formatted email "not-an-email@com"
    And I click the login continue button
    Then I should see my "not-an-email@com" email displayed on the password screen
    When I enter any account password
    And I click the final signin submission button
    Then I should see an invalid user error message
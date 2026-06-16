Feature: SleekFlow User Account Registration

  Background: Accessing the Registration Page
    Given I am on the sleekflow homepage
    When I navigate to the signup tab window

  @signup
  Scenario: Register a new user account via two-step wizard
    When I enter my email and accept the terms confirmation
    And I click the first signup button
    Then I should see my correct email displayed on the password screen
    When I enter my secure account password
    And I click the final signup submission button
    Then the account should be saved successfully

  @signup-negative @validation
  Scenario Outline: Verify form-level input validation errors on Step 1
    When I enter an invalid email "<email_input>"
    And I accept the terms confirmation
    And I click the first signup button
    Then I should see the error message "<expected_error>"

    Examples:
      | email_input           | expected_error          |
      | plainaddress          | Email is not valid      |
      | @missing-username.com | Email is not valid      |
      | test@yopmail          | Email is not valid      |

  @signup-negative @empty-fields
  Scenario: Prevent signup progression when email field is left empty
    When I leave the email field empty
    And I accept the terms confirmation
    And I click the first signup button
    Then I should see a field required validation error

  @signup-negative @tnc
  Scenario: Prevent signup progression without accepting Terms and Conditions
    When I enter a valid email address
    But I do not check the terms and conditions checkbox
    And I click the first signup button
    Then the system should prevent progression and highlight the terms checkbox
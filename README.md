# SleekFlow Technical Test Automation
This project provides a robust, scalable, and automated test suite for the SleekFlow.io web application using Playwright, TypeScript, and BDD (Behavior-Driven Development) via Gherkin syntax.

🚀 Key Features
BDD Approach: Uses playwright-bdd for readable, stakeholder-friendly test specifications.
Resilient Locators: Implements a stable locator strategy prioritizing structural data attributes over brittle, dynamically generated CSS classes.
Dynamic Data: Integrated with @faker-js/faker to generate unique, conflict-free test credentials for every run.
Page Object Model (POM): Architected to ensure high reusability and maintainability.
CI/CD Ready: Pre-configured for automated execution in GitHub Actions pipelines.

🛠️ Prerequisites
Node.js: Ensure you have Node.js (v18+) installed.
Package Manager: Ensure you have npm installed.

⚙️ Getting Started
Clone the repository:
  git clone https://github.com/laeily0330/sleekflow-technical-test.git
  cd sleekflow-technical-test

Install dependencies:
  npm install

Install Browser Binaries:
  npx playwright install --with-deps

🧪 Running Tests
Run all tests (Headless):
npx bddgen
npx playwright test

Run with visual feedback (Headed Mode):
npx bddgen
npx playwright test --headed

Run only login or signup
npx bddgen
npx playwright test --grep '@login'
npx playwright test --grep '@signup'

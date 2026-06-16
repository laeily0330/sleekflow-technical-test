import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// This tells bddgen where to look for your Gherkin features and TypeScript step definitions
const bddDir = defineBddConfig({
  features: 'features/**/*.feature', // Scans all feature files
  steps: 'steps/**/*.ts',            // Scans all step definition files
  outputDir: 'generated-tests',
  verbose: true
});

export default defineConfig({
  // Point Playwright to the directory where bddgen outputs its generated specs
  testDir: bddDir, 
  
  // Maximum time one test can run for (30 seconds)
  timeout: 30 * 1000,
  
  expect: {
    timeout: 30000
  },
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Reporter to use. 'html' creates a nice dashboard, 'list' shows progress in terminal
  reporter: [
    ['list'],
    ['html', { open: 'never' }] // 'never' prevents it from popping up automatically in CI/CD
  ],
  
  // Shared settings for all the projects below.
  use: {
    // 🌟 FIXED: Moved 'headless' inside the global 'use' object option block
    headless: true, 

    // Collect trace when retrying a failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://sleekflow.io',
    
    // Explicitly configure global auto-wait timeouts
    actionTimeout: 300000,
    navigationTimeout: 300000,
  },

  // Combined duplicate workers keys. Uses 1 worker locally for safety, or scales down in CI
  retries: 0, 
  workers: 1,

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});
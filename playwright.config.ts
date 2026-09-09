import { defineConfig } from '@playwright/test';

// Smoke tests run against the production build: `npm run build` first.
export default defineConfig({
  testDir: './tests/smoke',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});

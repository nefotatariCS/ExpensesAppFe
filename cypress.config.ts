import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://expenses-app-frontend-18c65f34b93b.herokuapp.com/',
    env: {
      username: 'TestUser',
      password: 'Test1234',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
});

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://expenses-app-fe-25c80f8c3c72.herokuapp.com/',
    env: {
      username: 'KGici',
      password: 'Test1234',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
});

export const environment = {
  production: false,
  apiUrl: window.location.origin.includes('herokuapp.com')
    ? 'https://expenses-app-backend-d614d6eabde5.herokuapp.com'
    : 'http://localhost:3000',
};

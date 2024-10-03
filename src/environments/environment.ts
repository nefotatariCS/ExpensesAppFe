export const environment = {
  production: false,
  apiUrl: window.location.origin.includes('herokuapp.com')
    ? 'https://expenses-app-be-5be9465e6f03.herokuapp.com'
    : 'http://localhost:3000',
};

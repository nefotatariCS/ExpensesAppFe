export const environment = {
  production: false,
  apiUrl: window.location.origin.includes('herokuapp.com')
    ? 'https://expenses-app-frontend-18c65f34b93b.herokuapp.com'
    : 'http://localhost:3000',
};
